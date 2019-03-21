import React, { Component } from "react";
import { Button, Input, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import ReactTable from "react-table";
import "react-table/react-table.css";

class MultipleStaffUpdate extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      statusLookup: [],
      employeeProfiles: [],
      selectedFieldType: "",
      selectedFieldValue: "",
      fieldValuesList: [],
      deptIdList: [],
      genderList: [],
      marriageStatusList: [],
      jobTitleList: [],
      businessUnitList: [],
      managerList: [],
      loading: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadTranslateItem();
    this.loadManagerList();
    this.loadStatusLookup();
  }
/*
  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadEmployeeDetails();
    }
  }

  loadEmployeeDetails = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => {
        if (this._isMounted) {
          this.setState({
            employeeProfiles: data,
            loading: false
          });
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        if (this._isMounted) {
          this.setState({
            employeeProfiles: [],
            loading: false
          });
        }
      });
  };
*/
  loadStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/status",
      method: "GET"
    })
      .then(data => this.setState({ statusLookup: data }))
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

  loadManagerList = () => {
    // fetch approvers from API
    fetchData({
      url: API_BASE_URL + "/leaveapprovers",
      method: "GET"
    })
      .then(data => this.setState({ managerList: data }))
      .catch(error => {
        // if unable to fetch data, assign default (spaces) to values
        let managerListData = [{ emplId: "", name: "" }];
        this.setState({ managerList: managerListData });

        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  loadTranslateItem = () => {
    // fetch translate item from API
    fetchData({
      url: API_BASE_URL + "/translateitems",
      method: "GET"
    })
      .then(data => {
        
        let deptIdList = [], genderList = [], marriageStatusList = [], 
            jobTitleList = [], businessUnitList = [];
          
        data.map(item => { 
          if(item.effStatus === "A"){
            if (item.id.fieldname === "dept_id" ) 
              deptIdList.push(item)
            else if(item.id.fieldname === "gender")
              genderList.push(item)
            else if(item.id.fieldname === "marriage_status")
              marriageStatusList.push(item)
            else if(item.id.fieldname === "job_title")
              jobTitleList.push(item)
            else if(item.id.fieldname === "business_unit")
              businessUnitList.push(item)
          }
          return true;
        })
        
        this.setState({
          deptIdList: deptIdList,
          genderList: genderList,
          marriageStatusList: marriageStatusList,
          jobTitleList: jobTitleList,
          businessUnitList: businessUnitList
        })
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  handlefieldtypechange = event => {
    const selectedFieldType = event.target.value;
    let fieldValuesList = [];

    switch(selectedFieldType) {
      case "business_unit":
        this.state.businessUnitList.map(businessUnit => {
          fieldValuesList.push({
            key: businessUnit.id.fieldvalue, 
            value: businessUnit.xlatlongname
          })
          return true;
        })
        break;
      case "dept_id":
        this.state.deptIdList.map(deptId => {
          fieldValuesList.push({
            key: deptId.id.fieldvalue, 
            value: deptId.xlatlongname
          })
          return true;
        })
        break;
      case "manager":
        this.state.managerList.map(manager => {
          fieldValuesList.push({
            key: manager.emplId, 
            value: manager.name
          })
          return true;
        })
        break;
      case "job_title":
        this.state.jobTitleList.map(jobTitle => {
          fieldValuesList.push({
            key: jobTitle.id.fieldvalue, 
            value: jobTitle.xlatlongname
          })
          return true;
        })
        break;
      case "gender":
        this.state.genderList.map(gender => {
          fieldValuesList.push({
            key: gender.id.fieldvalue, 
            value: gender.xlatlongname
          })
          return true;
        })
        break;
      case "marriage_status":
        this.state.marriageStatusList.map(marriageStatus => {
          fieldValuesList.push({
            key: marriageStatus.id.fieldvalue, 
            value: marriageStatus.xlatlongname
          })
          return true;
        })
        break;
      default: 
        break;
    }
    console.log(fieldValuesList[0].value)
    this.setState({
      selectedFieldType: selectedFieldType,
      fieldValuesList: fieldValuesList,
      selectedFieldValue: fieldValuesList[0].key
    })
  }

  handlefieldvaluechange = event => {
    this.setState({
      selectedFieldValue: event.target.value
    })
  }

  handleEmployeeSearch = event => {
    const searchString = this.state.selectedFieldType + "=" + this.state.selectedFieldValue;
    
    fetchData({
      url: API_BASE_URL + "/searchemployee?" + searchString,
      method: "GET"
    })
      .then(data => {
        if (this._isMounted) {
          this.setState({
            employeeProfiles: data,
            loading: false
          });
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        if (this._isMounted) {
          this.setState({
            employeeProfiles: [],
            loading: false
          });
        }
      });
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const getStatusDesc = strStatus => {
      let arrStatusDescLookup = this.state.statusLookup;
      let stsDesc = "";
      arrStatusDescLookup.forEach(statusDesc => {
        if (statusDesc.id.fieldvalue === strStatus) {
          return (stsDesc = statusDesc.xlatlongname);
        }
      });
      return stsDesc;
    };

    const EmplProfileCols = [
      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "emplId",
        width: 110,
        sortable: true
      },
      {
        id: "name",
        Header: "Employee Name",
        accessor: "name",
        minWidth: 130,
        sortable: true
      },
      {
        id: "gender",
        Header: "Gender",
        accessor: "gender",
        minWidth: 80,
        style: {
          textAlign: "center"
        },
        Cell: (props) => {
          return (
            <Input type="select" value={props.value} bsSize="sm">
              { this.state.genderList.map(gender => {
                return (
                  <option
                    key={gender.id.fieldvalue}
                    value={gender.id.fieldvalue}
                  >
                    {gender.xlatlongname}
                  </option>
                );
              }) }
            </Input>
          )
        }
      },
      {
        id: "marriageStatus",
        Header: "MStatus",
        accessor: "marriageStatus",
        minWidth: 80,
        sortable: true,
        style: {
          textAlign: "center"
        },
        Cell: (props) => {
          return (
            <Input type="select" value={props.value} bsSize="sm">
              { this.state.marriageStatusList.map(marriageStatus => {
                return (
                  <option
                    key={marriageStatus.id.fieldvalue}
                    value={marriageStatus.id.fieldvalue}
                  >
                    {marriageStatus.xlatlongname}
                  </option>
                );
              }) }
            </Input>
          )
        }
      },
      {
        id: "jobTitle",
        Header: "Job Title",
        accessor: "jobTitle",
        minWidth: 130,
        sortable: true,
        Cell: (props) => {
          return (
            <Input type="select" value={props.value} bsSize="sm">
              { this.state.jobTitleList.map(jobTitle => {
                return (
                  <option
                    key={jobTitle.id.fieldvalue}
                    value={jobTitle.id.fieldvalue}
                  >
                    {jobTitle.xlatlongname}
                  </option>
                );
              }) }
            </Input>
          )
        }
      },
      {
        id: "businessUnit",
        Header: "BU",
        accessor: "businessUnit",
        minWidth: 110,
        sortable: true,
        style: {
          textAlign: "center"
        },
        Cell: (props) => {
          return (
            <Input type="select" value={props.value} bsSize="sm">
              { this.state.businessUnitList.map(businessUnit => {
                return (
                  <option
                    key={businessUnit.id.fieldvalue}
                    value={businessUnit.id.fieldvalue}
                  >
                    {businessUnit.xlatlongname}
                  </option>
                );
              }) }
            </Input>
          )
        }
      },
      {
        id: "deptId",
        Header: "Dept ID",
        accessor: "deptId",
        minWidth: 90,
        sortable: true,
        style: {
          textAlign: "center"
        },
        Cell: (props) => {
          return (
            <Input type="select" value={props.value} bsSize="sm">
              { this.state.deptIdList.map(deptId => {
                return (
                  <option
                    key={deptId.id.fieldvalue}
                    value={deptId.id.fieldvalue}
                  >
                    {deptId.xlatlongname}
                  </option>
                );
              }) }
            </Input>
          )
        }
      },
      {
        id: "LineMgrName",
        Header: "Line Manager",
        accessor: "reportsTo.emplId",
        minWidth: 140,
        sortable: true,
        Cell: (props) => {
          return (
            <Input type="select" value={props.value} bsSize="sm">
              { this.state.managerList.map(manager => {
                return (
                  <option
                    key={manager.emplId}
                    value={manager.emplId}
                  >
                    {manager.name}
                  </option>
                );
              }) }
            </Input>
          )
        }
      },
      {
        id: "businessEmail",
        Header: "Business Email",
        accessor: "businessEmail",
        minWidth: 190,
        sortable: true,
        show: false
      },
      {
        id: "DateJoined",
        Header: "Join Date",
        accessor: d => formatDateDMY(d.joinDate),
        minWidth: 90,
        sortable: true,
        show: false
      },
      {
        id: "status",
        Header: "Status",
        accessor: str => getStatusDesc(str.status),
        sortable: true,
        show: false
      },
      {
        id: "mobileNo",
        Header: "Mobile No.",
        accessor: "mobileNo",
        minWidth: 110,
        sortable: true,
        style: {
          textAlign: "center"
        },
        show: false
      },
      {
        id: "joinDate",
        Header: "Join Date",
        accessor: "joinDate",
        show: false
      },
      {
        id: "marriageCount",
        Header: "MarriageCount",
        accessor: "marriageCount",
        show: false
      },

      {
        id: "marriageDate",
        Header: "MarriageDate",
        accessor: "marriageDate",
        show: false
      },
      {
        id: "nricPassport",
        Header: "NRIC/Passport No.",
        accessor: "nricPassport",
        show: false
      },
      {
        id: "reportDottedLine",
        Header: "ReportDottedLine",
        accessor: "reportDottedLine",
        show: false
      },
      {
        id: "totalChildren",
        Header: "TotalChildren",
        accessor: "totalChildren",
        show: false
      },
      {
        id: "LineMgrID",
        Header: "Line Manager ID",
        accessor: "reportsTo.emplId",
        show: false
      }      
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Update Multiple Profiles</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <div className="mainListBtnContainer">
            <div className="SubListBtnLeftContainer">
              <Col xs="5">
                <Input 
                  type="select" 
                  name="fieldtypeselect" 
                  id="fieldtypeselect" 
                  onChange={this.handlefieldtypechange}
                  value={this.state.selectedFieldType}
                >
                  <option key="" value="">- Select a search field -</option>
                  <option key="business_unit" value="business_unit">Business Unit</option>
                  <option key="dept_id" value="dept_id">Department ID</option>
                  <option key="manager" value="manager">Manager</option>
                  <option key="job_title" value="job_title">Job Title</option>
                  <option key="gender" value="gender">Gender</option>
                  <option key="marriage_status" value="marriage_status">Marriage Status</option>
                </Input>
              </Col>             
              <Col xs="5">
                <Input 
                  type="select" 
                  name="fieldvalueselect" 
                  id="fieldvalueselect" 
                  onChange={this.handlefieldvaluechange}
                  value={this.state.selectedFieldValue}
                >
                  {                     
                    this.state.fieldValuesList.map(fieldvalue => {
                      return (
                        <option
                          key={fieldvalue.key}
                          value={fieldvalue.key}
                        >
                          {fieldvalue.value}
                        </option>
                      );
                    })
                  }
                </Input>
              </Col>
              <Col xs="2">
                <Button
                  variant="contained"
                  color="primary"
                  className="largeButtonOverride"
                  onClick={this.handleEmployeeSearch}
                >
                  <span
                    className="fa fa-search"
                    style={{ margin: "0px 5px 0px 0px" }}
                  />                
                </Button>
              </Col>
            </div>
            <div className="SubListBtnRightContainer">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="largeButtonOverride"
                  component={Link}
                  tag={Link}
                  to={`/liststaffprofile/uploadprofiles`}
                >
                  <span
                    className="fa fa-save"
                    style={{ margin: "0px 5px 0px 0px" }}
                  />
                  Save All
                </Button>
              </div>
            </div>
          </div>
          <ReactTable
            data={this.state.employeeProfiles}
            columns={EmplProfileCols}
            pageSizeOptions={[10, 20, 30, 50, 100]}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            sortable={true}
            multiSort={true}
            loadingText="Loading Employee Profiles..."
            noDataText="No data available."
            className="-striped"
            showPagination={true}
            showPageSizeOptions={true}
            ref={refer => {
              this.selectTable = refer;
            }}            
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MultipleStaffUpdate);
