import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import SideBar from './SideBar';

class AddPublicHoliday extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div>
                <Row>
                    <Col><SideBar /></Col>
                    <Col>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>Add Public Holiday</h3></Col>
                    </Row>
                </div>
                <br />
                <div className="container" style={divStyle}>
                    <Form>
                        <FormGroup>
                            <Label for="phDate">Date</Label>
                            <Input type="date" name="phDate" id="phDate" placeholder="Public Holiday Date" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phDay">Day</Label>
                            <Input type="text" name="phDay" id="phDay" placeholder="Day" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="holiday">Holiday</Label>
                            <Input type="text" name="holiday" id="holiday" placeholder="Description" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="state">State</Label>
                            <Input type="text" name="state" id="state" placeholder="State" />
                        </FormGroup>
                        <Button color="primary">Save</Button>
                    </Form>
                </div>
                </Col>
                </Row>
            </div>
        );
    }
}

export default AddPublicHoliday;