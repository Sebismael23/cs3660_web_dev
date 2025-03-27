// components/admin/Admin.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AdminLayout from "../../layouts/AdminLayout";
// import DashboardStats from "./DashboardStats"; // Create these sub-components
// import RecentActivity from "./RecentActivity";
// import QuickActions from "./QuickActions";

const Admin = () => {
const { isloggedin} = useContext(AuthContext);
  const navigate = useNavigate();

  // Optional: Additional protection layer
  useEffect(() => {
    if (!isloggedin) {
      navigate("/login");
    }
  }, [isloggedin, navigate]);

  // Show loading state while checking auth
 
  return (
    <AdminLayout>
      <div className="admin-content">
        <h1>Hiiiiiiiiiiiiiii</h1>    
      </div>
    </AdminLayout>
  );
};

export default Admin;