import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole, fetchData, exportTableToExcel } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import ExportToExcel from "./LeaveCategoryToExcel";
import LoadingPage from "../common/LoadingPage";

class LeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveCategoryDetails: [],
      filteredData: [],
      filteredLength: 0,
      loading: true
    };
    this.loadleaveCategoryDetails = this.loadleaveCategoryDetails.bind(this);
  }

  loadleaveCategoryDetails() {
    fetchData({
      url: API_BASE_URL + "/leavecategories",
      method: "GET"
    })
      .then(data => {
        this.setState({
          leaveCategoryDetails: data,
          loading: false
        });
        this.populateFilteredData();
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({
          leaveCategoryDetails: userData,
          loading: false
        });
      });
  }

  populateFilteredData = () => {
    // This will initialize values for the State Filtered Data
    const arrFilteredData = [...this.state.leaveCategoryDetails];
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
    this.loadleaveCategoryDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadleaveCategoryDetails();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const LeaveCategoryCols = [
      {
        id: "leaveCode",
        Header: "Leave Code",
        accessor: "leaveCode",
        minWidth: 110,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveDescr",
        Header: "Leave Description",
        accessor: "leaveDescr",
        minWidth: 180,
        sortable: true,
        filterable: true
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: str => str.entitlement + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "editAction",
        Header: "Action",
        accessor: editButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/leavecategory/edit/${editButton.leaveCode}`}
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" /> Edit
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
            <h3 className="headerStyle">Leave Categories</h3>
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
                      exportTableToExcel("table-to-xls", "LeaveCategories")
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
                    <Button
                      tag={Link}
                      to={`/leavecategory/add`}
                      className="largeButtonOverride"
                    >
                      <span
                        className="fa fa-plus"
                        style={{ margin: "0px 5px 0px 0px" }}
                      />
                      Add Leave Category
                    </Button>
                  </div>
                </div>
              </div>
              <ReactTable
                data={this.state.leaveCategoryDetails}
                columns={LeaveCategoryCols}
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
                loadingText="Loading Leave Categories..."
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
              <ExportToExcel leaveCategoryDetails={this.state.filteredData} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(LeaveCategory);
