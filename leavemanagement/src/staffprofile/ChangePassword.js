import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ChangePassword extends Component {
    render() {
        return (
            <div className="container">
                <Form>
                    <FormGroup>
                        <Label for="currentPassword">Current Password</Label>
                        <Input type="password" name="currentpassword" id="passcurrentpassword" placeholder="Current Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Change Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Change Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                    </FormGroup>
                    <br />
                    <Button color="primary">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default ChangePassword;