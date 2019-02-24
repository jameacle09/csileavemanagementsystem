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
  ModalBody,
  ModalFooter,
  Alert
} from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";

class AddTranslateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldname: "",
      fieldvalue: "",
      effStatus: "A",
      xlatlongname: "",
      xlatshortname: "",
      modalSubmit: false
    };
  }

  componentDidMount() {
    this.loadTranslateItem();
  }

  loadTranslateItem = () => {
    const { fieldname, fieldvalue } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/translateitem" + "/" + fieldname + "/" + fieldvalue,
      method: "GET"
    })
      .then(data => {
        // console.log("Fetched Data", data);
        this.setState({
          fieldname: data.id.fieldname,
          fieldvalue: data.id.fieldvalue,
          effStatus: data.effStatus,
          xlatlongname: data.xlatlongname,
          xlatshortname: data.xlatshortname
        });
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

  submitTranslateItem = event => {
    event.preventDefault();
    const {
      fieldname,
      fieldvalue,
      effStatus,
      xlatlongname,
      xlatshortname
    } = this.state;

    const jsonRowValues = {
      id: {
        fieldname: fieldname,
        fieldvalue: fieldvalue
      },
      effStatus: effStatus,
      xlatlongname: xlatlongname,
      xlatshortname: xlatshortname
    };

    const postRequest = Object.assign({}, jsonRowValues);

    fetchData({
      url: API_BASE_URL + "/translateitem" + "/" + fieldname + "/" + fieldvalue,
      method: "PATCH",
      body: JSON.stringify(postRequest)
    })
      .then(response => {
        this.toggleConfirmSubmit();
        confirmAlert({
          message: "Translate Item has been successfully updated!",
          buttons: [
            {
              label: "OK",
              onClick: () => this.props.history.push("/translateitems")
            }
          ]
        });
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCancel = () => {
    this.props.history.push("/translateitems");
  };

  validateFields = () => {
    const {
      fieldname,
      fieldvalue,
      effStatus,
      xlatlongname,
      xlatshortname
    } = this.state;

    const isInvalid =
      !fieldname ||
      !fieldvalue ||
      !effStatus ||
      !xlatlongname ||
      !xlatshortname;
    return isInvalid;
  };

  toggleConfirmSubmit = () => {
    this.setState(prevState => ({
      modalSubmit: !prevState.modalSubmit
    }));
  };

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const {
      fieldname,
      fieldvalue,
      effStatus,
      xlatlongname,
      xlatshortname
    } = this.state;

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Translate Item</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
            <FormGroup row>
              <Label for="fieldname" sm={2}>
                Field Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="fieldname"
                  id="fieldname"
                  value={fieldname}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="fieldvalue" sm={2}>
                Field Value:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="fieldvalue"
                  id="fieldvalue"
                  value={fieldvalue}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="xlatlongname" sm={2}>
                Field Long Description:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="xlatlongname"
                  id="xlatlongname"
                  value={xlatlongname}
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="xlatshortname" sm={2}>
                Field Short Description:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="xlatshortname"
                  id="xlatshortname"
                  value={xlatshortname}
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="effStatus" sm={2}>
                Effective Status:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="effStatus"
                  id="effStatus"
                  onChange={this.handleChange}
                  value={effStatus}
                >
                  <option key="A" value="A">
                    Active
                  </option>
                  <option key="A" value="I">
                    Inactive
                  </option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  type="button"
                  color="primary"
                  onClick={this.toggleConfirmSubmit}
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
                    isOpen={this.state.modalSubmit}
                    toggle={this.toggleConfirmSubmit}
                    className={this.props.className}
                    style={{
                      width: "360px",
                      height: "300px",
                      margin: "220px auto"
                    }}
                  >
                    <ModalHeader>Submit Confirmation</ModalHeader>
                    <ModalBody>
                      Are you sure you want to Save this Updated Translate Item?
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={event => this.submitTranslateItem(event)}
                        className="largeButtonOverride"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="secondary"
                        onClick={this.toggleConfirmSubmit}
                      >
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

export default withRouter(AddTranslateItem);
