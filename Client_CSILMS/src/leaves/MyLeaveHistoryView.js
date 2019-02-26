import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import "../common/Styles.css";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

class MyLeaveHistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplId: "",
      name: "",
      leaveDescr: "",
      startDate: "",
      endDate: "",
      leaveDuration: "1 day(s)",
      leaveReason: "",
      approver: "",
      leaveStatus: "",
      approvedDate: ""
    };
    this.toggleCancelLeave = this.toggleCancelLeave.bind(this);
    this.toggleDeleteLeave = this.toggleDeleteLeave.bind(this);
    this.updateAppliedLeaveStatus = this.updateAppliedLeaveStatus.bind(this);
  }

  toggleCancelLeave = () => {
    this.setState(prevState => ({
      modalCancelLeave: !prevState.modalCancelLeave
    }));
  };

  toggleDeleteLeave = () => {
    this.setState(prevState => ({
      modalDeleteLeave: !prevState.modalDeleteLeave
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
          leaveDuration: data.leaveDuration + " day(s)",
          leaveReason: data.reason,
          approver: data.approver,
          leaveStatus: data.leaveStatus
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleBackToMain = () => {
    this.props.history.push("/myleavehistory");
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

    if (leaveStatus === "PNCLD") {
      this.toggleCancelLeave();
    } else {
      this.handleBackToMain();
    }

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
        if (response.message === "Success") {
          confirmAlert({
            message: "Leave Application has been successfully updated to Pending Cancel!",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/myleavehistory")
              }
            ]
          });
        } else {
          confirmAlert({
            message: "An error occurred. You may try again later...",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/myleavehistory")
              }
            ]
          });
        }
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

  deleteAppliedLeaveStatus = (event, strLeaveStatus) => {
    const {
      emplId,
      effDate,
      startDate,
      leaveCode
    } = this.props.computedMatch.params;
    const leaveStatus = strLeaveStatus;

    event.preventDefault();

    if (leaveStatus === "PNAPV") {
      this.toggleDeleteLeave();
    } else {
      this.handleBackToMain();
    }

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
      method: "DELETE"
    })
      .then(response => {
        if (response.message === "Success") {
          confirmAlert({
            message: "Leave Application has been successfully deleted!",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/myleavehistory")
              }
            ]
          });
        } else {
          confirmAlert({
            message: "An error occurred. You may try again later...",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/myleavehistory")
              }
            ]
          });
        }
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

  render() {
    const {
      emplId,
      name,
      leaveDescr,
      startDate,
      endDate,
      leaveDuration,
      leaveReason,
      approver,
      leaveStatus
    } = this.state;

    const showFullStatus = strStatus => {
      if (strStatus === "PNAPV") {
        return "Pending Approve";
      } else if (strStatus === "APPRV") {
        return "Approved";
      } else if (strStatus === "CANCL") {
        return "Cancelled";
      } else if (strStatus === "PNCLD") {
        return "Pending Cancel";
      } else if (strStatus === "REJCT") {
        return "Rejected";
      }
    };
    const showButtonByStatus = leaveStatus => {
      if (leaveStatus === "PNAPV") {
        return <Button
        type="button"
        color="primary"
        onClick={this.toggleDeleteLeave}
        className="largeButtonOverride"
      >
        Cancel Leave
      </Button> 
      }
      else if (leaveStatus === "APPRV") {
        return <Button
        type="button"
        color="primary"
        onClick={this.toggleCancelLeave}
        className="largeButtonOverride"
      >
        Cancel Leave
      </Button>
      }
    };
    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">View My Leave History</h3>
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
              <Label for="approver" sm={2}>
                Approver ID:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="approver"
                  id="approver"
                  value={approver}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveStatus" sm={2}>
                Leave Status:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveStatus"
                  id="leaveStatus"
                  value={showFullStatus(leaveStatus)}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
              {/* <Button
                  type="button"
                  color="primary"
                  onClick={this.toggleCancelLeave}
                  className="largeButtonOverride"
                >
                  Cancel Leave
                </Button> */}
                { showButtonByStatus(leaveStatus) }
                {/* <Button
                  type="button"
                  color="primary"
                  onClick={this.toggleDeleteLeave}
                  className="largeButtonOverride"
                >
                  Delete Leave
                </Button> */}
                <span> </span>
                <Button
                  color="primary"
                  onClick={this.handleBackToMain}
                  className="largeButtonOverride"
                >
                  Back
                </Button>
                <div>
                  <Modal
                    isOpen={this.state.modalCancelLeave}
                    toggle={this.toggleCancelLeave}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Cancel Leave Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to Cancel this Annual Leave Request?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={event =>
                          this.updateAppliedLeaveStatus(event, "PNCLD")
                        }
                        className="largeButtonOverride"
                      >
                        Confirm
                      </Button>
                      <Button color="secondary" onClick={this.toggleCancelLeave}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
                <div>
                  <Modal
                    isOpen={this.state.modalDeleteLeave}
                    toggle={this.toggleDeleteLeave}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Approval Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to Delete this Leave Request?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={this.deleteAppliedLeaveStatus}
                        className="largeButtonOverride"
                      >
                        Confirm
                      </Button>
                      <Button color="secondary" onClick={this.toggleDeleteLeave}>
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

export default withRouter(MyLeaveHistoryView);
