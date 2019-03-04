import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import ExportToExcel from "./LeaveCategoryToExcel";

class LeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveCategoryDetails: [],
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
        <div className="reactTableContainer">
          <div className="mainListBtnContainer">
            <div className="SubListBtnLeftContainer">
              <ExportToExcel
                leaveCategoryDetails={this.state.leaveCategoryDetails}
              />
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
            defaultPageSize={10}
            pages={this.state.pages}
            filterable={true}
            sortable={true}
            multiSort={true}
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(LeaveCategory);
