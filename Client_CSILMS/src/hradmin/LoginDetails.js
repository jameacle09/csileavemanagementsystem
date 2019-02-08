import React, { Component } from "react";
import { Table, Input, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";

class LoginDetails extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">User Login Details</h3>
          </span>
        </div>
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
                <span className="fa fa-search" />
              </Button>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                component={Link}
                to="/logindetails/add"
                variant="contained"
                color="primary"
                style={{ textTransform: "none", color: "white" }}
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Add User
              </Button>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Account Locked?</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  <Button
                    className="btn btn-primary"
                    color="primary"
                    tag={Link}
                    to={`/logindetails/edit/${"userid"}`}
                    activeclassname="active"
                  >
                    <span className="fa fa-edit" />
                  </Button>
                </td>
                <td>
                  <Button
                    className="btn btn-primary"
                    color="primary"
                    tag={Link}
                    to={`/logindetails/delete/${"userid"}`}
                    activeclassname="active"
                  >
                    <span className="fa fa-trash" />
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

export default LoginDetails;
