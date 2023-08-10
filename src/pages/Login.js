
import React, { useState } from 'react';
// import "./style.css";

import { useNavigate } from "react-router-dom";





const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const users = [{ email: "bkc@gmail.com", password: "testpassword" }];

  const routeChange = () => {
    window.location.href = "/Login";
}







  const validateEmail = (email) => {
    // Regex pattern to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regex pattern to validate password format (at least 6 characters)
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

     // Perform validation
     if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Set errors, or submit the form if no errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
    //  'Submit the form'
      // ...

    }



    const account = users.find((user) => user.email === email);
    if (account && account.password === password) {
        setauthenticated(true)
        localStorage.setItem("authenticated", true);
        alert("successfully.....");
        navigate("/dashboard");

            // history.push('/dashboard')

    }




  };




return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign in</h3>
            <div className="form-group mt-3">
              {/* <label></label> */}
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <span style={{color:"red"}}>{errors.email} </span>}


            </div>
            <div className="form-group mt-3">
              {/* <label></label> */}
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span style={{color:"red"}}>{errors.password} </span>}


            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={{handleSubmit}}>
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  export default Login;


