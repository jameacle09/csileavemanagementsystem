import React, { Component } from "react";
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
            type="button"
            id="sidebarCollapse"
            className="btn btn-info"
            style={{ background: "#032a53", border: "1px solid gray" }}
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
