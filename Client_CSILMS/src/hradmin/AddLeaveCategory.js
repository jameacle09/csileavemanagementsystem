import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class AddLeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveCode: "",
      leaveDescr: "",
      entitlement: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doNotSubmit = this.doNotSubmit.bind(this);
  }
  handleCancel = () => {
    this.props.history.push("/leavecategory");
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Do not submit form, unless user clicked on submit button
  doNotSubmit(event) {
    event.preventDefault();
  }

  // create JSON object with form data, and call API
  handleSubmit(event) {
    event.preventDefault();
    let validForm = true;

    if (validForm) {
      // create JSON Object for Edit Leave Category
      let editLeaveCategory = {
        leaveCode: this.state.leaveCode,
        leaveDescr: this.state.leaveDescr,
        entitlement: this.state.entitlement
      };

      console.log(JSON.stringify(editLeaveCategory));

      // const {
      //   leaveCode
      // } = this.props.computedMatch.params;

      fetchData({
        url: API_BASE_URL + "/leavecategory/",
        method: "POST",
        body: JSON.stringify(editLeaveCategory)
      })
      this.props.history.push("/leavecategory");
      
    }
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
                  onClick={this.handleSubmit}
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
