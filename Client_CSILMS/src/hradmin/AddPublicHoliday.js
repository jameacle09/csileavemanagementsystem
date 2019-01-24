import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import SideBar from './SideBar';
import "../common/Styles.css"

class AddPublicHoliday extends Component {
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
            <Col >
                <Row>
                    <Col md="1.5">
                        <SideBar />
                    </Col>
                    <Col md="10" xs="8" className="content">
                        <br />
                        <div style={divStyle}>
                            <span className="header"><h3 style={headerStyle}>Add Public Holiday</h3></span>
                        </div><br />
                        <div className="ContainerFlex">
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
            </Col>
        );
    }
}

export default AddPublicHoliday;