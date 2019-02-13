import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import  { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';

class LeaveEntitlement extends Component {
  render() {
    if(!isHrRole(this.props.currentUser)){
      return(<Redirect to='/forbidden'  />);
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave Entitlement</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}
            >
              <span
                className="fa fa-upload"
                style={{ margin: "0px 10px 0px 0px" }}
              />{" "}
              Upload Entitlement
            </Button>
            <br />
            <br />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>CSI Staff ID</th>
                <th>Staff Name</th>
                <th>Leave Year</th>
                <th>Leave Type</th>
                <th>Carried Forward</th>
                <th>Entitlement</th>
                <th>Available Leave</th>
                <th>Taken Leave</th>
                <th>Balance Leave</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td>
                  <Button
                    component={Link}
                    to={`/leaveentitlement/edit/${"csiStaffId"}`}
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none", color: "white" }}
                  >
                    <span className="fa fa-edit" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(LeaveEntitlement);
