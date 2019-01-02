import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const footerStyle = {
      textAlign: "center",
      paddingTop: 60
    };
    return (
      <div className="card" align="center" style = { footerStyle }>
        <div className="card-header">
          Copyright © 2019 CSI Interfusion Sdn. Bhd.
        </div>
      </div>
    );
  }
}

export default Footer;




