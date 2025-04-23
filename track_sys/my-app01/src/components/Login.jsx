import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import MainLayout from "../layouts/MainLayout";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = location.state?.from || '/admin/dashboard';
      navigate(redirectPath);
    }
  }, [isLoggedIn, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        // Login
        if (!email || !password) {
          setError("Both fields are required");
          setLoading(false);
          return;
        }
        const success = await login(email, password);
        if (success) {
          navigate("/admin/dashboard");
        } else {
          setError("Invalid email or password");
        }
      } else {
        // Signup 
        if (!name || !email || !password || !confirmPassword) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }
        const success = await signup(name, email, password);
        if (success) {
          navigate("/admin/dashboard");
        } else {
          setError("Registration failed");
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
                disabled={loading}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
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
                disabled={loading}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* Overlay Container */}
          <div className={`overlay-container position-absolute top-0 start-50 h-100 w-50 ${!isSignIn ? 'right-panel-active' : ''}`}>
            <div className="overlay h-100 position-relative bg-primary">
              <div className="overlay-panel overlay-left position-absolute d-flex flex-column align-items-center justify-content-center text-center p-4">
                <h2>Welcome Back!</h2>
                <p className="my-3">Already have an account? If yes, please login with your personal info</p>
                <button 
                  className="ghost btn btn-outline-light" 
                  onClick={() => setIsSignIn(true)}
                  disabled={loading}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right position-absolute d-flex flex-column align-items-center justify-content-center text-center p-4">
                <h2>Hello!</h2>
                <p className="my-3">Enter your personal details and start journey with us</p>
                <button 
                  className="ghost btn btn-outline-light" 
                  onClick={() => setIsSignIn(false)}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
