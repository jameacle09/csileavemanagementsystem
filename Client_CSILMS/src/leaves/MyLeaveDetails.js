import React, { Component } from "react";
import { Button, Input, Label } from "reactstrap";
import ReactTable from "react-table";
import { API_BASE_URL } from "../constants";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { fetchData, exportTableToExcel } from "../util/APIUtils";
import MyLeaveDetailsToExcel from "./MyLeaveDetailsToExcel";
import LoadingPage from "../common/LoadingPage";

class MyLeaveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveDetailsData: [],
      leaveYear: new Date().getFullYear(),
      leaveDetailsYearData: [],
      loading: true
    };
  }

  loadMyLeaveDetails = () => {
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me",
      method: "GET"
    })
      .then(data => {
        this.setState(
          {
            leaveDetailsData: data,
            loading: false
          },
          () => this.filterDataByLeaveDetailsYear(this.state.leaveYear)
        );
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let leaveDetailsData = [];
        this.setState({
          leaveDetailsData: leaveDetailsData,
          loading: false
        });
      });
  };

  componentDidMount() {
    this.loadMyLeaveDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveDetails();
    }
  }

  filterDataByLeaveDetailsYear = nbrYear => {
    let newArrLeaveDetailsYearData = this.state.leaveDetailsData.filter(
      row => row.id.year === nbrYear
    );
    this.setState({
      leaveDetailsYearData: newArrLeaveDetailsYearData,
      leaveYear: nbrYear
    });
  };

  render() {
    const myLeaveDetailsCols = [
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "leaveCategory.leaveDescr",
        minWidth: 200,
        sortable: true,
        filterable: false
      },
      {
        id: "year",
        Header: "Year",
        accessor: "id.year",
        minWidth: 80,
        sortable: true,
        filterable: false,
        style: {
          textAlign: "center"
        },
        show: true
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: str => str.entitlement + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "carryForward",
        Header: "Carry Forward",
        accessor: str => str.carryForward + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "availableLeave",
        Header: "Available Leave",
        accessor: str => str.availableLeave + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "takenLeave",
        Header: "Leave Taken",
        accessor: str => str.takenLeave + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "balanceLeave",
        Header: "Leave Balance",
        accessor: str => str.balanceLeave + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];
    let currYear = 0;
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave Details</h3>
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
                      exportTableToExcel("table-to-xls", "MyLeaveDetails")
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
                  <div
                    style={{
                      paddingTop: "7px",
                      paddingRight: "2px",
                      fontFamily: "Helvetica 17px",
                      fontWeight: "bold",
                      color: "#032a53"
                    }}
                  >
                    <Label for="approverId">Leave Details Year:</Label>
                  </div>
                  <div style={{ paddingLeft: "4px" }}>
                    <Input
                      type="select"
                      name="year"
                      id="year"
                      onChange={event =>
                        this.filterDataByLeaveDetailsYear(
                          Number(event.target.value)
                        )
                      }
                      value={this.state.leaveYear}
                      style={{
                        fontFamily: "Helvetica 17px",
                        fontWeight: "bold",
                        color: "#032a53",
                        border: "1px solid black",
                        background: "rgb(251, 252, 253)"
                      }}
                    >
                      {this.state.leaveDetailsData.map((leaveDet, index) => {
                        if (currYear !== leaveDet.id.year) {
                          currYear = leaveDet.id.year;
                          return (
                            <option key={index} value={leaveDet.id.year}>
                              {leaveDet.id.year}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </div>
                </div>
              </div>
              <ReactTable
                data={this.state.leaveDetailsYearData}
                columns={myLeaveDetailsCols}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                }
                defaultPageSize={10}
                pages={this.state.pages}
                loading={this.state.loading}
                filterable={true}
                sortable={true}
                multiSort={true}
                minRows={10}
                pageSizeOptions={[10, 20, 50, 100]}
                // rowsText="Rows per page"
                loadingText="Loading Leave Details..."
                noDataText="No data available."
                className="-striped"
              />
              <MyLeaveDetailsToExcel
                leaveDetailsData={this.state.leaveDetailsYearData}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(MyLeaveDetails);
