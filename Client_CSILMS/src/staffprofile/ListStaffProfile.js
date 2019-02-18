import React, { Component } from "react";
import { Table, Input, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import StaffTableRow from "./StaffTableRow";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import Moment from 'react-moment';

class ListStaffProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
    this.loadEmployeeDetails = this.loadEmployeeDetails.bind(this);
  }

  loadEmployeeDetails() {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
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
    this.loadEmployeeDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadEmployeeDetails();
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
            <h3 className="headerStyle">Employee Profile</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Row>
            <Col md="6" xs="6" className="search">
              <Input
                type="text"
                maxlength="50"
                placeholder="Search Employee"
                style={{ width: "35%" }}
              />
              <Button variant="contained" color="primary" type="submit" >
                <span className="fa fa-search" />
              </Button>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                component={Link}
                to="/newstaffprofile"
                variant="contained"
                color="primary"
                style={{ textTransform: "none", color: "white" }}
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add Employee
              </Button>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>NRIC / Passport No.</th>
                <th>Job Title</th>
                <th>Mobile No.</th>
                <th>Business Unit</th>
                <th>Line Manager</th>
                <th>Join Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.emplId}</td>
                      <td>{item.name}</td>
                      <td>{item.businessEmail}</td>
                      <td>{item.nricPassport}</td>
                      <td>{item.jobTitle}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.businessUnit}</td>
                      <td>{item.reportsTo.name}</td>
                      <td><Moment format="YYYY/MM/DD">{item.joinDate}</Moment></td>
                      <td><Button
                        component={Link}
                        to={`/liststaffprofile/edit/${"emplId"}`}
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

export default withRouter(ListStaffProfile);
