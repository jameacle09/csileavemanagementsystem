import React, { Component } from 'react';
import StaffProfile from './StaffProfile';
import { Button, Form, FormGroup, Label, Input, Row, Col, ListGroup } from 'reactstrap';
import SideBar from '../hradmin/SideBar';
import "../hradmin/SideBarStyle.css";

class NewStaffProfile extends Component {
    constructor(props) {
        super(props);
        this.id = "";
        this.csiStaffId = "";
        this.staffName = "";
        this.email = "";
        this.icNumber = "";
        this.jobTitle = "";
        this.mobileNo = "";
        this.businessUnit = "";
        this.lineManagerId = "";
        this.joinDate = "";
        this.csiStaffIdHandler = this.csiStaffIdHandler.bind(this);
        this.staffNameHandler = this.staffNameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.icNumberHandler = this.icNumberHandler.bind(this);
        this.jobTitleHandler = this.jobTitleHandler.bind(this);
        this.mobileNoHandler = this.mobileNoHandler.bind(this);
        this.businessUnitHandler = this.businessUnitHandler.bind(this);
        this.lineManagerIdHandler = this.lineManagerIdHandler.bind(this);
        this.joinDateHandler = this.joinDateHandler.bind(this);
        this.save = this.save.bind(this);
    }

    csiStaffIdHandler(event) {
        this.csiStaffId = event.target.value;
    }

    staffNameHandler(event) {
        this.staffName = event.target.value;
    }

    emailHandler(event) {
        this.email = event.target.value;
    }

    icNumberHandler(event) {
        this.icNumber = event.target.value;
    }

    jobTitleHandler(event) {
        this.jobTitle = event.target.value;
    }

    mobileNoHandler(event) {
        this.mobileNo = event.target.value;
    }

    businessUnitHandler(event) {
        this.businessUnit = event.target.value;
    }

    lineManagerIdHandler(event) {
        this.lineManagerId = event.target.value;
    }

    joinDateHandler(event) {
        this.joinDate = event.target.value;
    }

    save() {
        let staffProfile = new StaffProfile(0, this.csiStaffId, this.staffName, this.email, this.icNumber, this.jobTitle, this.mobileNo, this.businessUnit, this.lineManagerId, this.joinDate);
        console.log(JSON.stringify(staffProfile));
        fetch('http://localhost/api/staffprofile', {
            method: 'post',
            body: JSON.stringify(staffProfile),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.props.showStaffProfiles();
        })
    }

    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div className="containerFlex">
            <ListGroup className="Flex1">
                <SideBar />
            </ListGroup>
            <ListGroup className="Flex2">
                <div>
                    <br /><br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>Add Staff Profile</h3></Col>
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
                        <br />
                        <Button color="primary" onClick={this.save}>Submit</Button>
                    </Form>
                    <br />
                </div>
                </div>
                </ListGroup>
            </div>
        );

    }

}


export default NewStaffProfile;;
