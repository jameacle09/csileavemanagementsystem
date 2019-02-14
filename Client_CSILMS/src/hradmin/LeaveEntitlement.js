import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

class LeaveEntitlement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [
        // {
        //   joinDate: ""
        // }
      ]
    };
    this.loadLeaveEntitlement = this.loadLeaveEntitlement.bind(this);
  }

  loadLeaveEntitlement() {
    fetchData({
      url: API_BASE_URL + "/leaveentitlements",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = [];
      this.setState({ userData: userData });
      console.log(userData);
    });
  }

  componentDidMount() {
    this.loadLeaveEntitlement();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLeaveEntitlement();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
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
                {/* <th>Staff Name</th> */}
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
              {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}> 
                      <td>{item.id.emplid}</td>
                      {/* <td>{item.id.name}</td> */}
                      <td>{item.id.year}</td>
                      <td>{item.leaveCategory.leaveDescr}</td>
                      <td>{item.carryForward}</td>
                      <td>{item.entitlement}</td>
                      <td>{item.availableLeave}</td>
                      <td>{item.takenLeave}</td>
                      <td>{item.balanceLeave}</td>
                      <td><Button
                        component={Link}
                        to={`/leaveentitlement/edit/${"csiStaffId"}`}
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none", color: "white" }}
                      >
                        <span className="fa fa-edit" />
                      </Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(LeaveEntitlement);
