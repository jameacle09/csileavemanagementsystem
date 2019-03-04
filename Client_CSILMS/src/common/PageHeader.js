import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBarHeader.css";

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false
    };
  }
  toggleSideBarMenu = e => {
    if (!this.state.isSideBarOpen) {
      document.getElementById("PageSidebar").style.width = "250px";
      document.getElementById("MainPage").style.marginLeft = "250px";
      document.getElementById("MainPage").style.width = "83.7%";
      document.getElementById("MainPage").style.transitionDuration = "0.3s";
    } else {
      document.getElementById("PageSidebar").style.width = "0";
      document.getElementById("MainPage").style.marginLeft = "0";
      document.getElementById("MainPage").style.width = "100%";
      document.getElementById("MainPage").style.transitionDuration = "0.3s";
    }
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen
    });
  };

  render() {
    if (!this.props.currentUser) {
      return <div />;
    }
    return (
      <div className="pageHeaderBox">
        <div className="pageHeaderToggleBox">
          <button
            class="sideBarToggleButton"
            onClick={event => this.toggleSideBarMenu(event)}
          >
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
