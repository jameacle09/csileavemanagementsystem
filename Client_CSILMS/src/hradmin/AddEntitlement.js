import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class AddEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplId: "",
      name: "",
      year: "",
      leaveDescr: "",
      carryForward: 0,
      entitlement: 0,
      availableLeave: 0,
      takenLeave: 0,
      balanceLeave: 0
    };
    this.loadLeaveEntitlement = this.loadLeaveEntitlement.bind(this);
  }

  componentDidMount() {
    // this.loadLeaveEntitlement();
  }

  loadLeaveEntitlement() {
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
          emplId: data.employeeDetails.emplid,
          name: data.employeeDetails.name,
          year: data.id.year,
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
  }

  handleCancel = () => {
    this.props.history.push("/leaveentitlement");
  };

  render() {
    // if (!isHrRole(this.props.currentUser)) {
    //   return <Redirect to="/forbidden" />;
    // }

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
          <Form onSubmit={this.handleFormSubmit}>
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
                  type="text"
                  name="year"
                  id="year"
                  placeholder="Leave Year"
                  value={year}
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
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="carryForward" sm={2}>
                Carried Forward:
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="carryForward"
                  id="carryForward"
                  placeholder="Carried Forward"
                  value={carryForward}
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
                  type="text"
                  name="entitlement"
                  id="entitlement"
                  placeholder="Entitlement"
                  value={entitlement}
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
                  type="text"
                  name="availableLeave"
                  id="availableLeave"
                  placeholder="Available Leave"
                  value={availableLeave}
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
                  type="text"
                  name="takenLeave"
                  id="takenLeave"
                  placeholder="Taken Leave"
                  value={takenLeave}
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
                  type="text"
                  name="balanceLeave"
                  id="balanceLeave"
                  placeholder="Balance Leave"
                  value={balanceLeave}
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
                >
                  Save
                </Button>
                <span> </span>
                <Button color="secondary" onClick={this.handleCancel}>
                  Cancel
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddEntitlement);
