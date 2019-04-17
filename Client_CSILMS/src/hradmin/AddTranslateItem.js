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
      uniqueEntry: false,
      translateItemsData: [],
      fieldNameLookUp: [],
      modalSubmit: false
    };
  }

  loadTranslateItems = () => {
    fetchData({
      url: API_BASE_URL + "/translateitems",
      method: "GET"
    })
      .then(data => {
        this.setState({ translateItemsData: data }, () =>
          this.getUniqueFieldName()
        );
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  getUniqueFieldName = () => {
    let arrTranslateItemLookup = this.state.translateItemsData,
      arrUniqueFieldNames = [],
      currFieldName = "A1B2C3D4";
    arrTranslateItemLookup.forEach(transItem => {
      if (transItem.id.fieldname !== currFieldName) {
        currFieldName = transItem.id.fieldname;
        arrUniqueFieldNames.push({ fieldname: currFieldName });
      }
    });
    this.setState({ fieldNameLookUp: arrUniqueFieldNames });
  };

  componentDidMount() {
    this.loadTranslateItems();
  }

  validateFieldNameAndValue = event => {
    const fieldName = event.target.name;
    const { fieldname, fieldvalue, translateItemsData } = this.state;
    let arrTranslateItemsData = translateItemsData;
    if (
      (fieldName === "fieldname" || fieldName === "fieldvalue") &&
      fieldname &&
      fieldvalue
    ) {
      if (
        arrTranslateItemsData.filter(
          transItem =>
            transItem.id.fieldname === fieldname &&
            transItem.id.fieldvalue === fieldvalue
        ).length > 0
      ) {
        confirmAlert({
          message: "Combination of Field Name and Field Value already exist.",
          buttons: [
            {
              label: "OK",
              onClick: () => this.setState({ uniqueEntry: false })
            }
          ]
        });
      } else {
        this.setState({ uniqueEntry: true });
      }
    }
  };

  toggleApprove = () => {
    this.setState(prevState => ({
      modalApprove: !prevState.modalApprove
    }));
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
      xlatshortname,
      uniqueEntry
    } = this.state;
    const isInvalid =
      !fieldname ||
      !fieldvalue ||
      !effStatus ||
      !xlatlongname ||
      !xlatshortname ||
      !uniqueEntry;
    return isInvalid;
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
    this.toggleConfirmSubmit();

    fetchData({
      url: API_BASE_URL + "/translateitem",
      method: "POST",
      body: JSON.stringify(postRequest)
    })
      .then(response => {
        confirmAlert({
          message: "New Translate Item has been successfully added!",
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

  toggleConfirmSubmit = () => {
    const { fieldname, fieldvalue } = this.state;

    // Check if Translate Item already exists
    fetchData({
      url: API_BASE_URL + "/translateitem/" + fieldname + "/" + fieldvalue,
      method: "GET"
    })
      .then(response => {
        if (response === null) {
          // If Translate Item not found, proceed to create
          this.setState(prevState => ({
            modalSubmit: !prevState.modalSubmit
          }));
        } else {
          confirmAlert({
            message:
              "Translate Item already defined: " +
              fieldname +
              ", " +
              fieldvalue,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      })
      .catch(error => {
        if (error.hasOwnProperty("status")) {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
        // If Translate Item not found, proceed to create
        else
          this.setState(prevState => ({
            modalSubmit: !prevState.modalSubmit
          }));
      });
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
      xlatshortname,
      fieldNameLookUp
    } = this.state;

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Add Translate Item</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
            <FormGroup row>
              <Label for="fieldname" sm={2}>
                Field Name:
              </Label>
              <Col sm={10}>
                {/* <Input
                  type="text"
                  name="fieldname"
                  id="fieldname"
                  value={fieldname}
                  onChange={this.handleChange}
                  required
                /> */}
                <Input
                  type="select"
                  name="fieldname"
                  id="fieldname"
                  onChange={this.handleChange}
                  onBlur={this.validateFieldNameAndValue}
                  value={fieldname}
                >
                  <option key="" value="">
                    --Select Field Name--
                  </option>
                  {fieldNameLookUp.map(field => {
                    return (
                      <option key={field.fieldname} value={field.fieldname}>
                        {field.fieldname}
                      </option>
                    );
                  })}
                </Input>
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
                  onChange={this.handleChange}
                  onBlur={this.validateFieldNameAndValue}
                  required
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
                    {/* <ModalBody>
                      Are you sure you want to Save this New Translate Item?
                    </ModalBody> */}
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
