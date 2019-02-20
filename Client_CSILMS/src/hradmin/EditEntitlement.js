import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class EditEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        csiStaffId: "",
        staffName: ""
      },

      leaveCategory: [
        {
          id: "",
          leaveCode: "",
          leaveName: ""
        }
      ]

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.doNotSubmit = this.doNotSubmit.bind(this);
    // this.toggleSave = this.toggleSave.bind(this);
    };
  }

  componentDidMount() {
    const {
      emplid
    } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/leaveentitlement/" +
        emplid,
      method: "GET"
    })
      .then(data => {
        console.log("Fetched Data", data);
        this.setState({
          leaveCode: data.leaveCode,
          leaveDescr: data.leaveDescr,
          entitlement: data.entitlement
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
    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }

    const { userData, leaveCategory } = this.state;
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Leave Entitlement</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form onSubmit={this.doNotSubmit}>
            <FormGroup row>
              <Label for="csiStaffId" sm={2}>CSI Staff ID:</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="csiStaffId"
                  id="csiStaffId"
                  // value={csiStaffId}
                  // onChange={this.handleChange}
                  required
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="staffName" sm={2}>Staff Name</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="staffName"
                  id="staffName"
                  placeholder={userData["staffName"]}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveYear" sm={2}>Leave Year</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveYear"
                  id="leaveYear"
                  placeholder={new Date().getFullYear()}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveCategory" sm={2}>Leave Category</Label>
              <Col sm={10}>
                <Input type="select" name="leaveCategory" id="leaveCategory">
                  {leaveCategory.map(leaveCategory => {
                    return (
                      <option
                        key={leaveCategory["id"]}
                        value={leaveCategory["leaveCode"]}
                      >
                        {leaveCategory["leaveName"]}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="carriedForward" sm={2}>Carried Forward</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="carriedForward"
                  id="carriedForward"
                  placeholder="Carried Forward"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="entitlement" sm={2}>Entitlement</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="entitlement"
                  id="entitlement"
                  placeholder="Entitlement"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="availableLeave" sm={2}>Available Leave</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="availableLeave"
                  id="availableLeave"
                  placeholder="Available Leave"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="takenLeave" sm={2}>Taken Leave</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="takenLeave"
                  id="takenLeave"
                  placeholder="Taken Leave"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="balanceLeave" sm={2}>Balance Leave</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="balanceLeave"
                  id="balanceLeave"
                  placeholder="Balance Leave"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  type="button"
                  color="primary"
                  // onClick={this.toggleApprove}
                  className="largeButtonOverride"
                // disabled={this.validateFields()}
                >
                  Save
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
                    // isOpen={this.state.modalApprove}
                    // toggle={this.toggleApprove}
                    // className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Edit Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to edit this item?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        // onClick={this.handleSubmit}
                        className="largeButtonOverride"
                      >
                        Confirm
                      </Button>
                      <Button color="secondary">
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
