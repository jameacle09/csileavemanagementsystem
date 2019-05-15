import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBarHeader.css";
import Logout from "../img/Logout.png";

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: true
    };
  }

  handleLogout = e => {
    e.preventDefault();
    this.props.handleLogout("/login");
  };

  toggleSideBarMenu = e => {
    e.preventDefault();
    // var screenSize = window.screen.width * window.devicePixelRatio;
    var screenSize = window.screen.width;
    if (screenSize <= 768) {
      // Smaller devices view
      if (this.state.sideBarOpen) {
        this.showSideBarMenu();
        document.getElementById("pageHeaderTitle").style.display = "none";
      } else {
        this.hideSideBarMenu();
        document.getElementById("pageHeaderTitle").style.display =
          "inline-block";
      }
    } else {
      // Bigger devices view
      if (!this.state.sideBarOpen) {
        this.showSideBarMenu();
      } else {
        this.hideSideBarMenu();
      }
    }
    this.setState({
      sideBarOpen: !this.state.sideBarOpen
    });
  };

  showSideBarMenu = () => {
    document.getElementById("PageSidebar").style.width = "250px";
    document.getElementById("MainPage").style.marginLeft = "250px";
    document.getElementById("MainPage").style.width = "calc(100% - 250px)";
    document.getElementById("PageSidebar").style.transitionDuration = "0s";
    document.getElementById("MainPage").style.transitionDuration = "0s";
  };

  hideSideBarMenu = () => {
    document.getElementById("PageSidebar").style.width = "0";
    document.getElementById("MainPage").style.marginLeft = "0";
    document.getElementById("PageSidebar").style.transitionDuration = "0.2s";
    document.getElementById("MainPage").style.transitionDuration = "0.2s";
    document.getElementById("MainPage").style.width = "100%";
    document.getElementById("MainPage").style.transitionDuration = "0s";
  };

  render() {
    if (!this.props.currentUser) {
      return <div />;
    }
    return (
      <div className="pageHeaderBox">
        <div className="pageHeaderToggleBox">
          <button
            className="sideBarToggleButton"
            onClick={event => this.toggleSideBarMenu(event)}
          >
            ☰
          </button>
        </div>

        <div id="pageHeaderTitle" className="pageHeaderTitleBox">
          <span>
            <Link
              to="/"
              title="Navigate back to Home"
              className="pageHeaderTitleText"
            >
              Leave Management System
            </Link>
          </span>
        </div>
        <div className="pageHeaderLogoutBox">
          {/* <span> */}
          <button
            className="pageHeaderLogoutButton"
            onClick={this.handleLogout}
          >
            <span>
              <img
                src={Logout}
                alt="Logout"
                style={{ height: "24px", width: "24px" }}
              />{" "}
              <span className="pageHeaderLogoutText">Logout</span>
            </span>
          </button>
          {/* <Link to="/" title="Quick Logout" className="pageHeaderLogoutLink">
              Logout
            </Link> */}
          {/* </span> */}
        </div>
      </div>
    );
  }
}

export default PageHeader;
