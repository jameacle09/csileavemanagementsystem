import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { fetchData, formatDateYMD } from '../util/APIUtils';
import { confirmAlert } from "react-confirm-alert";
import { API_BASE_URL } from '../constants'; 
import "../common/Styles.css";

class NewStaffProfile extends Component {
  constructor(props) {
    super(props);

    let initialDate = new Date();
    initialDate.setUTCHours(0,0,0,0);
    this.loadTranslateItem = this.loadTranslateItem.bind(this);
    this.isHrRole = this.isHrRole.bind(this);
    this.isManagerRole = this.isManagerRole.bind(this);
    this.getManagerDetails = this.getManagerDetails.bind(this);
    this.verifyEmplId = this.verifyEmplId.bind(this);
    this.verifyEmailExists = this.verifyEmailExists.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadManagerList = this.loadManagerList.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.state = {
      emplIdExists:false,
      roles: [{role:"e", roleName:"EMPLOYEE"}],
      managerList: [ { emplId: "", name: "" } ],
      emplId: "",
      name: "",
      businessEmail: "",
      effectiveDate:null,
      reportsTo: { emplId: "", name: "" },
      reportDottedLine: "",
      deptId: "",
      nricPassport:"",
      gender: "",
      marriageStatus:"",
      marriageDate:initialDate,
      marriageCount:"",
      totalChildren:"",
      jobTitle:"",
      mobileNo:"",
      businessUnit:"",
      managerId:"",
      joinDate:initialDate,
      status:"A",
      translateItemList: [
        { id: { fieldname: "", fieldvalue: "" }, 
          effStatus: "", xlatlongname: "", xlatshortname: "" 
        }
      ]
    };
  }

  isHrRole(roles) {
    if (!roles) return;
    const arrRoles = roles;
    const currRole = arrRoles.filter(function(role) {
      return role.roleName === "HR";
    });

    return currRole.length === 0 ? false : true;
  }

  isManagerRole(roles) {
    if (!roles) return;
    const arrRoles = roles;
    const currRole = arrRoles.filter(function(role) {
      return role.roleName === "MANAGER";
    });

    return currRole.length === 0 ? false : true;
  }

  verifyEmplId(event){
    if(event.target.value === ""){ return;  }

    fetchData({
      url: API_BASE_URL + "/employeedetails/" + event.target.value,
      method: 'GET'
    }).then(response => {
      const emplId = response.emplId;
      if(emplId !== null){
        ReactDOM.findDOMNode(this.refs["csiStaffId"]).setCustomValidity("Employee Id already exists!");
      } else {
        ReactDOM.findDOMNode(this.refs["csiStaffId"]).setCustomValidity("");
      }
    }).catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
    });
  }

  verifyEmailExists(event){
    if(event.target.value === ""){ return; }

    fetchData({
      url: API_BASE_URL + "/verifyEmailExists/" + event.target.value,
      method: 'GET'
    }).then(response => {
      const emplId = response.emplId;
      if(emplId !== null){
        ReactDOM.findDOMNode(this.refs["email"]).setCustomValidity("E-mail Id already exists!");
      } else {
        ReactDOM.findDOMNode(this.refs["email"]).setCustomValidity("");
      }
    }).catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
    });
  }

  getManagerDetails(emplId) {
    if (!emplId) return;
      const currManager = this.state.managerList.filter(function(manager) {
      return manager.emplId === emplId;
    });

    return currManager[0];
  }

  loadProfile(){
    let initialDate = new Date();
    initialDate.setUTCHours(0,0,0,0);
    const { emplId } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/employeedetails/" + emplId,
      method: "GET"
    }).then(data => {
        this.setState({
          emplId: data.emplId,
          name: data.name,
          businessEmail: data.businessEmail,
          nricPassport: data.nricPassport,
          gender: data.gender,
          marriageStatus: data.marriageStatus,
          marriageDate: data.marriageDate === null ? initialDate : formatDateYMD(data.marriageDate),
          marriageCount: data.marriageCount,
          totalChildren: data.totalChildren,
          jobTitle: data.jobTitle,
          effectiveDate: data.effectiveDate,
          mobileNo: data.mobileNo,
          deptId : data.deptId,
          businessUnit: data.businessUnit,
          reportsTo: data.reportsTo,
          joinDate: data.joinDate === null? initialDate : formatDateYMD(data.joinDate),
          status: data.status,
          roles: data.roles,
        });
       
       if(this.isHrRole(this.state.roles)){
        ReactDOM.findDOMNode(this.refs["HR"]).checked = true;
       }

       if(this.isManagerRole(this.state.roles)){
        ReactDOM.findDOMNode(this.refs["MANAGER"]).checked = true;
       }

       ReactDOM.findDOMNode(this.refs["csiStaffId"]).disabled = true;
       if(data.marriageStatus === "SIN"){
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = true;
        } else {
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = false;
        }
      }).catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  loadManagerList(){
    // fetch approvers from API
    fetchData({
      url: API_BASE_URL + "/leaveapprovers",
      method: 'GET'
    }).then(data => this.setState({ managerList: data }))
    .catch(error => {
        // if unable to fetch data, assign default (spaces) to values
        let managerListData = [{ emplId: "", name: "" }];
        this.setState({ managerList: managerListData });

        if (error.status === 401) {
          this.props.history.push("/login");
        }
    });
  }

  loadTranslateItem(){
    // fetch translate item from API
    fetchData({
      url: API_BASE_URL + "/translateitems",
      method: 'GET'
    }).then(data => { 
      this.setState({translateItemList:data})
    }).catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
    });
  }

  handleChange(event){
    switch (event.target.name) {
      case "csiStaffId": 
        this.setState({ emplId: event.target.value });
        break;
      case "staffName":
        this.setState({ name: event.target.value });
        break;
      case "email":
        this.setState({ businessEmail: event.target.value });
        break;
      case "icNumber":
        this.setState({ nricPassport: event.target.value });
        break;
      case "mobileNo":
        this.setState({ mobileNo: event.target.value });
        break;
      case "gender":
        this.setState({ gender: event.target.value });
        break;
      case "marriageStatus":
        this.setState({ marriageStatus: event.target.value });
        if(event.target.value === "SIN"){
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = true;
        } else {
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = false;
        }
        break;
      case "marriageCount":
        this.setState({ marriageCount: event.target.value });
        break;
      case "marriageDate":
        this.setState({ marriageDate: event.target.value });
        break;
      case "totalChildren":
        this.setState({ totalChildren: event.target.value });
        break;
      case "jobTitle":
        this.setState({ jobTitle: event.target.value });
        break;
      case "businessUnit":
        this.setState({ businessUnit: event.target.value });
        break;
      case "deptId":
        this.setState({ deptId: event.target.value });
        break;
      case "managerId":
        if(event.target.value !== ""){
          let manager = this.getManagerDetails(event.target.value);
          this.setState({ reportsTo: manager });
        } else {
          this.setState({ reportsTo: {emplId:"",name:""} });
        }
        break;
      case "reportDottedLine":
        if(event.target.value !== ""){
          let manager = this.getManagerDetails(event.target.value);
          this.setState({ reportDottedLine: manager.emplId });
        } else {
          this.setState({ reportDottedLine: "" });
        }
        break;
      case "joinDate":
        this.setState({ joinDate: event.target.value });
        break;
      default:
        break;
    }
  }

  handleOptionChange = changeEvent => {
    if(changeEvent.target.value === "active"){
      this.setState({ status: "A" });
    } else {
      this.setState({ status: "I" });
    }
  };

  handleCheckBoxChange = changeEvent => {
    let newRoles = [];
    if(ReactDOM.findDOMNode(this.refs["EMPLOYEE"]).checked){
      newRoles.push({role:"E", roleName:"EMPLOYEE"});
    }

    if(ReactDOM.findDOMNode(this.refs["MANAGER"]).checked){
      newRoles.push({role:"M", roleName:"MANAGER"});
    }

    if(ReactDOM.findDOMNode(this.refs["HR"]).checked){
      newRoles.push({role:"A", roleName:"HR"});
    }

    this.setState({roles:newRoles});
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    const values = {
      emplId: this.state.emplId,
      name: this.state.name,
      effectiveDate: this.state.effectiveDate,
      reportsTo: this.state.reportsTo,
      reportDottedLine: this.state.reportDottedLine,
      businessEmail: this.state.businessEmail,
      nricPassport: this.state.nricPassport,
      gender: this.state.gender,
      marriageStatus: this.state.marriageStatus,
      marriageCount: this.state.marriageCount,
      marriageDate: this.state.marriageDate,
      totalChildren: this.state.totalChildren,
      jobTitle: this.state.jobTitle,
      mobileNo: this.state.mobileNo,
      businessUnit: this.state.businessUnit,
      deptId: this.state.deptId,
      joinDate: this.state.joinDate,
      status: this.state.status,
      roles: this.state.roles
    };
    const request = Object.assign({}, values);
    fetchData({
      url: API_BASE_URL + "/addEditEmployeeDetails",
      method: 'POST',
      body: JSON.stringify(request)
    }).then(response => {
      if(response.emplId !== null){
        confirmAlert({
          message: "Employee " + response.emplId + " is successfully save",
          buttons: [
            {
              label: "OK",
              onClick: () => this.props.history.push("/liststaffprofile")
            }
          ]
        });
      }
    }).catch(error => {
      if(error.status === 401) {
         this.props.history.push("/login");    
      } 
    });
  };

  componentDidMount() {
    this.loadManagerList();
    this.loadTranslateItem();
    
    if(this.props.computedMatch.params.emplId){
      this.loadProfile();
    }
  }

  clickdiscard = () => {
    confirmAlert({
      message: "Do you want to cancel this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.history.push("/liststaffprofile")
        },
        { label: "No" }
      ]
    });
  };

  render() {
    const {emplId,
            name,
            businessEmail,
            nricPassport,
            gender,
            marriageStatus,
            marriageCount,
            marriageDate,
            totalChildren,
            mobileNo,
            jobTitle,
            deptId,
            businessUnit,
            reportsTo,
            reportDottedLine,
            joinDate,
            status} = this.state;
    const edit = this.props.computedMatch.params.emplId ? "Edit":"Add";
    
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">{edit} Employee Profile</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form ref="form" onSubmit={this.handleFormSubmit} >
            <FormGroup>
              <Label for="csiStaffId">CSI Staff ID</Label>
              <Input
                type="text"
                name="csiStaffId"
                id="csiStaffId"
                ref="csiStaffId"
                placeholder="CSI Staff ID"
                onChange={this.handleChange}
                onBlur={this.verifyEmplId}
                value={emplId}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="staffName">Staff Name</Label>
              <Input
                type="text"
                name="staffName"
                id="staffName"
                placeholder="Staff Name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                ref="email"
                placeholder="Email"
                onChange={this.handleChange}
                onBlur={this.verifyEmailExists}
                value={businessEmail}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="icNumber">NRIC / Passport No.</Label>
              <Input
                type="text"
                name="icNumber"
                id="icNumber"
                placeholder="NRIC / Passport No."
                onChange={this.handleChange}
                value={nricPassport}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                placeholder="Gender"
                onChange={this.handleChange}
                value={gender}
                required
              >
                <option value="">Select Gender</option>
                {this.state.translateItemList.map(item => {
                  if(item.id.fieldname === "gender"){
                    return (
                      
                      <option key={item.id.fieldvalue} value={item.id.fieldvalue}>
                        {item.xlatlongname}
                      </option>
                    );
                  }
              })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="marriageStatus">Marital Status</Label>
              <Input
                type="select"
                name="marriageStatus"
                id="marriageStatus"
                placeholder="Gender"
                onChange={this.handleChange}
                value={marriageStatus}
                required
              >
                <option value="">Select Marital Status</option>
                <option value="SIN">Single</option>
                <option value="MAR">Married</option>
                <option value="DVR">Divorced</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="marriageDate">Marriage Date</Label>
              <Input
                type="date"
                name="marriageDate"
                id="marriageDate"
                ref="marriageDate"
                placeholder="Marriage Date"
                onChange={this.handleChange}
                value={marriageDate}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="marriageCount">Marriage Count</Label>
              <Input
                type="number"
                name="marriageCount"
                id="marriageCount"
                placeholder="Marriage Count"
                onChange={this.handleChange}
                value={marriageCount}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="totalChildren">Total Children</Label>
              <Input
                type="number"
                name="totalChildren"
                id="totalChildren"
                placeholder="Total Children"
                onChange={this.handleChange}
                value={totalChildren}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="jobTitle">Job Title</Label>
              <Input
                type="select"
                name="jobTitle"
                id="jobTitle"
                placeholder="Job Title"
                onChange={this.handleChange}
                value={jobTitle}
                required
              >
              <option key="" value="">Select Job Title</option>
              {this.state.translateItemList.map(item => {
                  if(item.id.fieldname === "job_title"){
                    return (
                      
                      <option key={item.id.fieldvalue} value={item.id.fieldvalue}>
                        {item.xlatlongname}
                      </option>
                    );
                  }
              })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="mobileNo">Mobile No.</Label>
              <Input
                type="text"
                name="mobileNo"
                id="mobileNo"
                placeholder="Mobile No."
                onChange={this.handleChange}
                value={mobileNo}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="businessUnit">Business Unit</Label>
              <Input
                type="select"
                name="businessUnit"
                id="businessUnit"
                onChange={this.handleChange}
                value={businessUnit}
                required
              >
                {this.state.translateItemList.map(item => {
                  if(item.id.fieldname === "business_unit"){
                    return (
                      
                      <option key={item.id.fieldvalue} value={item.id.fieldvalue}>
                        {item.xlatlongname}
                      </option>
                    );
                  }
              })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="deptId">Department</Label>
              <Input
                type="select"
                name="deptId"
                id="deptId"
                onChange={this.handleChange}
                value={deptId}
                required
              >
                <option key="" value="">Select Department</option>
                {this.state.translateItemList.map(item => {
                  if(item.id.fieldname === "dept_id"){
                    return (
                      
                      <option key={item.id.fieldvalue} value={item.id.fieldvalue}>
                        {item.xlatlongname}
                      </option>
                    );
                  }
              })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="lineManagerId">Line Manager</Label>
              <Input
                type="select"
                name="managerId"
                id="managerId"
                onChange={this.handleChange}
                value={reportsTo.emplId}
                required
              >
                <option key="" value="">Select Line Manager</option>
                {this.state.managerList.map(manager => {
                    return (
                        <option key={manager.emplId} value={manager.emplId}>
                          {manager.name}
                        </option>
                    );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="reportDottedLine">Dotted Line Manager</Label>
              <Input
                type="select"
                name="reportDottedLine"
                id="reportDottedLine"
                onChange={this.handleChange}
                value={reportDottedLine}
              >
                <option key="" value="">Select Line Manager</option>
                {this.state.managerList.map(manager => {
                    if(manager.emplId !== reportsTo.emplId){
                    return (
                      <option key={manager.emplId} value={manager.emplId}>
                        {manager.name}
                      </option>
                    );
                    }
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="joinDate">Join Date</Label>
              <Input
                type="date"
                name="joinDate"
                id="joinDate"
                placeholder="Join Date"
                onChange={this.handleChange}
                value={joinDate}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <div className="form-check">
                <Input
                  type="radio"
                  name="active"
                  value="active"
                  checked={status === "A"}
                  onChange={this.handleOptionChange}
                />{" "}
                Active
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="inactive"
                  value="inactive"
                  checked={status === "I"}
                  onChange={this.handleOptionChange}
                />{" "}
                Inactive
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <div className="form-check">
                <Input type="checkbox" name="EMPLOYEE" ref="EMPLOYEE"
                  value="EMPLOYEE" checked disabled
                  onChange={this.handleCheckBoxChange}/>{" "}
                Employee
              </div>
              <div className="form-check">
                <Input type="checkbox" name="MANAGER" ref="MANAGER"
                  value="MANAGER"
                  onChange={this.handleCheckBoxChange} /> Manager
              </div>
              <div className="form-check">
                <Input type="checkbox" name="HR" ref="HR"
                value="HR"
                onChange={this.handleCheckBoxChange} /> Admin
              </div>
            </FormGroup>
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}
            >
              Save
            </Button>
            &nbsp;&nbsp;
            <Button
              color="primary"
              style={{ backgroundColor: "#3F51B5", color: "white" }}
              onClick={this.clickdiscard}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(NewStaffProfile);
