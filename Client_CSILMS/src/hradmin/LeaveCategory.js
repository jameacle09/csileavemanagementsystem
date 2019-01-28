import React, { Component } from "react";
import { Button, Table, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../common/Styles.css";

class LeaveCategory extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">List of Leave Category</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <div style={{ textAlign: "right" }}>
            <Button
              className="btn btn-primary"
              color="primary"
              tag={Link}
              to="/addleavecategory"
              activeclassname="active"
            >
              Add New
            </Button>
            <br />
            <br />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>Leave Code</th>
                <th>Description</th>
                <th>Entitlement</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
                <td>
                  <Button
                    color="primary"
                    tag={Link}
                    to="/editleavecategory"
                    activeclassname="active"
                  >
                    <span>Edit</span>
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

export default LeaveCategory;
