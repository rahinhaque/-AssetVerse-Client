import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EmployeeRegister = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.dateOfBirth
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosSecure.post("/register/employee", formData);

      if (res.data.success) {
        const employeeUser = res.data.user;

        setSuccess("Employee registered successfully!");
        setUser(employeeUser);
        navigate("/"); // or "/dashboard" based on your route
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Join as <span className="text-primary">Employee</span>
          </h2>

          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="alert alert-success shadow-lg mb-4">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Date of Birth</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-8"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Registering...
                </>
              ) : (
                "Register as Employee"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content opacity-70 mt-6">
            You will be able to join your company after an HR approves your
            asset request.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
