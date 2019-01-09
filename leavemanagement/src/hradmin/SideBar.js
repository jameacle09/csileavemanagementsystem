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
            fontSize: "1.2rem",
            background: "#2b73fa"
        }
        return (
            <div style={SideBarStyle}>
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active" style={{color:'white'}}>Staff Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active" style={{color:'white'}}>Staff Leave</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active" style={{color:'white'}}>Public Holiday</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/liststaffprofile" activeclassname="active" style={{color:'white'}}>Leave Category</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default SideBar;