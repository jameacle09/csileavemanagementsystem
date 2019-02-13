import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from '@material-ui/core/Button';
import "../common/Styles.css";
import  { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';

class AddLeaveCategory extends Component {
  render() {
    if(!isHrRole(this.props.currentUser)){
      return(<Redirect to='/forbidden'  />);
    }

    return (
      <div className="mainContainerFlex">
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
            <Button variant="contained" color="primary" style={{ textTransform: "none", color: "white" }}>Save</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddLeaveCategory);
