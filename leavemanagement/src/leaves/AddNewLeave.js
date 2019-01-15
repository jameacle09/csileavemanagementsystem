import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';


class AddNewLeave extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>Add Leave Entitlement</h3></Col>
                    </Row>
                </div>
                <br />

                <div className="container" style={divStyle}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <FormGroup>
                            <Label for="csiStaffId">CSI Staff ID</Label>
                            <Row>
                                <Col><Input type="text" name="csiStaffId" id="csiStaffId" placeholder="Search" /></Col>
                                <Button type="submit">Search</Button>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Label for="leaveYear">Leave Year</Label>
                            <Input type="text" name="leaveYear" id="leaveYear" placeholder="Leave Year" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="leaveCode">Leave Code</Label>
                            <Input type="select" name="leaveCode" id="leaveCode">
                                <option>AL</option>
                                <option>ML</option>
                                <option>EL</option>
                                <option>PL</option>
                                <option>MRL</option>
                                <option>MTL</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="carriedForward">Carried Forward</Label>
                            <Input type="text" name="carriedForward" id="carriedForward" placeholder="Carried Forward" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="entitlement">Entitlement</Label>
                            <Input type="text" name="entitlement" id="entitlement" placeholder="Entitlement" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="availableLeave">Available Leave</Label>
                            <Input type="text" name="availableLeave" id="availableLeave" placeholder="Available Leave" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="takenLeave">Taken Leave</Label>
                            <Input type="text" name="takenLeave" id="takenLeave" placeholder="Taken Leave" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="balanceLeave">Balance Leave</Label>
                            <Input type="text" name="balanceLeave" id="balanceLeave" placeholder="Balance Leave" />
                        </FormGroup>
                        <Button color="primary">Save</Button>
                    </Form>
                </div>
                <br />
            </div>
        )
    }
}

export default AddNewLeave;