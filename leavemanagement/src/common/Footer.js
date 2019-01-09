import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.footerMessage = `Copyright @copy 2018 CSI Interfusion Sdn. Bhd.`;
  }

  render() {
    const footerStyle = {
      align: "center",
      textAlign: "center",
      marginTop: 20
    };

    return (
      <div className="card" style = { footerStyle }>
        <div className="card-header">
          { this.footerMessage }
        </div>
      </div>
    );
  }
}

export default Footer;




