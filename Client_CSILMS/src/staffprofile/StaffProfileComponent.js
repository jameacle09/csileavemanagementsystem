import React, { Component } from 'react';
import ListStaffProfile from './ListStaffProfile';
import NewStaffProfile from './NewStaffProfile';


class StaffProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            componenttoloadstatus: "dolist",
            componenttoload: <ListStaffProfile />
        }
        this.showNewStaffProfile = this.showNewStaffProfile.bind(this);
        this.showEditStaffProfile = this.showEditStaffProfile.bind(this);
        this.showStaffProfiles = this.showStaffProfiles.bind(this);
    }

    componentDidMount() {
        this.showStaffProfiles();
    }

    showStaffProfiles() {
        fetch('http://localhost/api/employeedetails')
            .then((response) => response.json())
            .then((data) => this.setState({data: data})) 
        this.setState({ componenttoloadstatus: "dolist"});
    }

    showNewStaffProfile() {
        this.setState({ componenttoloadstatus: "donew" })
    }

    showEditStaffProfile() {
        this.setState({ componenttoloadstatus: "doedit" })
    }

    render() {
        switch(this.state.componenttoloadstatus) {
            case "dolist":
                this.state.componenttoload =
                    <ListStaffProfile data = { this.state.data } 
                     showNewStaffProfile = { this.showNewStaffProfile }/>
                break;
            case "donew":
                this.state.componenttoload =
                    <NewStaffProfile showStaffProfiles={this.showStaffProfiles} />
                break;
            default:
                this.state.componenttoload =
                    <ListStaffProfile data = { this.state.data } 
                    showNewStaffProfile = { this.showNewStaffProfile }/>
              
        }
        return(
            <div>
                { this.state.componenttoload }   
            </div>
        );
    }
}

export default StaffProfileComponent;