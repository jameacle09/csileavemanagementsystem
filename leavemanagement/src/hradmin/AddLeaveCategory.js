import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, ListGroup } from 'reactstrap';
import SideBar from './SideBar';
import "../common/Styles.css"

class AddLeaveCategory extends Component {
    render() {
        const headerStyle = {
            margin: "0 0 0 10px"
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
            <div className="menuContainer">
                <div className="menu">
                    <div>
                        <SideBar />
                    </div>
                    <div className="content">
                        <div style={divStyle}>
                            <span className="header"><h3 style={headerStyle}>Add Leave Category</h3></span>
                        </div><br />
                        <div>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default AddLeaveCategory;