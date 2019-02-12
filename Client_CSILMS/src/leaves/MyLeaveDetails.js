import React, { Component } from "react";
import { Table } from "reactstrap";
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import { withRouter } from 'react-router-dom';

class MyLeaveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        id: "",
        leaveCategory: "",
        carryForward: "",
        entitlement: "",
        availableLeave: "",
        takenLeave: "",
        balanceLeave: ""
      }
    };

    this.loadMyLeaveDetails = this.loadMyLeaveDetails.bind(this);

  }

  loadMyLeaveDetails() {
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = {
        id: "",
        leaveCategory: "",
        carryForward: "",
        entitlement: "",
        availableLeave: "",
        takenLeave: "",
        balanceLeave: ""
      };
      this.setState({ userData: userData });
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
    let userData = this.state.userData;
    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave Details</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Leave Type</th>
                <th>Entitlement</th>
                <th>Carry Forward</th>
                <th>Available</th>
                <th>Taken</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData["leaveCategory"]}</td>
                <td>-</td>
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

export default MyLeaveDetails;
