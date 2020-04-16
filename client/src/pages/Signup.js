import React, { Component } from "react";
import Axios from "axios";



class Signup extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  sayHello() {
    alert('Hello!');
  }

  // handleChange(event) {
  //   console.log("handleChange is called");
  //   console.log("e.t = ");
  //   console.log(event.target);
  //   this.setState({
  //     username: event.target.username,
  //     password: event.target.password
  //   });
  // }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }



  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    
    Axios.post("/api/signup", {
      email: this.state.username,
      password: this.state.password
    })
      .then(function(data) {
        console.log("data: ");
        console.log(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
  }
  

  render() {
      return (
        <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h2>Sign Up Form</h2>
            <form className="signup" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Email"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
                {/* <input type="password" className="form-control" id="password-input" placeholder="Password" /> */}
              </div>
              {/* <div style="display: none" id="alert" className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span> <span className="msg"></span>
              </div> */}
              <input type="submit" value="Create Account" />
            </form>
            <br />
            <p>Or log in <a href="/login">here</a></p>

            <button onClick={this.sayHello}>
              Click me!
            </button>

          </div>
        </div>
      </div>
      );
    }
  }
  
  export default Signup;