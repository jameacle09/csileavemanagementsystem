import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Alert
} from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";

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
    this.toggleApprove = this.toggleApprove.bind(this);
  }

  toggleApprove = () => {
    this.setState(prevState => ({
      modalApprove: !prevState.modalApprove
    }));
  };

  handleCancel = () => {
    this.props.history.push("/leavecategory");
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateFields = () => {
    const { leaveCode, leaveDescr, entitlement } = this.state;
    const isInvalid = !leaveCode || !leaveDescr || !entitlement;
    return isInvalid;
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
      let addLeaveCategory = {
        leaveCode: this.state.leaveCode,
        leaveDescr: this.state.leaveDescr,
        entitlement: this.state.entitlement
      };

      // console.log(JSON.stringify(addLeaveCategory));

      fetchData({
        url: API_BASE_URL + "/leavecategory",
        method: "POST",
        body: JSON.stringify(addLeaveCategory)
      })
      .then(response => {
        this.toggleApprove();
        confirmAlert({
          message: "Leave Category has been successfully added!",
          buttons: [
            {
              label: "OK",
              onClick: () => this.props.history.push("/leavecategory")
            }
          ]
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
    }
  }

  validateLeaveEnt(leaveEnt) {
    // Validate if input is a number
    if (isNaN(leaveEnt)) {
      return <Alert color="danger">Invalid number</Alert>;
    }
  }

  render() {
    const { leaveCode, leaveDescr, entitlement } = this.state;
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    let leaveEntErrorMsg = this.validateLeaveEnt(entitlement);

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Add Leave Category</h3>
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
                  maxLength="3"
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
                  maxLength="2"
                  name="entitlement"
                  id="leaveEntitlement"
                  value={entitlement}
                  onChange={this.handleChange}
                  required
                />
                <span>{leaveEntErrorMsg}</span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  type="button"
                  color="primary"
                  onClick={this.toggleApprove}
                  className="largeButtonOverride"
                  disabled={this.validateFields()}
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
                <div>
                  <Modal
                    isOpen={this.state.modalApprove}
                    toggle={this.toggleApprove}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Add Confirmation</ModalHeader>
                    {/* <ModalBody>
                      Are you sure you want to add this item?
                    </ModalBody> */}
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={this.handleSubmit}
                        className="largeButtonOverride"
                      >
                        Confirm
                      </Button>
                      <Button color="secondary" onClick={this.toggleApprove}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddLeaveCategory);
