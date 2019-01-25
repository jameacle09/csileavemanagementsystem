import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SideBar from "./SideBar";
import "../common/Styles.css";

class AddLeaveCategory extends Component {
  render() {
    return (
      <Col>
        <Row>
          <Col md="1.5">
            <SideBar />
          </Col>
          <Col xs className="content">
            <div className="headerContainerFlex">
              <span className="header">
                <h3 className="headerStyle">Add Leave Category</h3>
              </span>
            </div>
            <br />
            <div className="tableContainerFlex">
              <Form>
                <FormGroup>
                  <Label for="leaveCode">Leave Code</Label>
                  <Input
                    type="text"
                    name="leaveCode"
                    id="leaveCode"
                    placeholder="Leave Code"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="leaveDescription">Leave Description</Label>
                  <Input
                    type="text"
                    name="leaveDescription"
                    id="leaveDescription"
                    placeholder="Leave Description"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="leaveEntitlement">Leave Entitlement</Label>
                  <Input
                    type="text"
                    name="leaveEntitlement"
                    id="leaveEntitlement"
                    placeholder="Leave Entitlement"
                  />
                </FormGroup>
                <Button color="primary">Save</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default AddLeaveCategory;
