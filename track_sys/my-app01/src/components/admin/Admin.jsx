import { useContext, React } from "react";
import {Navigate, Outlet} from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
// import AdminLayout from "../layouts/AdminLayout"

const Admin = () => {
    const {isloggedin} = useContext(AuthContext);
    return isloggedin ? <Outlet /> : <Navigate to="/login"/>
}

export default Admin;