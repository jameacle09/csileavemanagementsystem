import React, { Component } from "react";
import "./Styles.css";

class PageFooter extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.footerMessage = `CSI Interfusion Sdn. Bhd. All rights reserved.`;
  }
  render() {
    return (
      <div className="footerContainer">
        <span className="footerText">
          Copyright &copy; {new Date().getFullYear()} {this.footerMessage}
        </span>
      </div>
    );
  }
}

export default PageFooter;
