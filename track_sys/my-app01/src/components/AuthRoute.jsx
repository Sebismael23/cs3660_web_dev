import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const AuthRoute = () => {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn === null) {
        // Show loading spinner or skeleton while checking auth status
        return <div>Loading...</div>;
    }

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AuthRoute;