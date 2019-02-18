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
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import "../common/Styles.css";

class LeaveRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplId: "",
      name: "",
      leaveDescr: "",
      startDate: "",
      endDate: "",
      isHalfDay: "N",
      leaveDuration: "1 day(s)",
      leaveReason: "",
      modalApprove: false,
      modalReject: false
    };
    this.toggleApprove = this.toggleApprove.bind(this);
    this.toggleReject = this.toggleReject.bind(this);
  }

  toggleApprove = () => {
    this.setState(prevState => ({
      modalApprove: !prevState.modalApprove
    }));
  };

  toggleReject = () => {
    this.setState(prevState => ({
      modalReject: !prevState.modalReject
    }));
  };

  componentDidMount() {
    const {
      emplId,
      effDate,
      startDate,
      leaveCode
    } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/appliedleave/" +
        emplId +
        "/" +
        effDate +
        "/" +
        startDate +
        "/" +
        leaveCode,
      method: "GET"
    })
      .then(data => {
        console.log("Fetched Data", data);
        this.setState({
          emplId: data.id.emplid,
          name: data.employeeDetails.name,
          leaveDescr: data.leaveCategory.leaveDescr,
          startDate: data.id.startDate,
          endDate: data.endDate,
          isHalfDay: data.halfDay,
          leaveDuration: data.leaveDuration + " day(s)",
          leaveReason: data.reason
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCancel = () => {
    this.props.history.push("/leaverequests");
  };

  updateAppliedLeaveStatus = (event, strLeaveStatus) => {
    const {
      emplId,
      effDate,
      startDate,
      leaveCode
    } = this.props.computedMatch.params;
    const leaveStatus = strLeaveStatus;

    event.preventDefault();
    console.log("leaveStatus", leaveStatus);

    // if (strLeaveStatus === "APPRV") {
    //   this.setState(prevState => ({
    //     modalApprove: !prevState.modalApprove
    //   }));
    // } else {
    //   this.setState(prevState => ({
    //     modalReject: !prevState.modalReject
    //   }));
    // }

    fetchData({
      url:
        API_BASE_URL +
        "/appliedleave/" +
        emplId +
        "/" +
        effDate +
        "/" +
        startDate +
        "/" +
        leaveCode +
        "/" +
        leaveStatus,
      method: "PATCH"
    })
      .then(response => {
        console.log(response);
        if (response.message === "Leave application updated") {
          console.log("Update Successful!");
        } else {
          console.log("Update Unsuccessful!");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/leaverequests");
  };

  render() {
    const {
      emplId,
      name,
      leaveDescr,
      startDate,
      endDate,
      isHalfDay,
      leaveDuration,
      leaveReason
    } = this.state;

    const BooleanHalfDay = strHalfDay => {
      if (strHalfDay === "Y") {
        return true;
      } else {
        return false;
      }
    };

    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: "absolute", top: "15px", right: "15px" }}
        onClick={this.toggle}
      >
        &times;
      </button>
    );

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Leave Request for Approval</h3>
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
                  value={name}
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
                  value={leaveDescr}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="startDate" sm={2}>
                Start Date:
              </Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formatDateYMD(startDate)}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="endDate" sm={2}>
                End Date:
              </Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formatDateYMD(endDate)}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="endDate" sm={2}>
                Taking Half Day?
              </Label>
              <Col sm={10}>
                <CustomInput
                  type="checkbox"
                  id="isHalfDay"
                  label=""
                  checked={BooleanHalfDay(isHalfDay)}
                  disabled={true}
                />
              </Col>
              {/* <Label check>
                <Input
                  type="checkbox"
                  name="isHalfDay"
                  id="isHalfDay"
                  checked={BooleanHalfDay(isHalfDay)}
                  disabled={true}
                />
                Taking Half Day Leave?
              </Label> */}
            </FormGroup>
            <FormGroup row>
              <Label for="leaveDuration" sm={2}>
                Leave Duration:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveDuration"
                  id="leaveDuration"
                  value={leaveDuration}
                  placeholder="Days"
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveReason" sm={2}>
                Leave Reason:
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="leaveReason"
                  id="leaveReason"
                  value={leaveReason}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="attachment" sm={2}>
                File Attachment:
              </Label>
              <Col sm={10}>
                <FormText color="muted">No attachment uploaded.</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  type="button"
                  color="primary"
                  onClick={this.toggleApprove}
                  className="largeButtonOverride"
                >
                  Approve
                </Button>
                <span> </span>
                <Button
                  type="button"
                  color="danger"
                  onClick={this.toggleReject}
                >
                  Reject
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
                    // external={externalCloseBtn}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Approval Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to Approve this Leave Request?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={event =>
                          this.updateAppliedLeaveStatus(event, "APPRV")
                        }
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
                <div>
                  <Modal
                    isOpen={this.state.modalReject}
                    toggle={this.toggleReject}
                    className={this.props.className}
                    // external={externalCloseBtn}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Rejection Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to Reject this Leave Request?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="danger"
                        onClick={event =>
                          this.updateAppliedLeaveStatus(event, "REJCT")
                        }
                      >
                        Confirm
                      </Button>
                      <Button color="secondary" onClick={this.toggleReject}>
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

export default LeaveRequest;
