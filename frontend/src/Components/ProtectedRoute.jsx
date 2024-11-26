import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { toast, ToastContainer } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    toast.error('login now')
    return <Navigate to="/login" />;
  }

  // Render the children (protected component) if user is logged in
  return children;
};

export default ProtectedRoute;
