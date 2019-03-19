import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import LoadingPage from "../common/LoadingPage";

class EditPublicHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidayDate: "",
      holidayDay: "",
      holidayDescr: "",
      holidayState: "",
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doNotSubmit = this.doNotSubmit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { holidayDate } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/publicholiday/" + holidayDate,
      method: "GET"
    })
      .then(data => {
        // console.log("Fetched Data", data);
        this.setState({
          holidayDate: data.holidayDate,
          holidayDay: data.holidayDay,
          holidayDescr: data.holidayDescr,
          holidayState: data.holidayState,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleSave = () => {
    this.setState(prevState => ({
      modalSave: !prevState.modalSave
    }));
  };

  toggleDelete = () => {
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete
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
    const isInvalid =
      !holidayDate || !holidayDay || !holidayDescr || !holidayState;
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
      let editPublicHoliday = {
        holidayDate: this.state.holidayDate,
        holidayDay: this.state.holidayDay,
        holidayDescr: this.state.holidayDescr,
        holidayState: this.state.holidayState
      };

      console.log(JSON.stringify(editPublicHoliday));

      const { holidayDate } = this.props.computedMatch.params;

      fetchData({
        url: API_BASE_URL + "/publicholiday/" + holidayDate,
        method: "PATCH",
        body: JSON.stringify(editPublicHoliday)
      });
      this.props.history.push("/publicholiday");
    }
  }

  handleDelete(event) {
    event.preventDefault();

    const { holidayDate } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/publicholiday/" + holidayDate,
      method: "DELETE"
    });
    this.props.history.push("/publicholiday");
  }

  render() {
    const { holidayDate, holidayDay, holidayDescr, holidayState } = this.state;

    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Public Holiday</h3>
          </span>
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <div className="tableContainerFlex">
              <Form onSubmit={this.doNotSubmit}>
                <FormGroup row>
                  <Label for="phDate" sm={2}>
                    Date:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="holidayDate"
                      id="phDate"
                      value={formatDateYMD(holidayDate)}
                      onChange={this.handleChange}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="phDay" sm={2}>
                    Day:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="holidayDay"
                      id="phDay"
                      value={holidayDay}
                      onChange={this.handleChange}
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="holiday" sm={2}>
                    Holiday:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="holidayDescr"
                      id="holiday"
                      value={holidayDescr}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="state" sm={2}>
                    State(s):
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="holidayState"
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
                      onClick={this.toggleSave}
                      className="largeButtonOverride"
                      disabled={this.validateFields()}
                    >
                      Save
                    </Button>
                    <span> </span>
                    <Button
                      type="button"
                      color="danger"
                      onClick={this.toggleDelete}
                    >
                      Delete
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
                        isOpen={this.state.modalSave}
                        toggle={this.toggleSave}
                        className={this.props.className}
                        style={{
                          width: "360px",
                          height: "300px",
                          margin: "220px auto"
                        }}
                      >
                        <ModalHeader>Edit Confirmation</ModalHeader>
                        {/* <ModalBody>
                      Are you sure you want to edit this item?
                    </ModalBody> */}
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="primary"
                            onClick={this.handleSubmit}
                            className="largeButtonOverride"
                          >
                            Confirm
                          </Button>
                          <Button color="secondary" onClick={this.toggleSave}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                    <div>
                      <Modal
                        isOpen={this.state.modalDelete}
                        toggle={this.toggleDelete}
                        className={this.props.className}
                        style={{
                          width: "360px",
                          height: "300px",
                          margin: "220px auto"
                        }}
                      >
                        <ModalHeader>Delete Confirmation</ModalHeader>
                        {/* <ModalBody>
                      Are you sure you want to delete this item?
                    </ModalBody> */}
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="danger"
                            onClick={this.handleDelete}
                          >
                            Confirm
                          </Button>
                          <Button color="secondary" onClick={this.toggleDelete}>
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

export default withRouter(EditPublicHoliday);
