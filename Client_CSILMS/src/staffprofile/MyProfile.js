import React, { Component } from "react";
import { ListGroup, ListGroupItem, Table, Button } from "reactstrap";
import "../common/Styles.css";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplProfileData: {
        emplId: "",
        name: "",
        gender: "",
        marriageStatus: "",
        marriageDate: new Date(),
        marriageCount: "",
        totalChildren: "",
        nricPassport: "",
        jobTitle: "",
        businessUnit: "",
        deptId: "",
        reportsTo: {
          name: ""
        },
        joinDate: new Date(),
        mobileNo: "",
        businessEmail: ""
      },
      genderLookup: [],
      maritalStatusLookup: [],
      jobTitleLookup: [],
      businessUnitLookup: [],
      departmentIdLookup: []
    };

    this.loadUserProfile = this.loadUserProfile.bind(this);
  }

  loadUserProfile() {
    fetchData({
      url: API_BASE_URL + "/employeedetail/me",
      method: "GET"
    })
      .then(response => {
        this.setState({
          emplProfileData: response
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  componentDidMount() {
    this.loadUserProfile();
    this.loadGenderLookup();
    this.loadMaritalStatusLookup();
    this.loadJobTitleLookup();
    this.loadBusinessUnitLookup();
    this.loadDepartmentIdLookup();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadUserProfile();
    }
  }

  loadGenderLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/gender",
      method: "GET"
    })
      .then(data => this.setState({ genderLookup: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  loadMaritalStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/marriage_status",
      method: "GET"
    })
      .then(data => this.setState({ maritalStatusLookup: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  loadJobTitleLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/job_title",
      method: "GET"
    })
      .then(data => this.setState({ jobTitleLookup: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  loadBusinessUnitLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/business_unit",
      method: "GET"
    })
      .then(data => this.setState({ businessUnitLookup: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  loadDepartmentIdLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/dept_id",
      method: "GET"
    })
      .then(data => this.setState({ departmentIdLookup: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  handleCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const getGenderDesc = strGender => {
      let arrGenderLookup = this.state.genderLookup;
      let genderDesc = "";
      arrGenderLookup.forEach(gender => {
        if (gender.id.fieldvalue === strGender)
          return (genderDesc = gender.xlatlongname);
      });
      if (!genderDesc) return strGender;
      return genderDesc;
    };

    const getMaritalStatusDesc = strMaritalStatus => {
      let arrMaritalStatusLookup = this.state.maritalStatusLookup;
      let maritalStatusDesc = "";
      arrMaritalStatusLookup.forEach(mstatus => {
        if (mstatus.id.fieldvalue === strMaritalStatus)
          return (maritalStatusDesc = mstatus.xlatlongname);
      });
      if (!maritalStatusDesc) return strMaritalStatus;
      return maritalStatusDesc;
    };

    const getJobTitleDesc = strJobTitle => {
      let arrJobTitleLookup = this.state.jobTitleLookup;
      let jobTitleDesc = "";
      arrJobTitleLookup.forEach(jobTitle => {
        if (jobTitle.id.fieldvalue === strJobTitle)
          return (jobTitleDesc = jobTitle.xlatlongname);
      });
      if (!jobTitleDesc) return strJobTitle;
      return jobTitleDesc;
    };

    const getBusinessUnitDesc = strBusinessUnit => {
      let arrBusinessUnitLookup = this.state.businessUnitLookup;
      let businessUnitDesc = "";
      arrBusinessUnitLookup.forEach(busUnit => {
        if (busUnit.id.fieldvalue === strBusinessUnit)
          return (businessUnitDesc = busUnit.xlatlongname);
      });
      if (!businessUnitDesc) return strBusinessUnit;
      return businessUnitDesc;
    };

    const getDepartmentDesc = strDeptID => {
      let arrDepartmentIdLookup = this.state.departmentIdLookup;
      let departmentDesc = "";
      arrDepartmentIdLookup.forEach(dept => {
        if (dept.id.fieldvalue === strDeptID)
          return (departmentDesc = dept.xlatlongname);
      });
      if (!departmentDesc) return strDeptID;
      return departmentDesc;
    };

    const { emplProfileData } = this.state;

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Profile</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <ListGroup>
            <ListGroupItem color="primary">
              <span className="fontProfileSubHeader">Personal Information</span>
            </ListGroupItem>
            <Table align="left" className="fontTableItems" size="sm">
              <tbody>
                <tr>
                  <td width="35%" style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Employee ID:</span>
                    <span className="profileShortText">Empl ID:</span>
                  </td>
                  <td width="65%" className="fontRowItemValue">
                    {emplProfileData.emplId}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Employee Name:</span>
                    <span className="profileShortText">Empl Name:</span>
                  </td>
                  <td className="fontRowItemValue">{emplProfileData.name}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>Gender:</td>
                  <td className="fontRowItemValue">
                    {getGenderDesc(emplProfileData.gender)}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Marital Status:</span>
                    <span className="profileShortText">Marital Stat:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {getMaritalStatusDesc(emplProfileData.marriageStatus)}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Married Date:</span>
                    <span className="profileShortText">Married On:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {emplProfileData.marriageDate
                      ? formatDateDMY(emplProfileData.marriageDate)
                      : "None"}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Married Count:</span>
                    <span className="profileShortText">Married Cnt:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {emplProfileData.marriageCount > 0
                      ? emplProfileData.marriageCount
                      : "None"}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">No. of Children:</span>
                    <span className="profileShortText">Children:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {emplProfileData.totalChildren > 0
                      ? emplProfileData.totalChildren
                      : "None"}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">NRIC / Passport No:</span>
                    <span className="profileShortText">NRIC/Passport:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {emplProfileData.nricPassport}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup>
        </div>
        <div className="reactTableContainer">
          <ListGroup>
            <ListGroupItem color="primary">
              <span className="fontProfileSubHeader">Contact Information</span>
            </ListGroupItem>
            <Table align="left" className="fontTableItems" size="sm">
              <tbody>
                <tr>
                  <td width="35%" style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Business Email:</span>
                    <span className="profileShortText">Bus Email:</span>
                  </td>
                  <td width="65%" className="fontRowItemValue">
                    {emplProfileData.businessEmail}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Mobile Number:</span>
                    <span className="profileShortText">Mobile #:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {emplProfileData.mobileNo}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup>
        </div>
        <div className="reactTableContainer">
          <ListGroup>
            <ListGroupItem color="primary">
              <span className="fontProfileSubHeader">
                Employment Information
              </span>
            </ListGroupItem>
            <Table align="left" className="fontTableItems" size="sm">
              <tbody>
                <tr>
                  <td width="35%" style={{ paddingLeft: "20px" }}>
                    Job Title:
                  </td>
                  <td width="65%" className="fontRowItemValue">
                    {getJobTitleDesc(emplProfileData.jobTitle)}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Business Unit:</span>
                    <span className="profileShortText">Bus Unit:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {getBusinessUnitDesc(emplProfileData.businessUnit)}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>Department:</td>
                  <td className="fontRowItemValue">
                    {getDepartmentDesc(emplProfileData.deptId)}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>
                    <span className="profileFullText">Line Manager:</span>
                    <span className="profileShortText">Line Mgr:</span>
                  </td>
                  <td className="fontRowItemValue">
                    {emplProfileData.reportsTo.name}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "20px" }}>Joined Date:</td>
                  <td className="fontRowItemValue">
                    {formatDateDMY(emplProfileData.joinDate)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup>
        </div>
        <div>
          <p
            style={{
              paddingLeft: "20px",
              fontSize: "14px",
              fontStyle: "italic",
              color: "black"
            }}
          >
            Note: If you found out that some of the information displayed above
            are incorrect, kindly inform the Human Resources Department and
            request for its correction.
          </p>
          {/* <Button
            component={Link}
            to="/changepassword/add"
            variant="contained"
            color="primary"
            className="largeButtonOverride"
          >
            Change Password
          </Button> */}
          <div
            style={{
              width: "18%",
              margin: "auto"
              // border: "1px solid black"
            }}
          >
            <Button
              color="primary"
              className="largeButtonOverride"
              onClick={this.handleCancel}
            >
              Home
            </Button>
          </div>
        </div>

        <br />
      </div>
    );
  }
}
export default withRouter(MyProfile);
