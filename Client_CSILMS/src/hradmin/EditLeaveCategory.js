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
  ModalFooter,
  Alert
} from "reactstrap";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class EditLeaveCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveCode: "",
      leaveDescr: "",
      entitlement: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doNotSubmit = this.doNotSubmit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);

    // Delete function is removed for now. Additional handling required is to be implement in Phase 2
    //this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { leaveCode } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/leavecategory/" + leaveCode,
      method: "GET"
    })
      .then(data => {
        //console.log("Fetched Data", data);
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

  toggleSave = () => {
    this.setState(prevState => ({
      modalSave: !prevState.modalSave
    }));
  };

/* Delete function is removed for now. Additional handling required is to be implement in Phase 2
  toggleDelete = () => {
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete
    }));
  };
*/

  handleCancel = () => {
    this.props.history.push("/leavecategory");
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateFields = () => {
    const { leaveCode, leaveDescr, entitlement } = this.state;
    const isInvalid = !leaveCode || !leaveDescr || !entitlement;
    return isInvalid;
  };

  validateDelete = () => {
    const { leaveCode } = this.state;
    const isInvalid = leaveCode === "AL" || leaveCode === "SL";
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
      // create JSON Object for Edit Leave Category
      let editLeaveCategory = {
        leaveCode: this.state.leaveCode,
        leaveDescr: this.state.leaveDescr,
        entitlement: this.state.entitlement
      };

      //console.log(JSON.stringify(editLeaveCategory));

      const { leaveCode } = this.props.computedMatch.params;

      fetchData({
        url: API_BASE_URL + "/leavecategory/" + leaveCode,
        method: "PATCH",
        body: JSON.stringify(editLeaveCategory)
      });
      this.props.history.push("/leavecategory");
    }
  }

/* Delete function is removed for now. Additional handling required is to be implement in Phase 2
  handleDelete(event) {
    event.preventDefault();

    const { leaveCode } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/leavecategory/" + leaveCode,
      method: "DELETE"
    });
    this.props.history.push("/leavecategory");
  }
*/

  validateLeaveEnt(leaveEnt) {
    // Validate if input is a number
    if (isNaN(leaveEnt)) {
      return <Alert color="danger">Invalid number</Alert>;
    }
  }

  render() {
    const { leaveCode, leaveDescr, entitlement } = this.state;
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    let leaveEntErrorMsg = this.validateLeaveEnt(entitlement);

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Leave Category</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form onSubmit={this.doNotSubmit}>
            <FormGroup row>
              <Label for="leaveCode" sm={2}>
                Leave Code:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveCode"
                  id="leaveCode"
                  value={leaveCode}
                  onChange={this.handleChange}
                  required
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2}>
                Leave Description:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="leaveDescr"
                  id="leaveDescription"
                  value={leaveDescr}
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2}>
                Leave Entitlement:
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="entitlement"
                  id="leaveEntitlement"
                  value={entitlement}
                  onChange={this.handleChange}
                  required
                />
                <span>{leaveEntErrorMsg}</span>
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
              {/* Delete function is removed for now. Additional handling required is to be implement in Phase 2
                <span> </span>
                <Button
                  type="button"
                  color="danger"
                  onClick={this.toggleDelete}
                  disabled={this.validateDelete()}
                >
                  Delete
                </Button>
              */}
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
                {/* Delete function is removed for now. Additional handling required is to be implement in Phase 2
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
                    /* <ModalBody>
                      Are you sure you want to delete this item?
                    </ModalBody> */ /*
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
                */}
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditLeaveCategory);
