import React, { Component} from 'react';

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                 <div className="navbar-brand">CSI Interfusion Sdn. Bhd.</div>
                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Booking</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Projector</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Meeting Room</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Staff Profile</a>
                        </li>
                    </ul>
                 </div>
            </nav>
        );
    }
}

export default Menu;