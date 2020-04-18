import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
    // const location = useLocation();
    // console.log("location.pathname");
    // console.log(location.pathname);
    // console.log("process.env.PUBLIC_URL");
    // console.log(process.env.PUBLIC_URL);
    return (
        <div className="row" id="headerRow">
            <div className="col-md-6 col-12 justify-content-center d-flex justify-content-md-start">
                <h2 id="logo">COVID-19 and Disaster Tracker</h2>
            </div>
            <div className="col-md-6 col-12" id="navbar">
                <div className="nav justify-content-center justify-content-md-end" id="navlist">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Log In
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/signup"} className="nav-link">
                                Create Account
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/news"} className="nav-link">
                                Current COVID-19 News
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
  }
  
  export default Header;
  