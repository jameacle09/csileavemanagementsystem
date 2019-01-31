import React, { Component } from "react";
import "./Styles.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.footerMessage = `CSI Interfusion Sdn. Bhd. All rights reserved.`;
  }

  render() {
    return (
      <div height="38px">
        <div className="footerContainer">
          <span className="footerText">
            Copyright &copy; {new Date().getFullYear()} {this.footerMessage}
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
