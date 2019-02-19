import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';

class AddLeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleCancel = () => {
    this.props.history.push("/leavecategory");
  };

  // Do not submit form, unless user clicked on submit button
  doNotSubmit(event) {
    event.preventDefault();
  }

  // create JSON object with form data, and call API
  handleSubmit(event) {
    event.preventDefault();
    let validForm = true;

  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Add Leave Category</h3>
          </span>
        </div>

        <div className="tableContainerFlex">
          <Form>
            <FormGroup row>
              <Label for="leaveCode" sm={2}>
                Leave Code:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveCode"
                  id="leaveCode"
                  placeholder="Leave Code"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2}>
                Leave Description:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveDescription"
                  id="leaveDescription"
                  placeholder="Leave Description"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2}>
                Leave Entitlement:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveEntitlement"
                  id="leaveEntitlement"
                  placeholder="Leave Entitlement"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
              <Button
                  type="button"
                  color="primary"
                  onClick=""
                  className="largeButtonOverride"
                >
                  Save
                </Button>
                <span> </span>
                <Button
                  type="button"
                  color="secondary"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddLeaveCategory);
