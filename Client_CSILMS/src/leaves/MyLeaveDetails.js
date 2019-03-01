import React, { Component } from "react";
import ReactTable from "react-table";
import { API_BASE_URL } from "../constants";
import { withRouter } from "react-router-dom";
import "react-table/react-table.css";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { Row, Col } from "reactstrap";
import MyLeaveDetailsToExcel from "./MyLeaveDetailsToExcel";

class MyLeaveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loading: true
    };
    this.loadMyLeaveDetails = this.loadMyLeaveDetails.bind(this);
  }

  loadMyLeaveDetails() {
    const thisYear = new Date().getFullYear();
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me?year=" + thisYear,
      method: "GET"
    })
      .then(data => {
        this.setState({
          userData: data,
          loading: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({
          userData: userData,
          loading: false
        });
      });
  }

  componentDidMount() {
    this.loadMyLeaveDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveDetails();
    }
  }

  render() {
    const myLeaveDetailsCols = [
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "leaveCategory.leaveDescr",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: str => str.entitlement + " day(s)",
        minWidth: 94,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "carryForward",
        Header: "Carry Forward",
        accessor: str => str.carryForward + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "availableLeave",
        Header: "Available Leave",
        accessor: str => str.availableLeave + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "takenLeave",
        Header: "Taken Leave",
        accessor: str => str.takenLeave + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "balanceLeave",
        Header: "Balance Leave",
        accessor: str => str.balanceLeave + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      }
    ];
    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave Details</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <MyLeaveDetailsToExcel userData={this.state.userData} />
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <span> </span>
            </Col>
          </Row> 
          <ReactTable
            data={this.state.userData}
            columns={myLeaveDetailsCols}
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
        </div>
      </div>
    );
  }
}

export default withRouter(MyLeaveDetails);
