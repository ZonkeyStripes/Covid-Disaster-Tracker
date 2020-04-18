import React, { Component } from "react";
import Axios from "axios";

class Login extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(evt) {
    const value = evt.target.value;
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
      console.log(data);
      console.log(this);
      this.props.history.push("/dashboard");
      alert("Logged In");
    })
    .catch(function(err) {
      console.log("Error");
      console.log(err);
      alert(err.message);
    });
  }

  render() {
    console.log(this.props);
      return (
        <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h2>Login Form</h2>
            <form className="login" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" 
                id="email-input" name="username" value={this.state.username} 
                onChange={this.handleChange} placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password-input"
                name="password" value={this.state.password} onChange={this.handleChange}
                placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-default">Login</button>
            </form>
            <br />
            <p>Or sign up <a href="/">here</a></p>
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default Login;