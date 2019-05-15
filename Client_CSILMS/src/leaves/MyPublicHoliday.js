import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import {
  fetchData,
  formatDateDMY,
  formatDateYMD,
  exportTableToExcel
} from "../util/APIUtils";
import ExportToExcel from "../hradmin/PublicHolidayToExcel";
import LoadingPage from "../common/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyPublicHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicHolidayDetails: [],
      filteredData: [],
      filteredLength: 0,
      loading: true
    };
  }

  loadPublicHolidayDetails = () => {
    fetchData({
      url: API_BASE_URL + "/publicholidays",
      method: "GET"
    })
      .then(data => {
        this.setState({
          publicHolidayDetails: data,
          loading: false
        });
        this.populateFilteredData();
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({ userData: userData });
      });
  };

  populateFilteredData = () => {
    // This will initialize values for the State Filtered Data
    const arrFilteredData = [...this.state.publicHolidayDetails];
    arrFilteredData.forEach(filterRow => {
      filterRow["id"] = true;
    });
    this.setState({
      filteredData: arrFilteredData,
      filteredLength: arrFilteredData.length,
      loading: false
    });
  };

  componentDidMount() {
    this.loadPublicHolidayDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadPublicHolidayDetails();
    }
  }

  render() {
    const PublicHolidayCols = [
      {
        id: "holidayDate",
        Header: "Date",
        accessor: d => formatDateDMY(d.holidayDate),
        width: 100,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "holidayDay",
        Header: "Day",
        accessor: "holidayDay",
        minWidth: 100,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayDescr",
        Header: "Holiday",
        accessor: "holidayDescr",
        minWidth: 160,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayState",
        Header: "State(s)",
        accessor: "holidayState",
        minWidth: 290,
        sortable: true,
        filterable: true
      },
      {
        id: "editAction",
        Header: "Action",
        accessor: viewButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/mypublicholiday/view/${formatDateYMD(
              viewButton.holidayDate
            )}`}
            className="smallButtonOverride"
          >
            <FontAwesomeIcon icon="eye" />
            {/* <span className="fa fa-folder-open" style={{ color: "white" }} /> */}{" "}
            View
          </Button>
        ),
        minWidth: 80,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">My Public Holidays</h3>
          </span>
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <div className="reactTableContainer">
              <div className="mainListBtnContainer">
                <div className="SubListBtnLeftContainer">
                  <Button
                    variant="contained"
                    color="primary"
                    className="largeButtonOverride"
                    // onClick={() =>
                    //   document.getElementById("test-table-xls-button").click()
                    // }
                    onClick={() =>
                      exportTableToExcel("table-to-xls", "MyPublicHolidays")
                    }
                  >
                    <span
                      className="fa fa-file-excel-o"
                      style={{ margin: "0px 5px 0px 0px" }}
                    />
                    Export List to Excel
                  </Button>
                </div>
                <div className="SubListBtnRightContainer">
                  <div>
                    <span> </span>
                  </div>
                  <div style={{ paddingLeft: "4px" }}>
                    <span> </span>
                  </div>
                </div>
              </div>
              <ReactTable
                data={this.state.publicHolidayDetails}
                columns={PublicHolidayCols}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                }
                pageSizeOptions={[
                  10,
                  20,
                  30,
                  50,
                  100,
                  this.state.filteredLength
                ]}
                defaultPageSize={10}
                pages={this.state.pages}
                loading={this.state.loading}
                filterable={true}
                sortable={true}
                multiSort={true}
                loadingText="Loading Public Holidays..."
                noDataText="No data available."
                className="-striped"
                showPagination={true}
                showPageSizeOptions={true}
                ref={refer => {
                  this.selectTable = refer;
                }}
                onFilteredChange={() => {
                  const filteredData = this.selectTable.getResolvedState()
                    .sortedData;
                  const filteredDataLength = this.selectTable.getResolvedState()
                    .sortedData.length;
                  this.setState({
                    filteredData: filteredData,
                    filteredLength: filteredDataLength
                  });
                }}
              />
              <ExportToExcel publicHolidayDetails={this.state.filteredData} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(MyPublicHoliday);
