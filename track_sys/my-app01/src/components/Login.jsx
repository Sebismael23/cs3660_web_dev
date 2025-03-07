// // import {useState} from "react";
// import { useState, useEffect, useContext } from "react";
// import {Navigate, useNavigate} from "react-router-dom"
// import { AuthContext } from "./context/AuthContext";
// import MainLayout from "../layouts/MainLayout";


// function Login()  {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("")
//     const {isLoggedIn, login} = useContext(AuthContext);
//     const navigate = useNavigate();


//     useEffect(() => {
//         if (isLoggedIn) {
//             navigate("/admin");
//         }
//     }, [isLoggedIn, navigate])

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (!email || !password)
//         {
//             setError("Both fields are required");
//             return;
//         }

//         if (login(email, password))
//             navigate("/admin");
//         else
//             setError("Invalid email or password");
//     };

//     return (
//         <MainLayout title="Login | MyPage">
//             <div className="card shadow-lg col-sm-6 col-md-3 p-4">
//                 <h3 className="text-center mb-4">Login</h3>
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label className="form_label">Email Address</label>
//                         <input 
//                             type="email"   
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter email" 
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Password</label>
//                         <input 
//                             type="password"    
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter password" />
//                     </div>
//                     <button type = "submit" className="btn btn-primary w-100">Login</button>
//                 </form>
//             </div>
//         </MainLayout>
//     )
// }

// export default Login;


// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext";
// import MainLayout from "../layouts/MainLayout";

// function Login() {
//   // Toggle state: true for sign in, false for sign up
//   const [isSignIn, setIsSignIn] = useState(true);

//   // Common fields for both forms (email, password)
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // Extra field for sign up
//   const [name, setName] = useState("");

//   const [error, setError] = useState("");

//   // Assuming AuthContext provides both login and register functions
//   const { isLoggedIn, login, register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate("/admin");
//     }
//   }, [isLoggedIn, navigate]);

//   // Handler for sign in
//   const handleSignIn = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Both email and password are required.");
//       return;
//     }
//     if (login(email, password)) {
//       navigate("/admin");
//     } else {
//       setError("Invalid email or password.");
//     }
//   };

//   // Handler for sign up
//   const handleSignUp = (e) => {
//     e.preventDefault();
//     if (!name || !email || !password) {
//       setError("All fields are required for registration.");
//       return;
//     }
//     if (register(name, email, password)) {
//       navigate("/admin");
//     } else {
//       setError("Registration failed.");
//     }
//   };





import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import MainLayout from "../layouts/MainLayout";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignIn) {
      // Login
      if (!email || !password) {
        setError("Both fields are required");
        return;
      }
      if (login(email, password)) {
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }
    } else {
      // Signup 
      if (!name || !email || !password || !confirmPassword) {
        setError("All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (signup(name, email, password)) {
        navigate("/admin");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <MainLayout title="Login | MyPage">
      <div className="log">
        <div className={`auth-container position-relative overflow-hidden rounded-3 shadow-lg mx-auto my-5 ${!isSignIn ? 'right-panel-active' : ''}`}>
          {/* Sign In Form */}
          <div className="form-container sign-in position-absolute top-0 h-100 w-50 p-4">
            <form onSubmit={handleSubmit} className="auth-form d-flex flex-column gap-3">
              <h2 className="text-center mb-3">Sign In</h2>
              {error && isSignIn && <div className="alert alert-danger">{error}</div>}
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>
          </div>

          {/* Sign Up Form */}
          <div className={`form-container sign-up position-absolute top-0 h-100 w-50 p-4 ${!isSignIn ? 'active' : 'inactive'}`}>
            <form onSubmit={handleSubmit} className="auth-form d-flex flex-column gap-3">
              <h2 className="text-center mb-3">Create Account</h2>
              {error && !isSignIn && <div className="alert alert-danger">{error}</div>}
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
          </div>

          {/* Overlay Container */}
          <div className={`overlay-container position-absolute top-0 start-50 h-100 w-50 ${!isSignIn ? 'right-panel-active' : ''}`}>
            <div className="overlay h-100 position-relative bg-primary">
              <div className="overlay-panel overlay-left position-absolute d-flex flex-column align-items-center justify-content-center text-center p-4">
                <h2>Welcome Back!</h2>
                <p className="my-3">Already have an account? If yes, please login with your personal info</p>
                <button className="ghost btn btn-outline-light" onClick={() => setIsSignIn(true)}>Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right position-absolute d-flex flex-column align-items-center justify-content-center text-center p-4">
                <h2>Hello!</h2>
                <p className="my-3">Enter your personal details and start journey with us</p>
                <button className="ghost btn btn-outline-light" onClick={() => setIsSignIn(false)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Login;