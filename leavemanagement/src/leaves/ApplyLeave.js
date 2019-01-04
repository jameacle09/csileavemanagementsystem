import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ApplyLeave extends Component {
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
                        <Label for="leaveCategory">Leave Category</Label>
                        <Input type="select" name="leaveCategory" id="leaveCategory">
                            <option>Annual Leave</option>
                            <option>Medical Leave</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input type="date" name="startDate" id="startDate" placeholder="Start Date" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="endDate">End Date</Label>
                        <Input type="date" name="endDate" id="endDate" placeholder="End Date" />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            Check the box if you are taking half day leave.
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="leaveReason">Leave Reason</Label>
                        <Input type="textarea" name="leaveReason" id="leaveReason" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attachment">File</Label>
                        <Input type="file" name="attachment" id="attachment" />
                        <FormText color="muted">
                            Please attach your document.
                        </FormText>
                    </FormGroup>
                    <br />
                    <Button color="primary">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default ApplyLeave;