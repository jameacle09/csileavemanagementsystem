import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Col
} from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import {
  fetchData,
  isHrRole,
  formatDateDMY,
  getWeekDay
} from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import XLSX from "xlsx";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExcelUploadTemplate from "../templates/PublicHolidays.xlsx";

class UploadHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidayData: [],
      filename: "",
      isValid: false,
      loading: false
    };
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleExcelFileUpload = file => {
    if (file.target.files[0]) {
      if (!file.target.files[0].name.match(/.(xls|xlsx)$/i)) {
        return confirmAlert({
          message:
            "Invalid Template has been used for uploading Public Holidays! Please use the latest Upload Template available in this page...",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    }
    if (this._isMounted && file.target.files[0]) {
      /* Update state values for filename and loading */
      this.setState({
        filename: file.target.value,
        loading: true
      });
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = e => {
        /* Parse Holiday Data */
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get the second worksheet */
        const worksheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[worksheetName];
        /* Convert array of arrays to JSON */
        const uploadData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /* Update State's Holiday Data */
        this.setState({
          holidayData: uploadData,
          loading: true
        });
        this.validateUploadedRowsData();
      };
      if (rABS) reader.readAsBinaryString(file.target.files[0]);
      else reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      this.setState({
        holidayData: [],
        filename: "",
        isValid: false,
        loading: false
      });
    }
  };

  validateUploadedRowsData = () => {
    let arrHolidayData = this.state.holidayData;

    arrHolidayData.forEach(function(e) {
      e["ValidateStatus"] = "Passed";
      e["Day"] = "";
    });

    arrHolidayData.forEach(holRow => {
      if (!holRow.Date) holRow.ValidateStatus = "Date cannot be blank.";
      if (holRow.Date && isNaN(Date.parse(holRow.Date))) {
        holRow.ValidateStatus = "Date value is invalid.";
      } else {
        holRow.Day = getWeekDay(holRow.Date);
      }
      if (!holRow.Holiday) holRow.ValidateStatus = "Holiday cannot be blank.";
      if (!holRow.State) holRow.ValidateStatus = "State(s) cannot be blank.";
    });

    let arrErrHolidayData = arrHolidayData.filter(
      entRow => entRow.ValidateStatus !== "Passed"
    );

    if (arrHolidayData.length === 0) {
      this.setState({
        HolidayData: arrHolidayData,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "No rows have been uploaded! Please verify that you are using the correct template and that it contains Public Holidays data...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (arrErrHolidayData.length > 0) {
      this.setState({
        HolidayData: arrErrHolidayData,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "Invalid row(s) has/have been detected from the uploaded Public Holidays data! Please find those invalid row(s) in the table and fix them in Excel Template, then re-try uploading...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (arrErrHolidayData.length === 0 && arrHolidayData.length > 0) {
      this.setState({
        HolidayData: arrHolidayData,
        isValid: true,
        loading: false
      });
      confirmAlert({
        message:
          "All uploaded Public Holidays data have successfully passed the validation process...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    }
  };

  confirmHolidaySave = e => {
    confirmAlert({
      message: "Do you really want to save all uploaded Public Holidays?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleHolidaySave(e)
        },
        {
          label: "No"
        }
      ]
    });
  };

  handleHolidaySave = e => {
    // This is a temporary solution for saving Array of data, an API
    // for saving bulk of data should be created to speed up the saving
    this.state.holidayData.map(holRow => {
      const jsonRowValues = {
        holidayDate: holRow.Date,
        holidayDay: holRow.Day,
        holidayDescr: holRow.Holiday,
        holidayState: holRow.State
      };
      const postRequest = Object.assign({}, jsonRowValues);
      fetchData({
        url: API_BASE_URL + "/publicholiday",
        method: "POST",
        body: JSON.stringify(postRequest)
      })
        .then(response => {
          if (response.ok) {
            //   confirmAlert({
            //     message: "Holiday has been successfully inserted!",
            //     buttons: [
            //       {
            //         label: "OK",
            //         onClick: () => this.props.history.push("/publicholiday")
            //       }
            //     ]
            //   });
          }
        })
        .catch(error => {
          if (error.status === 401) {
            this.props.history.push("/login");
          } else {
            confirmAlert({
              message: error.status + " : " + error.message,
              buttons: [
                {
                  label: "OK"
                }
              ]
            });
          }
        });
    });
    this.props.history.push("/publicholiday");
  };

  completedHolidaySave = e => {
    confirmAlert({
      message:
        "All Public Holidays have been successfully saved to the Database!",
      buttons: [
        {
          label: "OK",
          onClick: () => this.props.history.push("/publicholiday")
        }
      ]
    });
  };

  validateStateHasData = () => {
    const isInvalid = !this.state.holidayData.length || !this.state.isValid;
    return isInvalid;
  };

  handleReset = () => {
    this.setState({ holidayData: [], filename: "", loading: false });
  };

  handleCancelUpload = () => {
    this.props.history.push("/publicholiday");
  };

  render() {
    // if (!isHrRole(this.props.currentUser)) {
    //   return <Redirect to="/forbidden" />;
    // }

    let textHeaderValue = "",
      textColorValStatus = "",
      colWidthValStatus = 0;
    if (this.state.isValid) {
      textHeaderValue = "Validation";
      textColorValStatus = "#004a9b";
      colWidthValStatus = 70;
    } else {
      textHeaderValue = "Validation Status";
      textColorValStatus = "red";
      colWidthValStatus = 200;
    }

    const publicHolidayCols = [
      {
        id: "ValidateStatus",
        Header: textHeaderValue,
        accessor: "ValidateStatus",
        minWidth: colWidthValStatus,
        sortable: true,
        filterable: false,
        style: {
          color: textColorValStatus
        }
      },
      {
        id: "Date",
        Header: "Date",
        accessor: d => {
          if (this.state.isValid) {
            return formatDateDMY(d.Date);
          } else {
            return d.Date;
          }
        },
        // accessor: "Date",
        width: 150,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Day",
        Header: "Day",
        accessor: str => getWeekDay(str.Date),
        width: 160,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Holiday",
        Header: "Holiday",
        accessor: "Holiday",
        minWidth: 220,
        sortable: true,
        filterable: true
      },
      {
        id: "State",
        Header: "State(s)",
        accessor: "State",
        minWidth: 380,
        sortable: true,
        filterable: true
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Upload Public Holidays</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Form>
            <div>
              <FormGroup
                row
                style={{
                  fontFamily: "Helvetica",
                  size: "16",
                  fontWeight: "bold"
                }}
              >
                <Label for="excelFileName" sm={2}>
                  Upload Excel File:
                </Label>

                <Col sm={{ size: 6 }}>
                  <Input
                    type="file"
                    name="filename"
                    id="filename"
                    accept=".xls,.xlsx"
                    value={this.state.filename}
                    onChange={this.handleExcelFileUpload.bind(this)}
                    style={{
                      background: "#b8e2fc",
                      border: "1px solid rgb(214, 209, 209)"
                    }}
                  />
                  <FormText color="muted" style={{ fontFamily: "Helvetica" }}>
                    Please download the latest{" "}
                    <a href={ExcelUploadTemplate}>
                      Public Holiday Upload Template
                    </a>{" "}
                    for you to fill in the data.
                  </FormText>
                </Col>
                <Col sm={4} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => this.confirmHolidaySave(event)}
                    disabled={this.validateStateHasData()}
                    style={{ width: "100px" }}
                    className="largeButtonOverride"
                  >
                    Save
                  </Button>
                  <span> </span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                    style={{ width: "100px" }}
                    className="largeButtonOverride"
                  >
                    Reset
                  </Button>
                  <span> </span>
                  <Button
                    color="secondary"
                    width="80px"
                    onClick={this.handleCancelUpload}
                  >
                    Back to Main
                  </Button>
                </Col>
              </FormGroup>
            </div>
            <ReactTable
              data={this.state.holidayData}
              columns={publicHolidayCols}
              defaultPageSize={10}
              pages={this.state.pages}
              loading={this.state.loading}
              filterable={true}
              sortable={true}
              multiSort={true}
              loadingText="Loading Leave Holidays..."
              noDataText="No data available."
              className="-striped"
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadHoliday);
