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
import PropTypes from "prop-types";
import { Redirect, withRouter, Link } from "react-router-dom";
import {
  fetchData,
  isHrRole,
  formatDateYMD,
  formatDateDMY
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
      loading: false
    };
    this.handleExcelFileUpload = this.handleExcelFileUpload.bind(this);
    this.handleHolidaySave = this.handleHolidaySave.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.validateUploadedRowsData = this.validateUploadedRowsData.bind(this);
    this.completedHolidaySave = this.completedHolidaySave.bind(this);
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleExcelFileUpload(file) {
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
        loading: false
      });
    }
  }

  validateUploadedRowsData() {
    var DayOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let updatedholidayData = this.state.holidayData.filter(
      holRow =>
        holRow.Date &&
        holRow.Day &&
        holRow.Holiday &&
        holRow.State &&
        DayOfTheWeek.indexOf(holRow.Day) > -1
    );
    this.setState({
      holidayData: updatedholidayData,
      loading: false
    });
  }

  confirmHolidaySave(e) {
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
  }

  handleHolidaySave(e) {
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
  }

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
    const isInvalid = !this.state.holidayData.length;
    return isInvalid;
  };

  handleReset = () => {
    this.setState({ holidayData: [], filename: "", loading: false });
  };

  handleCancelUpload = () => {
    this.props.history.push("/publicholiday");
  };

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const publicHolidayCols = [
      {
        id: "Date",
        Header: "Date",
        // accessor: d => formatDateYMD(d.Date),
        accessor: d => formatDateDMY(d.Date),
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
        accessor: "Day",
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
        width: 240,
        sortable: true,
        filterable: true
      },
      {
        id: "State",
        Header: "State",
        accessor: "State",
        // minWidth: 120,
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

UploadHoliday.propTypes = {
  Date: PropTypes.date,
  Day: PropTypes.string,
  Holiday: PropTypes.string,
  State: PropTypes.string
};

export default withRouter(UploadHoliday);
