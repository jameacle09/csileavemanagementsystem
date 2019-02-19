import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Alert,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
// import Button from '@material-ui/core/Button';
import "../common/Styles.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// import NewEmpLookupModal from "../modal/NewEmpLookup";

const initialState = {
  userId: "",
  emplId: "",
  emplName: "",
  password: "",
  confirmPassword: "",
  lockAccount: false
  // modalShow: false
};

class UserProfile extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { userId, emplId, emplName, password, confirmPassword } = this.state;
    const isInvalid =
      !userId ||
      !emplId ||
      !emplName ||
      !password ||
      password !== confirmPassword;
    return isInvalid;
  };

  handleChange = event => {
    const { name, value } = event.target;
    if (name === "lockAccount") {
      this.setState(prevState => ({
        lockAccount: !prevState.lockAccount
      }));
      // this.setState({ lockAccount: !prevState.lockAccount });
    } else {
      this.setState({ [name]: value });
    }
  };

  clickDiscard = () => {
    confirmAlert({
      message: "Do you want to cancel this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.history.push("/logindetails")
        },
        {
          label: "No"
        }
      ]
    });
  };

  // showModal = () => {
  //   this.setState({
  //     ...this.state,
  //     modalShow: !this.state.modalShow
  //   });
  // };

  render() {
    const {
      userId,
      emplId,
      emplName,
      password,
      confirmPassword,
      lockAccount
      // modalShow
    } = this.state;
    // console.log(this.state);
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Add User Login Details</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  className="largeButtonOverride"
                  onClick={this.showModal}
                >
                  <span className="fa fa-search" />
                  &nbsp; Search New Employee
                </Button>
                {/* <NewEmpLookupModal onClose={this.showModal} show={modalShow}>
                  Search New Employee
                </NewEmpLookupModal> */}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="userId" sm={2}>
                User ID (Email):
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="userId"
                  id="userId"
                  placeholder="User ID"
                  value={userId}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="emplId" sm={2}>
                Employee ID:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="emplId"
                  id="emplId"
                  placeholder="Employee ID"
                  value={emplId}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="emplName" sm={2}>
                Employee Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="emplName"
                  id="emplName"
                  placeholder="Employee Name"
                  value={emplName}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={2}>
                Password
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword" sm={2}>
                Confirm Password
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                  value={confirmPassword}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lockAccount" sm={2}>
                Locked Account?
              </Label>
              <Col sm={10}>
                <CustomInput
                  type="checkbox"
                  id="lockAccount"
                  name="lockAccount"
                  label=""
                  onChange={this.handleChange}
                  checked={lockAccount}
                />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  color="primary"
                  style={{ backgroundColor: "#3F51B5", color: "white" }}
                  disabled={this.validateForm()}
                >
                  Submit
                </Button>
                <span> </span>
                <Button color="secondary" onClick={this.clearState}>
                  Reset
                </Button>
                <span> </span>
                <Button color="secondary" onClick={this.clickDiscard}>
                  Discard
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default UserProfile;
