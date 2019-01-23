import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SideBar from './SideBar';
import "../common/Styles.css"

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

        const { userData, leaveCategory } = this.state;

        return (
            <div className="menuContainer">
                <div className="menu">
                    <div>
                        <SideBar />
                    </div>
                    <div className="content">
                        <div style={divStyle}>
                            <span className="header"><h3 style={headerStyle}>Edit Leave Entitlement</h3></span>
                        </div><br />
                        <div>
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
                </div>
            </div>
        );
    }
}

export default EditEntitlement;