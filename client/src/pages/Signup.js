import React from 'react'
import {Link} from "react-router-dom"
import $ from "jquery";

const Signup = () => {

  const onUserSubmit = e => {
    e.preventDefault();
    let passwordVal = $("#password").val();
    let confirmPasswordVal = $("#confirmPassword").val();
    if ( passwordVal !== confirmPasswordVal){
      alert("Passwords do not match")
    }
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-5 text-center mx-auto">
          <div className="card" id="su-card">
            <div className="card-body">
              <h4 id="signup-header" className="pb-2">Sign Up</h4>
              <form onSubmit={onUserSubmit}>

                {/* EMAIL */}
                <div className="input-group my-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text pre-inp">
                      <i class="far fa-envelope"></i>
                    </span>
                  </div>
                  <input type="text" className="form-control su-inp" id="email" placeholder="Email"/>
                </div>

                {/* PASSWORD */}
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text pre-inp">
                      <i class="fas fa-key"></i>
                    </span>
                  </div>
                  <input type="password" className="form-control su-inp" id="password" placeholder="Password"/>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text pre-inp">
                      <i class="fas fa-shield-alt"></i>
                    </span>
                  </div>
                  <input type="password" className="form-control su-inp" id="confirmPassword" placeholder="Confirm Password"/>
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
}

export default Signup;