import React from 'react'
import {Link} from "react-router-dom"
import $ from "jquery";

const Login = () => {
  
  const toggleEye = () => {
    $("#eye").toggleClass("fa-eye-slash");
    $("#eye").toggleClass("fa-eye");
    if ($("#eye").hasClass("fa-eye")){
      $("#password").attr("type", "text");
    } else {
      $("#password").attr("type", "password");
    }
  }

  const onUserSubmit = e => {
    e.preventDefault();
    // Validation will be here
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-5 text-center mx-auto">
          <div className="card" id="su-card">
            <div className="card-body">
              <h4 id="signup-header" className="pb-2">Log In</h4>
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
                  <input type="password" className="form-control su-inp" id="password" placeholder="Password" autoComplete="off"/>
                  <div className="input-group-append">
                    <span className="input-group-text" id="eye-cont">
                      <i class="fas fa-eye-slash" id="eye" onClick={toggleEye}></i>
                    </span>
                  </div>
                </div>

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
  )
}

export default Login;