import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import "../common/Styles.css";

class AddPublicHoliday extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
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
              <Input type="text" name="phDay" id="phDay" placeholder="Day" />
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
              <Input type="text" name="state" id="state" placeholder="State" />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddPublicHoliday;
