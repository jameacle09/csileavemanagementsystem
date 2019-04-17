import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  CustomInput,
  Modal,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { fetchData, formatDateYMD, fetchFile } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import LoadingPage from "../common/LoadingPage";

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
      leaveStatus: "",
      attachment: "",
      modalApprove: false,
      modalReject: false,
      leaveStatusLookup: [],
      loading: true
    };
    this.toggleApprove = this.toggleApprove.bind(this);
    this.toggleReject = this.toggleReject.bind(this);
    this.updateAppliedLeaveStatus = this.updateAppliedLeaveStatus.bind(this);
    this.updateAppliedLeaveStatusCancel = this.updateAppliedLeaveStatusCancel.bind(
      this
    );
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
    this.loadLeaveStatusLookup();
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
        this.setState({
          emplId: data.id.emplid,
          name: data.employeeDetails.name,
          leaveDescr: data.leaveCategory.leaveDescr,
          startDate: data.id.startDate,
          endDate: data.endDate,
          isHalfDay: data.halfDay,
          leaveDuration: data.leaveDuration + " day(s)",
          leaveReason: data.reason,
          leaveStatus: data.leaveStatus,
          attachment: data.attachment,
          loading: false
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

    if (leaveStatus === "APPRV") {
      this.toggleApprove();
    } else if (leaveStatus === "REJCT") {
      this.toggleReject();
    } else {
      this.handleCancel();
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
            message: "Leave Application has been successfully updated!",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/leaverequests")
              }
            ]
          });
        } else {
          confirmAlert({
            message: "An error occurred. You may try again later...",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/leaverequests")
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

  updateAppliedLeaveStatusCancel = (event, strLeaveStatus) => {
    const {
      emplId,
      effDate,
      startDate,
      leaveCode
    } = this.props.computedMatch.params;
    const leaveStatus = strLeaveStatus;

    event.preventDefault();

    /* 
      The leaveStatus is opposite when approving leave pending cancellation: 
        CANCL means cancellation request is approved
        APPRV means cancellation request is rejected
    */
    if (leaveStatus === "CANCL") {
      this.toggleApprove();
    } else if (leaveStatus === "APPRV") {
      this.toggleReject();
    } else {
      this.handleCancel();
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
            message: "Leave Application has been successfully updated!",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/leaverequests")
              }
            ]
          });
        } else {
          confirmAlert({
            message: "An error occurred. You may try again later...",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/leaverequests")
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

  getAttachment = () => {
    let attachmentFile = this.state.attachment;
    if (attachmentFile !== "") {
      fetchFile({
        url: API_BASE_URL + "/attachment/files/" + this.state.attachment,
        method: "GET"
      })
        .then(response => response.blob())
        .then(blob => {
          /*
          // 2. Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.state.attachment);
          // 3. Append to html page
          document.body.appendChild(link);
          // 4. Force download
          link.click();
          // 5. Clean up and remove the link
          link.parentNode.removeChild(link);
          */
          let contentType = "";
          switch (
            attachmentFile
              .split(".")
              .pop()
              .toLowerCase()
          ) {
            case "pdf":
              contentType = "application/pdf";
              break;
            case "jpg":
            case "jpe":
            case "jfif":
            case "jpeg":
              contentType = "image/jpg";
              break;
            case "png":
              contentType = "image/png";
              break;
            case "gif":
              contentType = "image/gif";
              break;
            case "bmp":
              contentType = "image/bmp";
              break;
            default:
              contentType = "";
              break;
          }
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, attachmentFile);
          } else if (contentType) {
            const url = URL.createObjectURL(
              new Blob([blob], { type: contentType })
            );
            window.open(url);
          } else {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", attachmentFile);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  loadLeaveStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/leave_status",
      method: "GET"
    })
      .then(data => this.setState({ leaveStatusLookup: data }))
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
      isHalfDay,
      leaveDuration,
      leaveReason,
      leaveStatus,
      attachment
    } = this.state;

    const BooleanHalfDay = strHalfDay => {
      if (strHalfDay === "Y") {
        return true;
      } else {
        return false;
      }
    };

    // const externalCloseBtn = (
    //   <button
    //     className="close"
    //     style={{ position: "absolute", top: "15px", right: "15px" }}
    //     onClick={this.toggle}
    //   >
    //     &times;
    //   </button>
    // );

    // const showFullStatus = strStatus => {
    //   if (strStatus === "PNAPV") {
    //     return "Pending Approve";
    //   } else if (strStatus === "APPRV") {
    //     return "Approved";
    //   } else if (strStatus === "CANCL") {
    //     return "Cancelled";
    //   } else if (strStatus === "PNCLD") {
    //     return "Pending Cancel";
    //   } else if (strStatus === "REJCT") {
    //     return "Rejected";
    //   } else {
    //     return "";
    //   }
    // };

    const getLeaveStatusDesc = strLeaveStatus => {
      let arrLeaveStatusLookup = this.state.leaveStatusLookup;
      let leaveDesc = "";
      arrLeaveStatusLookup.forEach(leaveStat => {
        if (leaveStat.id.fieldvalue === strLeaveStatus) {
          return (leaveDesc = leaveStat.xlatlongname);
        }
      });
      return leaveDesc;
    };

    const showModalApproveByStatus = leaveStatus => {
      if (leaveStatus === "PNAPV") {
        return (
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
            {" "}
            <ModalHeader>Approval Confirmation</ModalHeader>
            {/* <ModalBody>
            Are you sure you want to Approve this Leave Request?
        </ModalBody> */}
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                onClick={event => this.updateAppliedLeaveStatus(event, "APPRV")}
                className="largeButtonOverride"
              >
                Confirm
              </Button>
              <Button color="secondary" onClick={this.toggleApprove}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        );
      } else if (leaveStatus === "PNCLD") {
        return (
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
            {" "}
            <ModalHeader>Approval Confirmation</ModalHeader>
            {/* <ModalBody>
            Are you sure you want to change the status of this Leave Request to Cancel?
        </ModalBody> */}
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                onClick={event =>
                  this.updateAppliedLeaveStatusCancel(event, "CANCL")
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
        );
      }
    };

    const showModalRejectByStatus = leaveStatus => {
      if (leaveStatus === "PNAPV") {
        return (
          <Modal
            isOpen={this.state.modalReject}
            toggle={this.toggleReject}
            className={this.props.className}
            style={{
              width: "360px",
              height: "300px",
              margin: "220px auto"
            }}
          >
            <ModalHeader>Reject Confirmation</ModalHeader>
            {/* <ModalBody>
            Are you sure you want to Reject this Leave Request?
        </ModalBody> */}
            <ModalFooter>
              <Button
                type="submit"
                color="danger"
                onClick={event => this.updateAppliedLeaveStatus(event, "REJCT")}
              >
                Confirm
              </Button>
              <Button color="secondary" onClick={this.toggleReject}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        );
      } else if (leaveStatus === "PNCLD") {
        return (
          <Modal
            isOpen={this.state.modalReject}
            toggle={this.toggleReject}
            className={this.props.className}
            style={{
              width: "360px",
              height: "300px",
              margin: "220px auto"
            }}
          >
            <ModalHeader>Reject Confirmation</ModalHeader>
            {/* <ModalBody>
            Are you sure you want to Reject this Pending Cancel Request?
        </ModalBody> */}
            <ModalFooter>
              <Button
                type="submit"
                color="danger"
                onClick={event =>
                  this.updateAppliedLeaveStatusCancel(event, "APPRV")
                }
              >
                Confirm
              </Button>
              <Button color="secondary" onClick={this.toggleReject}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    };

    const showAttachment = attachment => {
      if (attachment !== "") {
        return (
          <Button color="link" onClick={this.getAttachment}>
            {" "}
            {attachment}
          </Button>
        );
      } else {
        return <FormText color="muted"> No attachment uploaded. </FormText>;
      }
    };

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Leave Request for Approval</h3>
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
                    Leave Type:
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
                  <Col sm={10}>{showAttachment(attachment)}</Col>
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
                      value={getLeaveStatusDesc(leaveStatus)}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button
                      color="primary"
                      onClick={this.toggleApprove}
                      className="largeButtonOverride"
                    >
                      Approve
                    </Button>
                    <span> </span>
                    <Button color="danger" onClick={this.toggleReject}>
                      Reject
                    </Button>
                    <span> </span>
                    <Button color="secondary" onClick={this.handleCancel}>
                      Cancel
                    </Button>
                    <div>
                      {showModalApproveByStatus(leaveStatus)}
                      {/* <Modal
                    isOpen={this.state.modalApprove}
                    toggle={this.toggleApprove}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  > */}

                      {/* <ModalHeader>Approval Confirmation</ModalHeader>
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
                    </ModalFooter> */}
                      {/* </Modal> */}
                    </div>
                    <div>
                      {showModalRejectByStatus(leaveStatus)}
                      {/* <Modal
                    isOpen={this.state.modalReject}
                    toggle={this.toggleReject}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Reject Confirmation</ModalHeader>
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
                  </Modal> */}
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

export default withRouter(LeaveRequest);
