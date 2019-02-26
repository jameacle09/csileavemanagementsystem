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
import { withRouter } from "react-router-dom";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class AddEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeProfiles: [],
      leaveCategories: [],
      emplId: "",
      name: "",
      year: "",
      leaveCode: "AL",
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
    this.loadEmployeeProfilesLookup();
    this.loadLeaveCategoriesLookup();
  }

  loadEmployeeProfilesLookup = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => this.setState({ employeeProfiles: data }))
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

  loadLeaveCategoriesLookup = () => {
    fetchData({
      url: API_BASE_URL + "/leavecategories",
      method: "GET"
    })
      .then(data => this.setState({ leaveCategories: data }))
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

  handleChangeLeaveEntitlement = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateLeaveEntitlementFields = () => {
    const {
      emplId,
      year,
      leaveCode,
      carryForward,
      entitlement,
      availableLeave,
      takenLeave,
      balanceLeave
    } = this.state;

    const isInvalid =
      !emplId ||
      !year ||
      !leaveCode ||
      carryForward === "" ||
      entitlement === "" ||
      availableLeave === "" ||
      takenLeave === "" ||
      balanceLeave === "";
    return isInvalid;
  };

  submitLeaveEntitlement = event => {
    event.preventDefault();
    const {
      emplId,
      //name,
      year,
      leaveCode,
      // leaveDescr,
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
      url: API_BASE_URL + "/leaveentitlement",
      method: "POST",
      body: JSON.stringify(postRequest)
    })
      .then(response => {
        this.toggleConfirmSubmit();
        confirmAlert({
          message: "Leave Entitlement has been successfully added!",
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

  handleCancel = () => {
    this.props.history.push("/leaveentitlement");
  };

  toggleConfirmSubmit = () => {
    this.setState(prevState => ({
      modalSubmit: !prevState.modalSubmit
    }));
  };

  render() {
    // if (!isHrRole(this.props.currentUser)) {
    //   return <Redirect to="/forbidden" />;
    // }
    console.log(this.state);
    const {
      employeeProfiles,
      leaveCategories,
      emplId,
      // name,
      year,
      leaveCode,
      // leaveDescr,
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
            <h3 className="headerStyle">Add Leave Entitlement</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
            <FormGroup row>
              <Label for="emplId" sm={2}>
                Employee Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="emplId"
                  id="emplId"
                  onChange={this.handleChangeLeaveEntitlement}
                  value={emplId}
                >
                  <option />
                  {employeeProfiles.map(employeeProfiles => {
                    return (
                      <option
                        key={employeeProfiles.emplId}
                        value={employeeProfiles.emplId}
                      >
                        {employeeProfiles.name} ({employeeProfiles.emplId})
                      </option>
                    );
                  })}
                </Input>
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
                  onChange={this.handleChangeLeaveEntitlement}
                  value={year}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveCode" sm={2}>
                Leave Category:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="leaveCode"
                  id="leaveCode"
                  onChange={this.handleChangeLeaveEntitlement}
                  value={leaveCode}
                >
                  {leaveCategories.map(leaveCategories => {
                    return (
                      <option
                        key={leaveCategories.leaveCode}
                        value={leaveCategories.leaveCode}
                      >
                        {leaveCategories.leaveDescr} (
                        {leaveCategories.leaveCode})
                      </option>
                    );
                  })}
                </Input>
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
                  onChange={this.handleChangeLeaveEntitlement}
                  value={carryForward}
                  required
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
                  onChange={this.handleChangeLeaveEntitlement}
                  value={entitlement}
                  required
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
                  onChange={this.handleChangeLeaveEntitlement}
                  value={availableLeave}
                  required
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
                  onChange={this.handleChangeLeaveEntitlement}
                  value={takenLeave}
                  required
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
                  onChange={this.handleChangeLeaveEntitlement}
                  value={balanceLeave}
                  required
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
                <Button color="secondary" onClick={this.handleCancel}>
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
                    <ModalBody>
                      Are you sure you want to Save this New Leave Entitlement?
                    </ModalBody>
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

export default withRouter(AddEntitlement);
