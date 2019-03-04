import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBarHeader.css";

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: true
    };
  }

  toggleSideBarMenu = () => {
    var screenSize = window.screen.width * window.devicePixelRatio;
    if (screenSize <= 768) {
      if (this.state.sideBarOpen) {
        document.getElementById("PageSidebar").style.width = "250px";
        document.getElementById("MainPage").style.marginLeft = "250px";
        document.getElementById("MainPage").style.width = "83.7%";
        document.getElementById("MainPage").style.transitionDuration = "0.1s";
      } else {
        document.getElementById("PageSidebar").style.width = "0";
        document.getElementById("MainPage").style.marginLeft = "0";
        document.getElementById("MainPage").style.width = "100%";
        document.getElementById("MainPage").style.transitionDuration = "0.1s";
      }
    } else {
      if (!this.state.sideBarOpen) {
        document.getElementById("PageSidebar").style.width = "250px";
        document.getElementById("MainPage").style.marginLeft = "250px";
        document.getElementById("MainPage").style.width = "83.7%";
        document.getElementById("MainPage").style.transitionDuration = "0.1s";
      } else {
        document.getElementById("PageSidebar").style.width = "0";
        document.getElementById("MainPage").style.marginLeft = "0";
        document.getElementById("MainPage").style.width = "100%";
        document.getElementById("MainPage").style.transitionDuration = "0.1s";
      }
    }

    this.setState({
      sideBarOpen: !this.state.sideBarOpen
    });
  };

  render() {
    if (!this.props.currentUser) {
      return <div />;
    }
    return (
      <div className="pageHeaderBox">
        <div className="pageHeaderToggleBox">
          <button class="sideBarToggleButton" onClick={this.toggleSideBarMenu}>
            ☰
          </button>
        </div>

        <div className="pageHeaderTitleBox">
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
      </div>
    );
  }
}

export default PageHeader;
