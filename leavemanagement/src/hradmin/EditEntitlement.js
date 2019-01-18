import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import SideBar from './SideBar';
import "./SideBarStyle.css";

class EditEntitlement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                'csiStaffId': '',
                'staffName': ''
            },

            leaveCategory: [{
                'id': '',
                'leaveCode': '',
                'leaveName': ''
            }]
        };
    }

    componentDidMount() {
        // fetch CSI Staff ID and Name from API    
        fetch('http://localhost/api/staffprofile/1')
            .then(response => response.json())
            .then(data => this.setState({ userData: data }))
            .catch(err => {
                // if unable to fetch data, assign default (spaces) to values
                let userData = {
                    'csiStaffId': '',
                    'staffName': ''
                }
                this.setState({ userData: userData })
            })

        // fetch leave category from API    
        fetch('http://localhost/api/leavecategories')
            .then(response => response.json())
            .then(data => this.setState({ leaveCategory: data }))
            .catch(err => {
                // if unable to fetch data, assign default (spaces) to values
                let leaveCategoryData = [{
                    'id': '',
                    'leaveCode': '',
                    'leaveName': ''
                }]
                this.setState({ leaveCategory: leaveCategoryData })
            })
    }

    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        const { userData, leaveCategory } = this.state;

        return (
            <div>
                <div className="containerFlex_">
                    <ListGroup className="ListGroupSideBar">
                            <SideBar />
                    </ListGroup>
                    <ListGroup className="ListGroupContent">
                            <div>
                                <br /><br />
                                <div className="container" style={divStyle}>
                                    <Row>
                                        <Col><h3>Edit Leave Entitlement</h3></Col>
                                    </Row>
                                </div>
                                <br />

                                <div className="container" style={divStyle}>
                                    <Form onSubmit={this.handleFormSubmit}>
                                        <FormGroup>
                                            <Label for="csiStaffId">CSI Staff ID</Label>
                                            <Input type="text" name="csiStaffId" id="csiStaffId"
                                                placeholder={userData['csiStaffId']} disabled={true} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="staffName">Staff Name</Label>
                                            <Input type="text" name="staffName" id="staffName"
                                                placeholder={userData['staffName']} disabled={true} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="leaveYear">Leave Year</Label>
                                            <Input type="text" name="leaveYear" id="leaveYear"
                                                placeholder={new Date().getFullYear()} disabled={true} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="leaveCategory">Leave Category</Label>
                                            <Input type="select" name="leaveCategory" id="leaveCategory">
                                                {
                                                    leaveCategory.map((leaveCategory) => {
                                                        return (<option key={leaveCategory['id']} value={leaveCategory['leaveCode']}>{leaveCategory['leaveName']}</option>)
                                                    })
                                                }
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
                            </div>
                    </ListGroup>
                </div>
            </div>
        )
    }
}

export default EditEntitlement;