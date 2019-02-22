import React, { Component } from "react";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { fetchData, formatDateYMD, formatDateDMY } from "../util/APIUtils";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import MyLeaveHistoryToExcel from './MyLeaveHistoryToExcel';

class MyLeaveHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
    this.loadMyLeaveHistory = this.loadMyLeaveHistory.bind(this);
  }

  loadMyLeaveHistory() {
    fetchData({
      url: API_BASE_URL + "/appliedleave/me",
      method: "GET"
    })
      .then(response => {
        this.setState({
          userData: response
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({ userData: userData });
        console.log(userData);
      });
  }

  componentDidMount() {
    this.loadMyLeaveHistory();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveHistory();
    }
  }

  render() {
    const showFullString = strStatus => {
      if (strStatus === "PNAPV") {
        return "Pending Approve";
      } else if (strStatus === "APPRV") {
        return "Approved";
      } else if (strStatus === "CANCL") {
        return "Cancelled";
      } else if (strStatus === "PNCLD") {
        return "Pending Cancel";
      } else if (strStatus === "REJCT") {
        return "Rejected";
      }
    };
    const myLeaveHistoryCols = [
      {
        id: "startDate",
        Header: "Start Date",
        accessor: d => formatDateDMY(d.id.startDate),
        minWidth: 94,
        sortable: true,
        filterable: true
      },
      {
        id: "endDate",
        Header: "End Date",
        accessor: d => formatDateDMY(d.endDate),
        minWidth: 94,
        sortable: true,
        filterable: true
      },
      {
        id: "leaveDuration",
        Header: "Duration",
        accessor: str => str.leaveDuration + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "leaveCategory.leaveDescr",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "reason",
        Header: "Reason",
        accessor: "reason",
        width: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "effDate",
        Header: "Applied Date",
        accessor: d => formatDateDMY(d.id.effDate),
        minWidth: 94,
        sortable: true,
        filterable: true
      },
      {
        id: "leaveStatus",
        Header: "Status",
        accessor: d => showFullString(d.leaveStatus),
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "Action",
        Header: "Action",
        accessor: viewButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/myleavehistory/view/${viewButton.id.emplid}/${formatDateYMD(
              viewButton.id.effDate
            )}/${formatDateYMD(viewButton.id.startDate)}/${
              viewButton.id.leaveCode
            }`}
            activeclassname="active"
            className="smallButtonOverride"
          >
            <span className="fa fa-folder-open" style={{ color: "white" }} />
            &nbsp;View
          </Button>
        ),
        minWidth: 72,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave History</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <MyLeaveHistoryToExcel userData={this.state.userData} />
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <span> </span>
            </Col>
          </Row>                    
          <ReactTable
            data={this.state.userData}
            columns={myLeaveHistoryCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            // rowsText="Rows per page"
            loadingText="Loading Leave History..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default MyLeaveHistory;
