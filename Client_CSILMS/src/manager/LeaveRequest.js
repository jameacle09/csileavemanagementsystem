import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Alert
} from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

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
      leaveReason: ""
    };
  }

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
        // console.log(data);
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
    console.log(this.state);
    const formatDate = strDate => {
      var d = new Date(strDate),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };
    const BooleanHalfDay = strHalfDay => {
      if (strHalfDay === "Y") {
        return true;
      } else {
        return false;
      }
    };

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Leave Request for Approval</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Form>
            <FormGroup>
              <Label for="emplId">Employee ID:</Label>
              <Input
                type="text"
                name="emplId"
                id="emplId"
                value={emplId}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Employee Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="leaveDescr">Leave Category:</Label>
              <Input
                type="text"
                name="leaveDescr"
                id="leaveDescr"
                value={leaveDescr}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date:</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={formatDate(startDate)}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date:</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={formatDate(endDate)}
                disabled={true}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="isHalfDay"
                  id="isHalfDay"
                  checked={BooleanHalfDay(isHalfDay)}
                  disabled={true}
                />
                Taking Half Day Leave?
              </Label>
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="leaveDuration">Leave Duration:</Label>
              <Input
                type="text"
                name="leaveDuration"
                id="leaveDuration"
                value={leaveDuration}
                placeholder="Days"
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="leaveReason">Leave Reason:</Label>
              <Input
                type="textarea"
                name="leaveReason"
                id="leaveReason"
                value={leaveReason}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="attachment">File Attachment:</Label>
              <Input type="file" name="attachment" id="attachment" />
              <FormText color="muted">
                Click to view the attached document.
              </FormText>
            </FormGroup>
            <br />
            <Button
              color="primary"
              style={{ backgroundColor: "#3F51B5", color: "white" }}
            >
              Approve
            </Button>
            <span> </span>
            <Button
              color="primary"
              style={{ backgroundColor: "#3F51B5", color: "white" }}
            >
              Reject
            </Button>
          </Form>
        </div>
        <br />
      </div>
    );
  }
}

export default LeaveRequest;
