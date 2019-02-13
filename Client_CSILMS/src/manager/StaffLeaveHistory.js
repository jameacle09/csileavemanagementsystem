import React, { Component } from "react";
import { Table } from "reactstrap";
// import ManagerSideBar from "./ManagerSideBar";
import "../common/Styles.css";
import  { Redirect, withRouter } from 'react-router-dom';
import { isManagerRole } from '../util/APIUtils';

class StaffLeaveHistory extends Component {
  render() {
    if(!isManagerRole(this.props.currentUser)){
      return(<Redirect to='/forbidden'  />);
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave History</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(StaffLeaveHistory);
