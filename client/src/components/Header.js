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
              <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/sources"}>Sources</NavLink>
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
  
export default Header;
 
