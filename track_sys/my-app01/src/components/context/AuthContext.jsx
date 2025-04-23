import { createContext, useState, useEffect } from "react";
import { authService } from "../../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const checkAuth = async () => {
                try {
                    const { success, data } = await authService.getProfile();
                    console.log("Auth check:", success, data);
                    if (success) {
                        setIsLoggedIn(true);
                        setUser(data);
                    } else {
                        logout(); // invalid token
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    logout();
                }
            };
            checkAuth();
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { success, data } = await authService.login(email, password);
            console.log("Login:", success, data);
            if (success) {
                localStorage.setItem("token", data.token); // store token
                setIsLoggedIn(true);
                setUser(data.user);
                return true;
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
        return false;
    };

    const signup = async (name, email, password) => {
        try {
            const { success } = await authService.register({ name, email, password });
            console.log("Signup:", success);
            if (success) {
                return await login(email, password); // auto-login
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("token");
        authService.logout(); // optional depending on backend
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
