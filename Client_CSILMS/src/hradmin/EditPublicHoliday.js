import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class EditPublicHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidayDate: "",
      holidayDay: "",
      holidayDescr: "",
      holidayState: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doNotSubmit = this.doNotSubmit.bind(this);
    this.toggleApprove = this.toggleApprove.bind(this);
  }

  componentDidMount() {
    const {
      holidayDate
    } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/publicholiday/" +
        holidayDate,
      method: "GET"
    })
      .then(data => {
        console.log("Fetched Data", data);
        this.setState({
          holidayDate: data.holidayDate,
          holidayDay: data.holidayDay,
          holidayDescr: data.holidayDescr,
          holidayState: data.holidayState
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleApprove = () => {
    this.setState(prevState => ({
      modalApprove: !prevState.modalApprove
    }));
  };

  handleCancel = () => {
    this.props.history.push("/publicholiday");
  }; 

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateFields = () => {
    const { holidayDate, holidayDay, holidayDescr, holidayState } = this.state;
    const isInvalid = !holidayDate || !holidayDay || !holidayDescr || !holidayState;
    return isInvalid;
  };

  // Do not submit form, unless user clicked on submit button
  doNotSubmit(event) {
    event.preventDefault();
  }  

  handleSubmit(event) {
    event.preventDefault();
    let validForm = true;

    if (validForm) {
      // create JSON Object for Edit Public Holiday
      let editPublicHoliday= {
        holidayDate: this.state.holidayDate,
        holidayDay: this.state.holidayDay,
        holidayDescr: this.state.holidayDescr,
        holidayState: this.state.holidayState
      };

      console.log(JSON.stringify(editPublicHoliday));

      const {
        holidayDate
      } = this.props.computedMatch.params;

      fetchData({
        url: API_BASE_URL + "/publicholiday/" +
          holidayDate,
        method: "PATCH",
        body: JSON.stringify(editPublicHoliday)
      })
      this.props.history.push("/publicholiday");

    }

  }

  render() {
    const {
      holidayDate,
      holidayDay,
      holidayDescr,
      holidayState
    } = this.state;

    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Public Holiday</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form onSubmit={this.doNotSubmit}>
            <FormGroup row>
              <Label for="phDate" sm={2}>Date:</Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="phDate"
                  id="phDate"
                  value={formatDateYMD(holidayDate)}
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="phDay" sm={2}>Day:</Label>
              <Col sm={10}>
                <Input 
                  type="text" 
                  name="phDay" 
                  id="phDay" 
                  value={holidayDay}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="holiday" sm={2}>Holiday:</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="holiday"
                  id="holiday"
                  value={holidayDescr}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="state" sm={2}>State:</Label>
              <Col sm={10}>
                <Input 
                  type="text" 
                  name="state" 
                  id="state" 
                  value={holidayState}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  type="button"
                  color="primary"
                  onClick={this.toggleApprove}
                  className="largeButtonOverride"
                  disabled={this.validateFields()}
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
                    isOpen={this.state.modalApprove}
                    toggle={this.toggleApprove}
                    className={this.props.className}
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
                        onClick={this.handleSubmit}
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

              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPublicHoliday);