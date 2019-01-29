import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import "./Styles.css";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const menuContainer = {
      fontSize: "1rem",
      background: "#004A9B",
      fontFamily: "Helvetica",
      margin: "0 0 0 0",
      padding: "0",
      width: "100%"
    };
    const menuTitle = {
      fontFamily: "Helvetica",
      fontSize: "18px",
      color: "white",
      margin: "0px 5px 0 0"
    };
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={menuContainer}
      >
        <div className="container-fluid" style={menuContainer}>
          <button
            variant="contained"
            className="hamburger hamburger--collapse is-active"
            id="sidebarCollapse"
            className="btn btn-info"
            style={{ background: "#032a53", border: "0px solid gray" }}
          >
            <i className="fas fa-align-left" />
            <span />
          </button>
          <span style={menuTitle}>Leave Management System</span>
        </div>
      </nav>
    );
  }
}

export default Menu;
