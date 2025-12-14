// src/Dashboard/DynamicDashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DynamicDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === "hr") {
      navigate("assets", { replace: true }); // Relative
    } else {
      navigate("my-assets", { replace: true }); // Relative
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return <p>Redirecting to dashboard...</p>;
};

export default DynamicDashboard;
