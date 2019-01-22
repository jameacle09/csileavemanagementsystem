import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Progress } from 'reactstrap';
//import MyLeaveSummary from './MyLeaveSummary';

class ApplyLeave extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: {
                'id': '',
                'csiStaffId': '',
                'staffName': '',
                'lineManager': null
            },
            staffLeave: {
                'availableLeave': ''
            },
            leaveCategoryList: [{
                'id': '',
                'leaveCode': '',
                'leaveName': ''
            }],
            approverList: [{
                'id': '',
                'staffName': ''
            }],
            startDate: new Date(),
            endDate: new Date(),
            isHalfDay: false,
            leaveDuration: 1,
            leaveCategory: '',
            leaveReason: '',
            attachedFile: null,
            approverId: ''
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        // fetch CSI Staff ID and Name from API    
        fetch('http://localhost/api/staffprofile/1')
        .then(response => response.json())
        .then(data => {
            this.setState({userData: data})
            if(data['lineManager'] != null)
                this.setState({approverId: data['lineManager']['id']})
        })
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let userData = {
                'id': '',
                'csiStaffId': '',
                'staffName': '',
                'lineManager': null
            }
            this.setState({userData: userData})
        })             

        // fetch leave category from API    
        fetch('http://localhost/api/leavecategories')
        .then(response => response.json())
        .then(data => this.setState({leaveCategoryList: data, leaveCategory: data[0]['id']}))
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let leaveCategoryData = [{
                'id': '',
                'leaveCode': '',
                'leaveName': ''
            }]
            this.setState({leaveCategoryList: leaveCategoryData})
        })    

        // fetch leave balance from API 
        fetch('http://localhost/api/staffleave/1')
            .then(response => response.json())
            .then(data => this.setState({ staffLeave: data }))
            .catch(err => {
                // if unable to fetch data, assign default (spaces) to values
                let staffLeaveData = {
                    'availableLeave': ''
                }
                this.setState({ staffLeave: staffLeaveData })
        })
                        
        // fetch approvers from API    
        fetch('http://localhost/api/managers')
        .then(response => response.json())
        .then(data => this.setState({approverList: data}))
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let approverListData = [{
                'id': '',
                'staffName': ''
            }]
            this.setState({approverList: approverListData})
        })             
    }

    // this method process changes on all 3 date related fields
    handleDateChange(event) {
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
    
    // this method process changes on non-date related fields 
    handleDetailsChange(event) {
        switch(event.target.name) {
            case 'leaveCategory' :
                this.setState({leaveCategory: event.target.value});
                break;
            case 'leaveReason' :
                this.setState({leaveReason: event.target.value});
                break;
            case 'attachment' :
                this.setState({attachedFile: event.target.files[0]})
                break;
            case 'approver' :
                this.setState({approverId: event.target.value})
                break;
            default :
                break;
        }
    }

    // create JSON object with form data, and call API
    handleSubmit (event) {
        event.preventDefault();
        
        let newLeaveRequest = {
            'staffId': { 'id': this.state.userData['id']},
            'leaveCategory': { 'id': this.state.leaveCategory},
            'startDate': this.state.startDate,
            'endDate': this.state.endDate,
            'leaveDuration': this.state.leaveDuration,
            'leaveReason': this.state.leaveReason,
            'leaveStatusId': {'id': 3}      // All new leave has status of 3, Pending Approval
        }

        console.log(JSON.stringify(newLeaveRequest));
        
        fetch('http://localhost/api/leavedetail', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLeaveRequest),
        })
        .then(res=>res.json())
        .then(res => console.log(res))
//        .then(this.props.history.push('/MyLeaveDetails'))  
        .catch (err => {
            console.log("!!! Error : " . err)
        })     
        
    }

    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        const {userData, leaveCategoryList, approverList, startDate, endDate, isHalfDay, leaveDuration, 
            leaveCategory, leaveReason, attachedFile , approverId, staffLeave} = this.state;

        return (
            <div>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>Apply Leave</h3></Col>
                    </Row>
                </div>
                <br />               
                <div className="container" style={divStyle}>
                    <Row>
                        <Col>
                            <h5>Annual Leave Balance: {staffLeave['availableLeave']} Days</h5>
                        </Col>
                    </Row>
                </div>
                <br />
                <div className="container" style={divStyle}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="csiStaffId">CSI Staff ID</Label>
                            <Input type="text" name="csiStaffId" id="csiStaffId" 
                                value={userData['csiStaffId']} disabled={true} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="staffName">Staff Name</Label>
                            <Input type="text" name="staffName" id="staffName" 
                                value={userData['staffName']} disabled={true} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="leaveCategory">Leave Category</Label>
                            <Input type="select" name="leaveCategory" id="leaveCategory"
                                onChange={this.handleDetailsChange} value={leaveCategory}>
                                {
                                    leaveCategoryList.map((leaveCategory) => {
                                        return (<option key={leaveCategory['leaveCode']} value={leaveCategory['id']}>{leaveCategory['leaveName']}</option>)
                                    })
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">Start Date</Label>
                            <Input type="date" name="startDate" id="startDate" 
                                value={startDate.toISOString().substr(0,10)} onChange={this.handleDateChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="endDate">End Date</Label>
                            <Input type="date" name="endDate" id="endDate" 
                                value={endDate.toISOString().substr(0,10)} onChange={this.handleDateChange}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" name="isHalfDay" id="isHalfDay" 
                                    disabled={startDate.toISOString().substr(0,10) === endDate.toISOString().substr(0,10) ? false : true}
                                    onChange={this.handleDateChange} 
                                    checked={isHalfDay}/>{' '}
                                Check the box if you are taking half day leave.
                        </Label>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label for="leaveDuration">Leave Duration: {'  '}  
                                <strong>{leaveDuration <= 1 ? leaveDuration + " Day" : leaveDuration + " Days"}</strong> 
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="leaveReason">Leave Reason</Label>
                            <Input type="textarea" name="leaveReason" id="leaveReason" 
                                onChange={this.handleDetailsChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="attachment">File</Label>
                            <Input type="file" name="attachment" id="attachment"
                                onChange={this.handleDetailsChange} />
                            <FormText color="muted">
                                Please attach your document.
                            </FormText>
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="approverId">Approver</Label>
                            <Input type="select" name="approverId" id="approverId"
                                onChange={this.handleDetailsChange} value={approverId}>
                                {
                                    approverList.map((approver) => {
                                        return (<option key={approver['id']} value={approver['id']}>{approver['staffName']}</option>)
                                    })
                                }
                            </Input>
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