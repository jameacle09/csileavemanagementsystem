import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
        const milliseconds = 86400000;
        let fieldName = event.target.name;
        switch(fieldName) {

            case "startDate" : 
                let newStartDate = new Date(event.target.value);

                // only process if date actually changed(
                if(newStartDate.toISOString() != this.state.startDate.toISOString()) {
                    if(newStartDate == this.state.endDate) {
                        let newLeaveDuration = this.state.isHalfDay ? 0.5 : 1;
                        this.setState({
                            startDate: newStartDate,
                            leaveDuration: newLeaveDuration
                        })
                    } else if (newStartDate < this.state.endDate) {
                        let newLeaveDuration =  Math.ceil((this.state.endDate - newStartDate) / milliseconds) +1;
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

                // only process if date actually changed
                if(newEndDate.toISOString() != this.state.endDate.toISOString()) {

                    // if new end date and start date are same date
                    if(newEndDate == this.state.startDate) {
                        let newLeaveDuration = this.state.isHalfDay ? 0.5 : 1;
                        this.setState({
                            endDate: newEndDate,
                            leaveDuration: newLeaveDuration
                        })
                    } else if (newEndDate > this.state.startDate) {
                        let newLeaveDuration = Math.ceil((newEndDate - this.state.startDate) / milliseconds) +1;
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
                let newIsHalfDay = !this.state.isHalfDay;
                let startDateString = this.state.startDate.toISOString().substr(0,10);
                let endDateString = this.state.startDate.toISOString().substr(0,10);

                if(startDateString == endDateString) {
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

        let checkBoxProp = {
            isChecked: isHalfDay ? "checked" : "",
            isDisabled: startDate.toISOString() == endDate.toISOString() ? "" : "disabled"
        };

        return (
            <div>
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
                            <Label for="endDate">End Date </Label>
                            <Input type="date" name="endDate" id="endDate" 
                                value={endDate.toISOString().substr(0,10)} onChange={this.onDateChange}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="isHalfDay" id="isHalfDay" 
                                    disabled={checkBoxProp.isDisabled}
                                    checked={checkBoxProp.isChecked}
                                    onChange={this.onDateChange}
                                    />{' '}
                                Check the box if you are taking half day leave.
                            </Label>
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Label>Leave Duration:   
                                <strong>{leaveDuration <= 1 ? leaveDuration + ' Day' : leaveDuration + ' Days'}</strong> 
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