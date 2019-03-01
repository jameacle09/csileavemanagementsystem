import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class EditEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplId: "",
      name: "",
      year: "",
      leaveCode: "",
      leaveDescr: "",
      carryForward: 0,
      entitlement: 0,
      availableLeave: 0,
      takenLeave: 0,
      balanceLeave: 0,
      modalSubmit: false
    };
  }

  componentDidMount() {
    this.loadLeaveEntitlement();
  }

  loadLeaveEntitlement = () => {
    const { emplId, year, leaveCode } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/leaveentitlement/" +
        emplId +
        "/" +
        year +
        "/" +
        leaveCode,
      method: "GET"
    })
      .then(data => {
        // console.log(data);
        this.setState({
          emplId: data.id.emplid,
          name: data.employeeDetails.name,
          year: data.id.year,
          leaveCode: data.id.leaveCode,
          leaveDescr: data.leaveCategory.leaveDescr,
          carryForward: data.carryForward,
          entitlement: data.entitlement,
          availableLeave: data.availableLeave,
          takenLeave: data.takenLeave,
          balanceLeave: data.balanceLeave
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChangeLeaveEntitlement = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitLeaveEntitlement = event => {
    event.preventDefault();
    const {
      emplId,
      name,
      year,
      leaveCode,
      leaveDescr,
      carryForward,
      entitlement,
      availableLeave,
      takenLeave,
      balanceLeave
    } = this.state;
    const jsonRowValues = {
      id: {
        emplid: emplId,
        year: year,
        leaveCode: leaveCode
      },
      employeeDetails: {
        emplId: emplId
      },
      leaveCategory: {
        leaveCode: leaveCode
      },
      carryForward: carryForward,
      entitlement: entitlement,
      availableLeave: availableLeave,
      takenLeave: takenLeave,
      balanceLeave: balanceLeave
    };
    const postRequest = Object.assign({}, jsonRowValues);
    fetchData({
      url:
        API_BASE_URL +
        "/leaveentitlement/" +
        emplId +
        "/" +
        year +
        "/" +
        leaveCode,
      method: "PATCH",
      body: JSON.stringify(postRequest)
    })
      .then(response => {
        this.toggleConfirmSubmit();
        confirmAlert({
          message: "Leave Entitlement has been successfully updated!",
          buttons: [
            {
              label: "OK",
              onClick: () => this.props.history.push("/leaveentitlement")
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
  };

  cancelLeaveEntitlement = () => {
    this.props.history.push("/leaveentitlement");
  };

  validateLeaveEntitlementFields = () => {
    const {
      carryForward,
      entitlement,
      availableLeave,
      takenLeave,
      balanceLeave
    } = this.state;

    const isInvalid =
      carryForward === "" ||
      entitlement === "" ||
      availableLeave === "" ||
      takenLeave === "" ||
      balanceLeave === "";
    return isInvalid;
  };

  toggleConfirmSubmit = () => {
    this.setState(prevState => ({
      modalSubmit: !prevState.modalSubmit
    }));
  };

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const {
      emplId,
      name,
      year,
      leaveDescr,
      carryForward,
      entitlement,
      availableLeave,
      takenLeave,
      balanceLeave
    } = this.state;

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Leave Entitlement</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
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
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2}>
                Employee Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Employee Name"
                  value={name}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="year" sm={2}>
                Leave Year:
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="year"
                  id="year"
                  placeholder="Leave Year"
                  value={year}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveDescr" sm={2}>
                Leave Category:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveDescr"
                  id="leaveDescr"
                  placeholder="Leave Category"
                  value={leaveDescr}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="carryForward" sm={2}>
                Carried Forward:
              </Label>
              <Col sm={8}>
                <Input
                  type="number"
                  name="carryForward"
                  id="carryForward"
                  placeholder="Carried Forward"
                  value={carryForward}
                  onChange={this.handleChangeLeaveEntitlement}
                />
              </Col>
              <Label sm={2}>day(s)</Label>
            </FormGroup>
            <FormGroup row>
              <Label for="entitlement" sm={2}>
                Entitlement:
              </Label>
              <Col sm={8}>
                <Input
                  type="number"
                  name="entitlement"
                  id="entitlement"
                  placeholder="Entitlement"
                  value={entitlement}
                  onChange={this.handleChangeLeaveEntitlement}
                />
              </Col>
              <Label sm={2}>day(s)</Label>
            </FormGroup>
            <FormGroup row>
              <Label for="availableLeave" sm={2}>
                Available Leave:
              </Label>
              <Col sm={8}>
                <Input
                  type="number"
                  name="availableLeave"
                  id="availableLeave"
                  placeholder="Available Leave"
                  value={availableLeave}
                  onChange={this.handleChangeLeaveEntitlement}
                />
              </Col>
              <Label sm={2}>day(s)</Label>
            </FormGroup>
            <FormGroup row>
              <Label for="takenLeave" sm={2}>
                Taken Leave:
              </Label>
              <Col sm={8}>
                <Input
                  type="number"
                  name="takenLeave"
                  id="takenLeave"
                  placeholder="Taken Leave"
                  value={takenLeave}
                  onChange={this.handleChangeLeaveEntitlement}
                />
              </Col>
              <Label sm={2}>day(s)</Label>
            </FormGroup>
            <FormGroup row>
              <Label for="balanceLeave" sm={2}>
                Balance Leave:
              </Label>
              <Col sm={8}>
                <Input
                  type="number"
                  name="balanceLeave"
                  id="balanceLeave"
                  placeholder="Balance Leave"
                  value={balanceLeave}
                  onChange={this.handleChangeLeaveEntitlement}
                />
              </Col>
              <Label sm={2}>day(s)</Label>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  className="largeButtonOverride"
                  onClick={this.toggleConfirmSubmit}
                  disabled={this.validateLeaveEntitlementFields()}
                >
                  Save
                </Button>
                <span> </span>
                <Button color="secondary" onClick={this.cancelLeaveEntitlement}>
                  Cancel
                </Button>
                <div>
                  <Modal
                    isOpen={this.state.modalSubmit}
                    toggle={this.toggleConfirmSubmit}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Submit Confirmation</ModalHeader>
                    {/* <ModalBody>
                      Are you sure you want to Save this Edited Leave
                      Entitlement?
                    </ModalBody> */}
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={event => this.submitLeaveEntitlement(event)}
                        className="largeButtonOverride"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="secondary"
                        onClick={this.toggleConfirmSubmit}
                      >
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

export default withRouter(EditEntitlement);
