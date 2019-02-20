import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import "../common/Styles.css";
import  { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData, formatDateYMD } from "../util/APIUtils";

class AddPublicHoliday extends Component {
  render() {
    if(!isHrRole(this.props.currentUser)){
      return(<Redirect to='/forbidden'  />);
    }
    
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Add Public Holiday</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
        <Form onSubmit={this.doNotSubmit}>
            <FormGroup row>
              <Label for="phDate" sm={2}>Date</Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="phDate"
                  id="phDate"
                  // value={formatDateYMD(holidayDate)}
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="phDay" sm={2}>Day</Label>
              <Col sm={10}>
                <Input 
                  type="text" 
                  name="phDay" 
                  id="phDay" 
                  // value={holidayDay}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="holiday" sm={2}>Holiday</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="holiday"
                  id="holiday"
                  // value={holidayDescr}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="state" sm={2}>State</Label>
              <Col sm={10}>
                <Input 
                  type="text" 
                  name="state" 
                  id="state" 
                  // value={holidayState}
                  onChange={this.handleChange}
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
                  // onClick={this.handleCancel}
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
                    <ModalHeader>Add Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to add this item?
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

export default withRouter(AddPublicHoliday);
