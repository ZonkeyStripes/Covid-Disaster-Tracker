import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import logo from "../assets/dt-logo-.png";
import Axios from "axios";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    Axios.get("/api/user_data").then((data) => {
      setLoggedIn(true);
    }).catch((err) => {
      setLoggedIn(false);
    });
  }, []);

  const handleLogout = () => {
    Axios.post("/logout")
    .then(() => {
      setLoggedIn(false);
      window.location.reload();
    })
    .catch((err) => {
      window.location.reload();
    });
  };

  if (loggedIn){
    return (
      <ReactBootStrap.Navbar id="header" collapseOnSelect expand="lg" variant="dark sticky-nav">
        <ReactBootStrap.Navbar.Brand href="#/">
          <img src={logo} alt="logo"/>
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="ml-auto">
            <div className="link-container">
              <ReactBootStrap.Nav.Link>
                <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/"}>Home</NavLink>
              </ReactBootStrap.Nav.Link>
            </div>
            <div className="link-container">
              <ReactBootStrap.Nav.Link>
                <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/news"}>News</NavLink>
              </ReactBootStrap.Nav.Link>
            </div>
            <div className="link-container">
              <ReactBootStrap.Nav.Link>
                <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/dashboard"}>Dashboard</NavLink>
              </ReactBootStrap.Nav.Link>
            </div>
            <div className="link-container">
              <ReactBootStrap.Nav.Link>
                <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/disasters"}>Disasters</NavLink>
              </ReactBootStrap.Nav.Link>
            </div>
            <div className="link-container">
              <ReactBootStrap.Nav.Link>
                <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/kit"}>Disaster Kit</NavLink>
              </ReactBootStrap.Nav.Link>
            </div>
          </ReactBootStrap.Nav>
        <ReactBootStrap.Nav className="ml-auto header-btns-container">
          <ReactBootStrap.Nav.Link onClick={handleLogout} eventKey={4} href="#/">
            <ReactBootStrap.Button id="su-btn">Log Out</ReactBootStrap.Button>
          </ReactBootStrap.Nav.Link>
        </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    )
  } else {
      return (
        <ReactBootStrap.Navbar id="header" collapseOnSelect expand="lg" variant="dark sticky-nav">
          <ReactBootStrap.Navbar.Brand href="#/">
            <img src={logo} alt="logo"/>
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="ml-auto">
              <div className="link-container">
                <ReactBootStrap.Nav.Link>
                  <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/"}>Home</NavLink>
                </ReactBootStrap.Nav.Link>
              </div>
              <div className="link-container">
                <ReactBootStrap.Nav.Link>
                  <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/news"}>News</NavLink>
                </ReactBootStrap.Nav.Link>
              </div>
              <div className="link-container">
                <ReactBootStrap.Nav.Link>
                  <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/disasters"}>Disasters</NavLink>
                </ReactBootStrap.Nav.Link>
              </div>
              <div className="link-container">
                <ReactBootStrap.Nav.Link>
                  <NavLink exact={true} className="header-link" activeClassName="header-link-active" to={"/kit"}>Disaster Kit</NavLink>
                </ReactBootStrap.Nav.Link>
              </div>
            </ReactBootStrap.Nav>
          <ReactBootStrap.Nav className="ml-auto header-btns-container">
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
}
  
export default Header;