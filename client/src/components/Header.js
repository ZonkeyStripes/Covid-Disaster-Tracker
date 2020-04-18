import React from "react";
import { NavLink } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import logo from "../assets/dt-logo-.png"

const Header = () => {
    return (
      // <ReactBootStrap.Navbar id="nav" collapseOnSelect expand="lg" bg="light" variant="light">
      <ReactBootStrap.Navbar id="header" collapseOnSelect expand="lg" variant="dark">
        <ReactBootStrap.Navbar.Brand href="#/">
          <img src={logo} alt="logo"/>
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="ml-auto">
            <ReactBootStrap.Nav.Link>
              <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/"}>Home</NavLink>
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link>
              <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/news"}>News</NavLink>
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link>
              <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/kit"}>Disaster Kit</NavLink>
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        <ReactBootStrap.Nav className="ml-auto">
          <ReactBootStrap.Nav.Link eventKey={2} href="#login">
            <ReactBootStrap.Button id="li-btn">Log In</ReactBootStrap.Button>
          </ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link eventKey={3} href="#signup">
            <ReactBootStrap.Button id="su-btn">Sign Up</ReactBootStrap.Button>
          </ReactBootStrap.Nav.Link>
        </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    )
  }



// function Header() {
//     return (
//         <div className="row" id="headerRow">
//             <div className="col-md-6 col-12 justify-content-center d-flex justify-content-md-start">
//                 <h2 id="logo">COVID-19 and Disaster Tracker</h2>
//             </div>
//             <div className="col-md-6 col-12" id="navbar">
//                 <div className="nav justify-content-center justify-content-md-end" id="navlist">
//                     <ul className="nav">
//                         <li className="nav-item">
//                             <Link to={"/dashboard"} className="nav-link">
//                                 Dashboard
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to={"/"} className="nav-link">
//                                 Home
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to={"/login"} className="nav-link">
//                                 Log In
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to={"/signup"} className="nav-link">
//                                 Create Account
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to={"/news"} className="nav-link">
//                                 Current Covid News
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
//   }
  
  export default Header;
  