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

    if ( this.state.password !== this.state.pwconfirm){
      alert("Passwords do not match")
    } else {
      console.log(this.state.username);
      console.log(this.state.password);
      
      Axios.post("/api/signup", {
        email: this.state.username,
        password: this.state.password
      })
      .then((data) => {
        Axios.post("/api/login", {
          email: this.state.username,
          password: this.state.password
        })
        .then((response) => {
          console.log("data: ");
          console.log(data);
          this.props.history.push("/ftu");
        });

        // If there's an error, handle it by throwing up a bootstrap alert
      })
    }
  }
  

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-5 text-center mx-auto">
            <div className="card" id="su-card">
              <div className="card-body">
                <h4 id="signup-header" className="pb-2">Sign Up</h4>
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
  
                  <p className="text-muted">
                    Already have an account? Sign in <Link to={"/login"}>here</Link>
                  </p>
                  <button type="submit" className="btn form-btn">Register</button>         
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
      // return (
      //   <div className="container">
      //   <div className="row">
      //     <div className="col-md-6 col-md-offset-3">
      //       <h2>Sign Up Form</h2>
      //       <form className="signup" onSubmit={this.handleSubmit}>
      //         <div className="form-group">
      //           <label htmlFor="exampleInputEmail1">Email address</label>
      //           <input type="email" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Email"/>
      //         </div>
      //         <div className="form-group">
      //           <label htmlFor="exampleInputPassword1">Password</label>
      //           <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
      //           {/* <input type="password" className="form-control" id="password-input" placeholder="Password" /> */}
      //         </div>
      //         {/* <div style="display: none" id="alert" className="alert alert-danger" role="alert">
      //           <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      //           <span className="sr-only">Error:</span> <span className="msg"></span>
      //         </div> */}
      //         <input type="submit" value="Create Account" />
      //       </form>
      //       <br />
      //       <p>Or log in <a href="/login">here</a></p>

      //       <button onClick={this.sayHello}>
      //         Click me!
      //       </button>

      //     </div>
      //   </div>
      // </div>
      // );
    }
  }
  
  export default Signup;