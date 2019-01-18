import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, ListGroup } from 'reactstrap';
import SideBar from '../hradmin/SideBar';
import "../hradmin/SideBarStyle.css";

class EditStaffProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "active"
        };
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    };

    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div>
                <div className="containerFlex_">
                    <ListGroup className="ListGroupSideBar">
                        <SideBar />
                    </ListGroup>
                    <ListGroup className="ListGroupContent">
                        <div>
                            <br /><br />
                            <div className="container" style={divStyle}>
                                <Row>
                                    <Col>
                                        <h3>Edit Staff Profile</h3>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col>
                                        <Button color="primary">Reset Password</Button>
                                    </Col>
                                </Row>
                            </div>
                            <br />
                            <div className="container" style={divStyle}>
                                <Form onSubmit={this.handleFormSubmit}>
                                    <FormGroup>
                                        <Label for="csiStaffId">CSI Staff ID</Label>
                                        <Input type="text" name="csiStaffId" id="csiStaffId" placeholder="CSI Staff ID" onChange={this.csiStaffIdHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="staffName">Staff Name</Label>
                                        <Input type="text" name="staffName" id="staffName" placeholder="Staff Name" onChange={this.staffNameHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="Email" onChange={this.emailHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="icNumber">NRIC / Passport No.</Label>
                                        <Input type="text" name="icNumber" id="icNumber" placeholder="NRIC / Passport No." onChange={this.icNumberHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="gender">Gender</Label>
                                        <Input type="select" name="gender" id="gender">
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="marriageStatus">Marriage Status</Label>
                                        <Input type="select" name="marriageStatus" id="marriageStatus">
                                            <option>Single</option>
                                            <option>Married</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="jobTitle">Job Title</Label>
                                        <Input type="text" name="jobTitle" id="jobTitle" placeholder="Job Title" onChange={this.jobTitleHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="mobileNo">Mobile No.</Label>
                                        <Input type="text" name="mobileNo" id="mobileNo" placeholder="Mobile No." onChange={this.mobileNoHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="businessUnit">Business Unit</Label>
                                        <Input type="text" name="businessUnit" id="businessUnit" placeholder="Business Unit" onChange={this.businessUnitHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="lineManagerId">Line Manager</Label>
                                        <Input type="text" name="lineManagerId" id="lineManagerId" placeholder="Line Manager" onChange={this.lineManagerIdHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="joinDate">Join Date</Label>
                                        <Input type="date" name="joinDate" id="joinDate" placeholder="Join Date" onChange={this.joinDateHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="status">Status</Label>
                                        <div className="form-check">
                                            <Input type="radio" name="active" value="active" checked={this.state.selectedOption === "active"} onChange={this.handleOptionChange} /> Active
                                        </div>
                                        <div className="form-check">
                                            <Input type="radio" name="inactive" value="inactive" checked={this.state.selectedOption === "inactive"} onChange={this.handleOptionChange} /> Inactive
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="role">Role</Label>
                                        <div className="form-check">
                                            <Input type="checkbox" name="employee" value="employee" /> Employee
                                        </div>
                                        <div className="form-check">
                                            <Input type="checkbox" name="manager" value="manager" /> Manager
                                        </div>
                                        <div className="form-check">
                                            <Input type="checkbox" name="admin" value="admin" /> Admin
                                        </div>
                                    </FormGroup>
                                    <br />
                                    <Button color="primary" onClick={this.save}>Submit</Button>
                                </Form>
                                <br />
                            </div>
                        </div>
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default EditStaffProfile;