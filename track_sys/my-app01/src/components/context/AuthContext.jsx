import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        let storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                storedToken = JSON.parse(storedToken);
                const expirationTime = Number(storedToken.expiration); // Ensure it's a number
                
                if (expirationTime < new Date().getTime()) {
                    logout(); // ✅ Corrected function call
                } else {
                    setIsLoggedIn(true);
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Error parsing token:", error);
                logout(); // Clear invalid token
            }
        }
    }, []);

    // const login = (username, password) => {
    //     const now = new Date();
    //     const expiration = now.getTime() + 60 * 60 * 1000; // 1 hour from now
    //     const fakeToken = { username, password, expiration };

    //     localStorage.setItem("token", JSON.stringify(fakeToken));
    //     setToken(fakeToken);
    //     setIsLoggedIn(true);
    //     return true;
    // };

    const login = async (username, password) => {
        return new Promise((resolve) => {
          // Simulate API call
          setTimeout(() => {
            const expiration = Date.now() + 3600000;
            const fakeToken = { username, expiration };
            localStorage.setItem("token", JSON.stringify(fakeToken));
            setToken(fakeToken);
            setIsLoggedIn(true);
            resolve(true);
          }, 500);
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
