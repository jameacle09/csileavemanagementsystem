import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NewStaffProfile extends Component {
    render() {
        return (
            <div className="container">
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
                        <Label for="icNumber">IC No./ Passport No.</Label>
                        <Input type="text" name="icNumber" id="icNumber" placeholder="IC No./ Passport No." />
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