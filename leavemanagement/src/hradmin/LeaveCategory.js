import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LeaveCategory extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div className="container" style={divStyle}>
                <Form>
                    <FormGroup>
                        <Label for="leaveCode">Leave Code</Label>
                        <Input type="text" name="leaveCode" id="leaveCode" placeholder="Leave Code" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="leaveDescription">Leave Description</Label>
                        <Input type="text" name="leaveDescription" id="leaveDescription" placeholder="Leave Description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="leaveEntitlement">Leave Entitlement</Label>
                        <Input type="text" name="leaveEntitlement" id="leaveEntitlement" placeholder="Leave Entitlement" />
                    </FormGroup>
                    <Button color="primary">Save</Button>
                </Form>
            </div>
        );
    }
}

export default LeaveCategory;