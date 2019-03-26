import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Modal,
  Alert,
  Badge,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import LoadingPage from "../common/LoadingPage";

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
      computedTakenLeave: 0,
      modalSubmit: false,
      loading: true
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
          balanceLeave: data.balanceLeave,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
      
    fetchData({
      url:
        API_BASE_URL +
        "/appliedleave/count/" +
        emplId +
        "/" +
        leaveCode +
        "/" +
        year,
      method: "GET"
    })
      .then(data => {
        this.setState({
          computedTakenLeave: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChangeLeaveEntitlement = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    // Calculate Balance Leave, and also perform validation
    let newBalanceLeave;
    switch(name) {
      case "takenLeave" : 
        newBalanceLeave = this.state.availableLeave - value;
        break;

      case "availableLeave" :
        newBalanceLeave = value - this.state.takenLeave;
        break;

      default :
        newBalanceLeave = this.state.availableLeave - this.state.takenLeave
    }
    
    this.setState({ balanceLeave: newBalanceLeave < 0 ? 0 : newBalanceLeave})
  };

  submitLeaveEntitlement = event => {
    event.preventDefault();
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
      carryForward < 0 ||
      entitlement === "" ||
      entitlement < 0 ||
      availableLeave === "" ||
      availableLeave < 0 ||
      takenLeave === "" ||
      balanceLeave === "";
    return isInvalid;
  };

  toggleConfirmSubmit = () => {
    this.setState(prevState => ({
      modalSubmit: !prevState.modalSubmit
    }));
  };

  handleResetTakenLeave = () => {
    
    this.setState({
      takenLeave: this.state.computedTakenLeave
    })
  }

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
      balanceLeave,
      computedTakenLeave
    } = this.state;

    let carryForwardMessage = "";
    if(carryForward < 0)
      carryForwardMessage = (
        <Alert 
          color="danger" 
          xs={4} sm={3} 
          style={{padding: ".25em 1em", margin: ".25em 1em"}} 
        > 
        Positive number only 
        </Alert>
      )

    let entitlementMessage = "";
    if (entitlement < 0)
      entitlementMessage = (
        <Alert 
          color="danger" 
          xs={4} sm={3} 
          style={{padding: ".25em 1em", margin: ".25em 1em"}} 
        > 
        Positive number only 
        </Alert>
      )

    let availableLeaveMessage = "";
    if(availableLeave < 0 )
      availableLeaveMessage = (
        <Alert 
          color="danger" 
          xs={4} sm={3} 
          style={{padding: ".25em 1em", margin: ".25em 1em"}} 
        > 
        Positive number only 
        </Alert>
      )
    
    let takenLeaveMessage = "";
    if(computedTakenLeave !== takenLeave)
      takenLeaveMessage = (
        <Alert 
          color="warning" 
          xs={4} sm={3} 
          style={{padding: ".25em 1em", margin: ".25em 1em"}} 
        > 
        Leave Count differ from Applied Leave ( {computedTakenLeave} approved ) {  }
        <Badge href="#" onClick={this.handleResetTakenLeave} color="primary">Reset</Badge>
        </Alert>
      )

    let balanceLeaveMessage = "";
    if(balanceLeave !== (availableLeave - takenLeave))
      balanceLeaveMessage = (
        <Alert 
          color="warning" 
          xs={4} sm={3} 
          style={{padding: ".25em 1em", margin: ".25em 1em"}} 
        > 
        Balance does not tally ( Available Leave - Taken ) 
        </Alert>
      )
    
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Leave Entitlement</h3>
          </span>
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
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
                  <Label for="carryForward" xs={10} sm={2}>
                    Carried Forward:
                  </Label>
                  <Col xs={4} sm={2}>
                    <Input
                      type="number"
                      name="carryForward"
                      id="carryForward"
                      placeholder="Carried Forward"
                      value={carryForward}
                      onChange={this.handleChangeLeaveEntitlement}
                    />
                  </Col>
                  <Label xs={4} sm={2}>day(s)</Label>
                  {carryForwardMessage}
                </FormGroup>
                <FormGroup row>
                  <Label for="entitlement" xs={10} sm={2}>
                    Entitlement:
                  </Label>
                  <Col xs={4} sm={2}>
                    <Input
                      type="number"
                      name="entitlement"
                      id="entitlement"
                      placeholder="Entitlement"
                      value={entitlement}
                      onChange={this.handleChangeLeaveEntitlement}
                    />
                  </Col>
                  <Label xs={4} sm={2}>day(s)</Label>
                  {entitlementMessage}
                </FormGroup>
                <FormGroup row>
                  <Label for="availableLeave" xs={10} sm={2}>
                    Available Leave:
                  </Label>
                  <Col xs={4} sm={2}>
                    <Input
                      type="number"
                      name="availableLeave"
                      id="availableLeave"
                      placeholder="Available Leave"
                      value={availableLeave}
                      onChange={this.handleChangeLeaveEntitlement}
                    />
                  </Col>
                  <Label xs={4} sm={2}>day(s)</Label>
                  {availableLeaveMessage}
                </FormGroup>
                <FormGroup row>
                  <Label for="takenLeave" xs={10} sm={2}>
                    Taken Leave:
                  </Label>
                  <Col xs={4} sm={2}>
                    <Input
                      type="number"
                      name="takenLeave"
                      id="takenLeave"
                      placeholder="Taken Leave"
                      value={takenLeave}
                      onChange={this.handleChangeLeaveEntitlement}
                      disabled
                    />
                  </Col>
                  <Label xs={4} sm={2}>day(s)</Label>
                  {takenLeaveMessage}
                </FormGroup>
                <FormGroup row>
                  <Label for="balanceLeave" xs={10} sm={2}>
                    Balance Leave:
                  </Label>
                  <Col xs={4} sm={2}>
                    <Input
                      type="number"
                      name="balanceLeave"
                      id="balanceLeave"
                      placeholder="Balance Leave"
                      value={balanceLeave}
                      onChange={this.handleChangeLeaveEntitlement}
                      disabled
                    />
                  </Col>
                  <Label xs={4} sm={2}>day(s)</Label>
                  {balanceLeaveMessage}
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
                    <Button
                      color="secondary"
                      onClick={this.cancelLeaveEntitlement}
                    >
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
                            onClick={event =>
                              this.submitLeaveEntitlement(event)
                            }
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
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(EditEntitlement);
