import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import SideBar from '../hradmin/SideBar';
import "../common/Styles.css"

class ResetPassword extends Component {
    render() {
        const headerStyle = {
            margin: "0 0 0 0"
        };

        const divStyle = {
            background: "#B8E2FC",
            width: "auto",
            margin: "0 0 0 0",
            padding: "25px 0 25px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <Col >
            <Row>
                <Col md="1.5">
                    <SideBar />
                </Col>
                <Col md="10" xs="8" className="content">
                    <br />
                    <div style={divStyle}>
                        <span className="header"><h3 style={headerStyle}>Reset Password</h3></span>
                        </div><br />
                        <div className="ContainerFlex">
                            <Form>
                                <FormGroup>
                                    <Label for="newPassword">New Password</Label>
                                    <Input type="text" name="newPassword" id="newPassword" placeholder="New Password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPassword">Confirm Password</Label>
                                    <Input type="text" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                                </FormGroup>
                                <Button color="primary">Save</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default ResetPassword;