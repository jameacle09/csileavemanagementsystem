import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";

class PublicHoliday extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Public Holiday</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <div style={{ textAlign: "right" }}>
            <Button
              component={Link}
              to="/publicholiday/add"
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
            >
              <span
                className="fa fa-plus"
                style={{ margin: "0px 10px 0px 0px" }}
              />{" "}
              New
            </Button>
            <span> </span>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
            >
              <span
                className="fa fa-upload"
                style={{ margin: "0px 10px 0px 0px" }}
              />
              Upload Holiday
            </Button>
            <br />
            <br />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Holiday</th>
                <th>State</th>
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
                    component={Link}
                    to={`/publicholiday/edit/${"holidayId"}`}
                    variant="contained"
                    color="primary"
                  >
                    <span className="fa fa-edit" />
                  </Button>
                </td>
                <td>
                  <Button variant="contained" color="primary">
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

export default PublicHoliday;
