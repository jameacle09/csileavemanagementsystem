import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const SideBarStyle = {
            height: "100%",
            width: "200px",
            fontSize: "1.3rem",
            background: "#357BB6",
            fontFamily: 'Helvetica'
        }

        return (
            <div style={SideBarStyle}>
                <br />
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active">Staff Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/leaveentitlement" activeclassname="active">Leave Entitlement</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/publicholiday" activeclassname="active" >Public Holiday</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/leavecategory" activeclassname="active">Leave Category</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active">Report</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default SideBar;