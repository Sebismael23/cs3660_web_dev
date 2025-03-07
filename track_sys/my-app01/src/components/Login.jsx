// import {useState} from "react";
import { useState, useEffect, useContext } from "react";
import {Navigate, useNavigate} from "react-router-dom"
import { AuthContext } from "./context/AuthContext";
import MainLayout from "../layouts/MainLayout";


function Login()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const {isLoggedIn, login} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (isLoggedIn) {
            navigate("/admin");
        }
    }, [isLoggedIn, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password)
        {
            setError("Both fields are required");
            return;
        }

        if (login(email, password))
            navigate("/admin");
        else
            setError("Invalid email or password");
    };

    return (
        <MainLayout title="Login | MyPage">
            <div className="card shadow-lg col-sm-6 col-md-3 p-4">
                <h3 className="text-center mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form_label">Email Address</label>
                        <input 
                            type="email"   
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email" 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password"    
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password" />
                    </div>
                    <button type = "submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </MainLayout>
    )
}

export default Login;