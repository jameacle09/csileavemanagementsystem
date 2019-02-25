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
    this.isHrRole = this.isHrRole.bind(this);
    this.isManagerRole = this.isManagerRole.bind(this);
    this.getManagerDetails = this.getManagerDetails.bind(this);
    this.verifyEmplId = this.verifyEmplId.bind(this);
    this.verifyEmailExists = this.verifyEmailExists.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadManagerList = this.loadManagerList.bind(this);
    this.loadDeptList = this.loadDeptList.bind(this);
    this.loadBuList = this.loadBuList.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.state = {
      emplIdExists:false,
      roles: [{role:"e", roleName:"EMPLOYEE"}],
      managerList: [ { emplId: "", name: "" } ],
      deptList: [ { deptId: "", deptName: "" } ],
      buList: [ { businessUnit: "", descr: ""  } ],
      emplId: "",
      name: "",
      effectiveDate:null,
      reportsTo: { emplId: "", name: "" },
      reportDottedLine: "",
      deptId: { deptId: "", deptName: "" },
      nricPassport:"",
      gender: "",
      marriageStatus:"",
      marriageDate:initialDate,
      marriageCount:"",
      totalChildren:"",
      jobTitle:"",
      mobileNo:"",
      businessUnit:{ businessUnit:"", descr: "" },
      managerId:"",
      joinDate:initialDate,
      status:"A"
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

  getDeptDetails(deptId) {
    if (!deptId) return;
      const currDept = this.state.deptList.filter(function(dept) {
      return dept.deptId === deptId;
    });

    return currDept[0];
  }

  getBuDetails(buId) {
    if (!buId) return;
      const currBu = this.state.buList.filter(function(bu) {
      return bu.businessUnit === buId;
    });

    return currBu[0];
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
          email: data.businessEmail,
          nricPassport: data.nricPassport,
          gender: data.gender,
          marriageStatus: data.marriageStatus,
          marriageDate: data.marriageDate === null ? initialDate : formatDateYMD(data.marriageDate),
          marriageCount: data.marriageCount,
          totalChildren: data.totalChildren,
          jobTitle: data.jobTitle,
          effectiveDate: data.effectiveDate,
          mobileNo: data.mobileNo,
          deptId :{ deptId : data.deptId },
          businessUnit: { businessUnit: data.businessUnit },
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

  loadDeptList(){
    // fetch departments from API
    fetchData({
      url: API_BASE_URL + "/departments",
      method: 'GET'
    }).then(data => this.setState({ deptList: data }))
    .catch(error => {
        // if unable to fetch data, assign default (spaces) to values
        let deptListData = [{deptId: "", deptName: ""}];
        this.setState({ deptList: deptListData });

        if (error.status === 401) {
          this.props.history.push("/login");
        }
    });
  }

  loadBuList(){
    // fetch business unit from API
    fetchData({
      url: API_BASE_URL + "/businessunit",
      method: 'GET'
    }).then(data => this.setState({ buList: data }))
    .catch(error => {
        // if unable to fetch data, assign default (spaces) to values
        let buListData = [ { businessUnit: "", descr: "" } ];
        this.setState({ buList: buListData });

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
        this.setState({ email: event.target.value });
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
        if(event.target.value !== ""){
          let bu = this.getBuDetails(event.target.value);
          this.setState({ businessUnit: bu });
        } else {
          this.setState({ businessUnit: {businessUnit:"", descr: ""} });
        }
        break;
      case "deptId":
        if(event.target.value !== ""){
          let dept = this.getDeptDetails(event.target.value);
          this.setState({ deptId: dept });
        } else {
          this.setState({ deptId: {deptId:"", deptName: ""} });
        }
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
      businessEmail: this.state.email,
      nricPassport: this.state.nricPassport,
      gender: this.state.gender,
      marriageStatus: this.state.marriageStatus,
      marriageCount: this.state.marriageCount,
      marriageDate: this.state.marriageDate,
      totalChildren: this.state.totalChildren,
      jobTitle: this.state.jobTitle,
      mobileNo: this.state.mobileNo,
      businessUnit: this.state.businessUnit.businessUnit,
      deptId: this.state.deptId.deptId,
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
    this.loadDeptList();
    this.loadBuList();
    
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
        {
          label: "No"
        }
      ]
    });
  };

  render() {
    const {emplId,
            name,
            email,
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
                value={email}
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
                <option value="M">Male</option>
                <option value="F">Female</option>
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
                type="text"
                name="jobTitle"
                id="jobTitle"
                placeholder="Job Title"
                onChange={this.handleChange}
                value={jobTitle}
                required
              />
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
                value={businessUnit.businessUnit}
                required
              >
                <option key="" value="">Select Business Unit</option>
                {this.state.buList.map(bu => {
                    return (
                      <option key={bu.businessUnit} value={bu.businessUnit}>
                        {bu.descr}
                      </option>
                    );
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
                value={deptId.deptId}
                required
              >
                <option key="" value="">Select Department</option>
                {this.state.deptList.map(dept => {
                    return (
                      <option key={dept.deptId} value={dept.deptId}>
                        {dept.deptName}
                      </option>
                    );
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
