import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import MyLeaveSummary from './MyLeaveSummary';

class ApplyLeave extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userData: {
                'csiStaffId': '',
                'staffName': ''
            },
            leaveCategory:  [{
                'id': '',
                'leaveCode': '',
                'leaveName': ''
            }],
            startDate: new Date(),
            endDate: new Date(),
            isHalfDay: false,
            leaveDuration: 1
        };
    }

    componentDidMount() {

        // fetch CSI Staff ID and Name from API    
        fetch('http://localhost/api/staffprofile/1')
        .then(response => response.json())
        .then(data => this.setState({userData: data}))
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let userData = {
                'csiStaffId': '',
                'staffName': ''
            }
            this.setState({userData: userData})
        })             
        
        // fetch leave category from API    
        fetch('http://localhost/api/leavecategories')
        .then(response => response.json())
        .then(data => this.setState({leaveCategory: data}))
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let leaveCategoryData = [{
                'id': '',
                'leaveCode': '',
                'leaveName': ''
            }]
            this.setState({leaveCategory: leaveCategoryData})
        })             
    }

        // this method process changes on all 3 date related fields
        onDateChange = (event) => {
            const fieldName = event.target.name;
            const startDateStr = this.state.startDate.toISOString().substr(0,10);
            const endDateStr = this.state.endDate.toISOString().substr(0,10);
            const milliseconds = 86400000;

            switch(fieldName) {
    
                case "startDate" : 
                    let newStartDate = new Date(event.target.value);
                    let newStartDateStr = newStartDate.toISOString().substr(0,10);

                    // only process if date actually changed
                    if(newStartDateStr !== startDateStr) {

                        // if new end date and start date are same date
                        if(newStartDateStr === endDateStr) {
                            this.setState({
                                startDate: newStartDate,
                                leaveDuration: (this.state.isHalfDay ? 0.5 : 1)
                            })
                        } else if (newStartDateStr < endDateStr) {
                            let newLeaveDuration = Math.ceil((this.state.endDate - newStartDate) / milliseconds) +1;
                            this.setState({
                                startDate: newStartDate,
                                leaveDuration: newLeaveDuration,
                                isHalfDay: false
                            })
                        } else {
                            // If Start Date is greater than End Date, reset End Date to Start Date
                            this.setState({
                                startDate: newStartDate,
                                endDate: newStartDate,
                                leaveDuration: 1,
                                isHalfDay: false
                            })
                        }
                    }
                    break;
    
                case "endDate" :
                    let newEndDate = new Date(event.target.value);
                    let newEndDateStr = newEndDate.toISOString().substr(0,10);
    
                    // only process if date actually changed
                    if(newEndDateStr !== endDateStr) {
    
                        // if new end date and start date are same date
                        if(newEndDateStr === startDateStr) {
                            this.setState({
                                endDate: newEndDate,
                                leaveDuration: (this.state.isHalfDay ? 0.5 : 1)
                            })
                        } else if (newEndDateStr > startDateStr) {
                            let newLeaveDuration = Math.ceil((newEndDate- this.state.startDate) / milliseconds) +1;
                            this.setState({
                                endDate: newEndDate,
                                leaveDuration: newLeaveDuration,
                                isHalfDay: false
                            })
                        } else {
                            // If End Date is smaller than Start Date, reset Start Date to End Date
                            this.setState({
                                startDate: newEndDate,
                                endDate: newEndDate,
                                leaveDuration: 1,
                                isHalfDay: false
                            })
                        }
                    }
                    break;
    
                case "isHalfDay" : 
                    if(startDateStr === endDateStr) {
                        let newIsHalfDay = ! this.state.isHalfDay;
                        this.setState({
                            isHalfDay: newIsHalfDay,
                            leaveDuration: (newIsHalfDay ? 0.5 : 1)
                        })
                    }
                    break;
                default :
                    break;
            }
        }
    
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        const {userData, leaveCategory, startDate, endDate, isHalfDay, leaveDuration} = this.state;

        return (
            <div>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>Apply Leave</h3></Col>
                    </Row>
                </div>
                <br />
                <MyLeaveSummary />
                <br />
                <div className="container" style={divStyle}>
                    <Form>
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
                            <Label for="startDate">Start Date</Label>
                            <Input type="date" name="startDate" id="startDate" 
                                value={startDate.toISOString().substr(0,10)} onChange={this.onDateChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="endDate">End Date</Label>
                            <Input type="date" name="endDate" id="endDate" 
                                value={endDate.toISOString().substr(0,10)} onChange={this.onDateChange}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" name="isHalfDay" id="isHalfDay" 
                                    disabled={startDate.toISOString().substr(0,10) === endDate.toISOString().substr(0,10) ? false : true}
                                    onChange={this.onDateChange} 
                                    checked={isHalfDay}/>{' '}
                                Check the box if you are taking half day leave.
                        </Label>
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Label inline for="leaveDuration">Leave Duration:   
                                <strong>{leaveDuration <= 1 ? leaveDuration + " Day" : leaveDuration + " Days"}</strong> 
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
                        <span>   </span>
                        <Button color="danger">Discard</Button>
                    </Form>
                </div>
                <br />
            </div>
        );
    }
}

export default ApplyLeave;