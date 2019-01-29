import React, { Component } from "react";
import { Table, Input, Row, Col } from "reactstrap";
import Button from '@material-ui/core/Button';
import StaffTableRow from "./StaffTableRow";
import { Link } from "react-router-dom";
import "../common/Styles.css";

class ListStaffProfile extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Staff Profile</h3>
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
              <Button variant="contained" color="primary" type="submit">
                <span className="fa fa-search"></span>
              </Button>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                component={Link}
                to="newstaffprofile"
                variant="contained"
                color="primary"
                style={{ textTransform: 'none' }}
              >
                <span className="fa fa-plus" style={{ margin: '0px 10px 0px 0px' }}></span> New Employee
              </Button>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>CSI Staff ID</th>
                <th>Staff Name</th>
                <th>Email</th>
                <th>NRIC / Passport No.</th>
                <th>Job Title</th>
                <th>Mobile No.</th>
                <th>Business Unit</th>
                <th>Line Manager</th>
                <th>Join Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((staffprofile, index) => (
                <StaffTableRow key={index} staffprofile={staffprofile} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ListStaffProfile;
