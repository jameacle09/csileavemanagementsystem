import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";
import ManagerSideBar from "./ManagerSideBar";
import "../common/Styles.css";

class ManagerApproval extends Component {
  render() {
    const headerStyle = {
      margin: "0 0 0 10px"
    };

    const divStyle = {
      background: "#B8E2FC",
      width: "auto",
      margin: "0 0 0 0",
      padding: "25px 0 25px 20px",
      borderRadius: "5px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    };

    return (
      <Col>
        <Row>
          <Col md="1.5">
            <ManagerSideBar />
          </Col>
          <Col xs className="content">
            <div className="headerContainerFlex">
              <span className="header">
                <h3 style={headerStyle}>View Leave Request</h3>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ManagerApproval;
