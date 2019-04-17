import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  CustomInput
} from "reactstrap";
import { fetchData, formatDateYMD, fetchFile } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import LoadingPage from "../common/LoadingPage";

class LeaveHistoryView extends Component {
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
      approver: "",
      approverName: "",
      leaveStatus: "",
      approvedDate: "",
      attachment: "",
      leaveStatusLookup: [],
      loading: true
    };
  }

  componentDidMount() {
    const {
      emplId,
      effDate,
      startDate,
      leaveCode
    } = this.props.computedMatch.params;

    this.loadLeaveStatusLookup();

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
          approver: data.approver,
          leaveStatus: data.leaveStatus,
          approvedDate: data.approvedDate,
          attachment: data.attachment,
          loading: false
        });
        this.getApproverName(data.approver);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getApproverName = approverId => {
    fetchData({
      url: API_BASE_URL + "/employeedetails/" + approverId,
      method: "GET"
    })
      .then(data => {
        console.log(data);
        this.setState({
          approverName: data.name + " (" + approverId + ")"
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
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

  handleBackToMain = () => {
    this.props.history.push("/leavehistory");
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
      approverName,
      leaveStatus,
      approvedDate,
      attachment
    } = this.state;

    const BooleanHalfDay = strHalfDay => {
      if (strHalfDay === "Y") {
        return true;
      } else {
        return false;
      }
    };

    // const showFullStatus = strStatus => {
    //   if (strStatus === "PNAPV") {
    //     return "Pending Approvedddddddddddddd";
    //   } else if (strStatus === "APPRV") {
    //     return "Approvedddddddddddddddddddddd";
    //   } else if (strStatus === "CANCL") {
    //     return "Cancelled";
    //   } else if (strStatus === "PNCLD") {
    //     return "Pending Cancel";
    //   } else if (strStatus === "REJCT") {
    //     return "Rejected";
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
            <h3 className="headerStyle">View Leave History</h3>
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
                  <Col sm={10}>{showAttachment(attachment)}</Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="approver" sm={2}>
                    Approver Name:
                  </Label>
                  <Col sm={10}>
                    {/* <Input
                  type="text"
                  name="approver"
                  id="approver"
                  value={approver}
                  disabled={true}
                /> */}
                    <Input
                      type="text"
                      name="approverName"
                      id="approverName"
                      value={approverName}
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
                      value={getLeaveStatusDesc(leaveStatus)}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="endDate" sm={2}>
                    Date Status Changed:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formatDateYMD(approvedDate)}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button
                      color="secondary"
                      onClick={this.handleBackToMain}
                      className="largeButtonOverride"
                    >
                      Back
                    </Button>
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

export default LeaveHistoryView;
