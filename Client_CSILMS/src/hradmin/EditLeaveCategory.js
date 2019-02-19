import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Alert } from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class EditLeaveCategory extends Component {
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

  componentDidMount() {
    const {
      leaveCode
    } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/leavecategory/" +
        leaveCode,
      method: "GET"
    })
      .then(data => {
        console.log("Fetched Data", data);
        this.setState({
          leaveCode: data.leaveCode,
          leaveDescr: data.leaveDescr,
          entitlement: data.entitlement
        });
      })
      .catch(err => {
        console.log(err);
      });
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

  handleSubmit(event) {
    event.preventDefault();
    let validForm = true;

    // // validate form data
    // let EntitlementError = this.validateLeaveEntitlement(this.state.entitlement);
    // if (EntitlementError !== "") validForm = false;

    if (validForm) {
      // create JSON Object for Edit Leave Category
      let editLeaveCategory = {
        leaveCode: this.state.leaveCode,
        leaveDescr: this.state.leaveDescr,
        entitlement: this.state.entitlement
      };

      console.log(JSON.stringify(editLeaveCategory));

      const {
        leaveCode
      } = this.props.computedMatch.params;

      
      fetchData({
        url: API_BASE_URL + "/leavecategory/" +
        leaveCode,
        method: "PATCH",
        body: JSON.stringify(editLeaveCategory)
      })
      this.props.history.push("/leavecategory");
      
    }
  }

  // validateLeaveEnt(leaveEnt) {
  //   // Validate if input is a number
  //   if (isNaN(leaveEnt)) {
  //     return <Alert color="danger">Invalid number</Alert>;
  //   }
  //   if (leaveEnt === ""){
  //     return <Alert color="danger">Please Fill Required Field</Alert>;
  //   }
  // }
  
  render() {
    const {
      leaveCode,
      leaveDescr,
      entitlement
    } = this.state;
    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }

    // let leaveEntErrorMsg = this.validateLeaveEnt(entitlement);

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Leave Category</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
        <Form onSubmit={this.doNotSubmit}>
            <FormGroup row>
              <Label for="leaveCode" sm={2}>
                Leave Code:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveCode"
                  id="leaveCode"
                  value={leaveCode}                  
                  onChange={this.handleChange}
                  required
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
                  name="leaveDescr"
                  id="leaveDescription"
                  value={leaveDescr}
                  onChange={this.handleChange}
                  required
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
                  name="entitlement"
                  id="leaveEntitlement"
                  value={entitlement}
                  onChange={this.handleChange}
                  required
                />
                {/* {leaveEntErrorMsg} */}
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

export default withRouter(EditLeaveCategory);
