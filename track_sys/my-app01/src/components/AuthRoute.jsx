import { useContext, React } from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";

const AuthRoute = () => {
    const {isloggedin} = useContext(AuthContext);
    return isloggedin ? <Outlet /> : <Navigate to="/login"/>
}

export default AuthRoute;