import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      background: "#004A9B",
      fontFamily: "Helvetica",
      margin: "0 0 0 0",
      padding: "0",
      width: "100%"
      // height: "38px"
    };
    const menuTitle = {
      fontFamily: "Helvetica",
      fontSize: "18px",
      display: "inline-flex",
      color: "rgb(214, 209, 209)",
      margin: "0px 20px 0 0",
      textDecoration: "none"
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
          <span>
            <Link to="/" title="Navigate back to Home" style={menuTitle}>
              Leave Management System
            </Link>
          </span>
        </div>
      </nav>
    );
  }
}

export default Menu;
