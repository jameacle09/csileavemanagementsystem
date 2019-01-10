import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NewStaffProfile extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          };
        return (
            <div className="container" style={ divStyle }>
                <Form>
                    <FormGroup>
                        <Label for="csiStaffId">CSI Staff ID</Label>
                        <Input type="text" name="csiStaffId" id="csiStaffId" placeholder="CSI Staff ID" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="staffName">Staff Name</Label>
                        <Input type="text" name="staffName" id="staffName" placeholder="Staff Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="icNumber">NRIC/ Passport No.</Label>
                        <Input type="text" name="icNumber" id="icNumber" placeholder="NRIC/ Passport No." />
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
                        <Label for="marriageDate">Marriage Date</Label>
                        <Input type="date" name="marriageDate" id="marriageDate" placeholder="Marriage Date" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Job Title">Job Title</Label>
                        <Input type="text" name="jobTitle" id="jobTitle" placeholder="Job Title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobileNo">Mobile No.</Label>
                        <Input type="text" name="mobileNo" id="mobileNo" placeholder="Mobile No." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="businessUnit">Business Unit</Label>
                        <Input type="text" name="businessUnit" id="businessUnit" placeholder="Business Unit" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lineManager">Line Manager</Label>
                        <Input type="text" name="lineManager" id="lineManager" placeholder="Line Manager" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="joinDate">Join Date</Label>
                        <Input type="date" name="joinDate" id="joinDate" placeholder="Join Date" />
                    </FormGroup>
                    <br />
                    <Button color="primary">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default NewStaffProfile;