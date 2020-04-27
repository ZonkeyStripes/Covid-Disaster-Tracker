import React, { Component } from "react";
import Axios from "axios";
import {Link} from "react-router-dom"
import $ from "jquery";

class Login extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggleEye = this.toggleEye.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  toggleEye() {
    $("#eye").toggleClass("fa-eye-slash");
    $("#eye").toggleClass("fa-eye");
    if ($("#eye").hasClass("fa-eye")){
      $("#password").attr("type", "text");
    } else {
      $("#password").attr("type", "password");
    }
  }

  handleChange(evt) {
    $("#li-error").hide();
    const value = evt.target.value;
    console.log(evt.target.name);
    
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    
    Axios.post("/api/login", {
      email: this.state.username,
      password: this.state.password
    })
    .then((data) => {
      console.log("data: ");
      let firstTime = data.data.ftu;
      console.log(firstTime);
      // if user is a first time user, push to FTU page, otherwise to dashboard
      if(firstTime) {
        this.props.history.push("/ftu");
        window.location.reload();
      } else {
        this.props.history.push("/dashboard");
        window.location.reload();
      }

    })
    .catch(function(err) {
      console.log("Error");
      console.log(err);
      $("#li-error").show().html("<strong>Error:</strong> Incorrect email or password");
      // alert(err.message);
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="container" id="login-body">
        <div className="row mt-4">
          <div className="col-md-5 text-center mx-auto">
            <div className="card su-card">
              <div className="card-body">
                <h4 className="pb-2 signup-header">Log In</h4>
                <form onSubmit={this.handleSubmit}>
  
                  {/* EMAIL */}
                  <div className="input-group my-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text pre-inp">
                        <i className="far fa-envelope"></i>
                      </span>
                    </div>
                    <input type="email" name="username" value={this.state.username} 
                    onChange={this.handleChange}        className="form-control su-inp" id="email" placeholder="Email"/>
                  </div>
  
                  {/* PASSWORD */}
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text pre-inp">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control su-inp" id="password" name="password" value={this.state.password} onChange={this.handleChange}placeholder="Password" autoComplete="off"/>
                    <div className="input-group-append">
                      <span className="input-group-text" id="eye-cont">
                        <i className="fas fa-eye-slash" id="eye" onClick={this.toggleEye}></i>
                      </span>
                    </div>
                  </div>
                  <div id="li-error" className="alert alert-danger">alert</div>
  
                  <p className="text-muted">
                    Don't have an account? Sign up <Link to={"/signup"}>here!</Link>
                  </p>
                  <button type="submit" className="btn form-btn">Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  }
  
  export default Login;