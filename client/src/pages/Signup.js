import React, { Component } from "react";
import Axios from "axios";
import {Link} from "react-router-dom"
import $ from "jquery";

class Signup extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      pwconfirm: ""
    };
  }

  sayHello() {
    alert('Hello!');
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
    $("#pw-error").hide();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.username || !this.state.password || !this.state.pwconfirm){
      $("#pw-error").show().html("<strong>Error:</strong> Please fill out every field");
    } else if (this.state.password !== this.state.pwconfirm){
      $("#pw-error").show().html("<strong>Error:</strong> Passwords do not match");
    } else {
      console.log(this.state.username);
      console.log(this.state.password);
      
      Axios.post("/api/signup", {
        email: this.state.username,
        password: this.state.password
      })
      .then((data) => {
        console.log(data);
        Axios.post("/api/default_disasterkit", {
          uid: data.data.id
        })
        .then((kit_res) => {
          Axios.post("/api/login", {
            email: this.state.username,
            password: this.state.password
          })
          .then((response) => {
            console.log("data: ");
            console.log(data);
            this.props.history.push("/ftu");
            window.location.reload();
          });
        })


        // If there's an error, handle it by throwing up a bootstrap alert
      })
    }
  }
  

  render() {
    return (
      <div className="container" id="signup-body">
        <div className="row mt-4">
          <div className="col-md-5 text-center mx-auto">
            <div className="card su-card">
              <div className="card-body">
                <h4 className="pb-2 signup-header">Sign Up</h4>
                <form onSubmit={this.handleSubmit}>
  
                  {/* EMAIL */}
                  <div className="input-group my-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text pre-inp">
                        <i class="far fa-envelope"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control su-inp" id="email" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Email"/>
                  </div>
  
                  {/* PASSWORD */}
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text pre-inp">
                        <i class="fas fa-key"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control su-inp" id="password" name="password" value={this.state.password} onChange={this.handleChange}placeholder="Password"/>
                  </div>
  
                  {/* CONFIRM PASSWORD */}
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text pre-inp">
                        <i class="fas fa-shield-alt"></i>
                      </span>
                    </div>
                    <input type="password" className="form-control su-inp" id="confirmPassword" name="pwconfirm" value={this.state.pwconfirm} onChange={this.handleChange} placeholder="Confirm Password"/>
                  </div>
                  <div id="pw-error" className="alert alert-danger"></div>
  
                  <p className="text-muted">
                    Already have an account? Sign in <Link to={"/login"}>here!</Link>
                  </p>
                  <button type="submit" className="btn form-btn">Register</button>         
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  }
  
export default Signup;
