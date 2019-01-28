import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SideBar from "./SideBar";
import "../common/Styles.css";

class AddPublicHoliday extends Component {
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
                <h3 className="headerStyle">Add Public Holiday</h3>
              </span>
            </div>
            <br />
            <div className="tableContainerFlex">
              <Form>
                <FormGroup>
                  <Label for="phDate">Date</Label>
                  <Input
                    type="date"
                    name="phDate"
                    id="phDate"
                    placeholder="Public Holiday Date"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phDay">Day</Label>
                  <Input
                    type="text"
                    name="phDay"
                    id="phDay"
                    placeholder="Day"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="holiday">Holiday</Label>
                  <Input
                    type="text"
                    name="holiday"
                    id="holiday"
                    placeholder="Description"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State"
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

export default AddPublicHoliday;
