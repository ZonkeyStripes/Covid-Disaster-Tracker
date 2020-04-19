import React from 'react'
import {Link} from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import logo from "../dt-logo-.png"

const Navbar = () => {
  return (
    <ReactBootStrap.Navbar id="nav" collapseOnSelect expand="lg" variant="dark">
      <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
      <ReactBootStrap.Nav className="mx-auto">
        <ReactBootStrap.Nav.Link eventKey={2} href="#login">
          <div className="navLink">Home</div>
        </ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link  eventKey={3} href="#signup">
          <div className="navLink">Articles</div>
        </ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link eventKey={4} href="#signup">
          <div className="navLink">Sources</div>
        </ReactBootStrap.Nav.Link>
      </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
  )
}

export default Navbar;