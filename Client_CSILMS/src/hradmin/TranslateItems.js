import React, { Component } from "react";
import { Button } from "reactstrap";
import "../common/Styles.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole, exportTableToExcel } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import TranslateitemToExcel from "./TranslateitemToExcel";
import LoadingPage from "../common/LoadingPage";

class TranslateItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateItemsData: [],
      filteredData: [],
      filteredLength: 0,
      loading: true
    };
  }

  loadTranslateItems = () => {
    fetchData({
      url: API_BASE_URL + "/translateitems",
      method: "GET"
    })
      .then(data => {
        this.setState({
          translateItemsData: data,
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
          translateItemsData: userData,
          loading: false
        });
      });
  };

  populateFilteredData = () => {
    // This will initialize values for the State Filtered Data
    const arrFilteredData = [...this.state.translateItemsData];
    this.setState({
      filteredData: arrFilteredData,
      filteredLength: arrFilteredData.length,
      loading: false
    });
  };

  componentDidMount() {
    this.loadTranslateItems();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadTranslateItems();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const showStatusDesc = strStatus => {
      if (strStatus === "A") {
        return "Active";
      } else {
        return "Inactive";
      }
    };

    const TranslateItemsCols = [
      {
        id: "fieldname",
        Header: "Field Name",
        accessor: "id.fieldname",
        width: 120,
        sortable: true,
        filterable: true
      },
      {
        id: "fieldvalue",
        Header: "Field Value",
        accessor: "id.fieldvalue",
        width: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "xlatlongname",
        Header: "Field Long Name",
        accessor: "xlatlongname",
        minWidth: 180,
        sortable: true,
        filterable: true
      },
      {
        id: "xlatshortname",
        Header: "Field Short Name",
        accessor: "xlatshortname",
        minWidth: 150,
        sortable: true,
        filterable: true
      },
      {
        id: "effStatus",
        Header: "Effective Status",
        accessor: str => showStatusDesc(str.effStatus),
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
            to={`/translateitems/edit/${editButton.id.fieldname}/${
              editButton.id.fieldvalue
            }`}
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
            <h3 className="headerStyle">Translate Items</h3>
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
                      exportTableToExcel("table-to-xls", "TranslateItems")
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
                      to={`/translateitems/add`}
                      className="largeButtonOverride"
                    >
                      <span
                        className="fa fa-plus"
                        style={{ margin: "0px 5px 0px 0px" }}
                      />
                      Add Translate Item
                    </Button>
                  </div>
                </div>
              </div>
              <ReactTable
                data={this.state.translateItemsData}
                columns={TranslateItemsCols}
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
                loadingText="Loading Translate Items..."
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
              <TranslateitemToExcel
                translateItemsData={this.state.filteredData}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(TranslateItems);
