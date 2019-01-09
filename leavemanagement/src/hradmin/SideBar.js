import React, { Component } from 'react';
import './SideBarStyle.css';
import { Link } from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <aside class="main_sidebar">
                <ul>
                    <li>Staff Profile</li>
                    <li>Staff Leave</li>
                    <li>Public Holiday</li>
                    <li>Leave Category</li>
                </ul>
            </aside>
        )
    }
}

export default SideBar;