import React, { Component } from 'react';
import './SideBarStyle.css';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const SideBarStyle = {
            height: "100vh",
            width: "300px",
            fontSize: "1rem",
            background: "#357BB6",
            fontFamily: 'Helvetica',
            marginTop: "-16px"
        }

        return (
            <div style={SideBarStyle}>
                <br />
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active" style={{ color: 'white' }}>Staff Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/leaveentitlement" activeclassname="active" style={{ color: 'white' }}>Leave Entitlement</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/publicholiday" activeclassname="active" style={{ color: 'white' }}>Public Holiday</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/leavecategory" activeclassname="active" style={{ color: 'white' }}>Leave Category</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active" style={{ color: 'white' }}>Report</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default SideBar;