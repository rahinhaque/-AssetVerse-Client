import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.dateOfBirth
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const employeeData = {
      ...formData,
      role: "employee",
    };

    try {
      setLoading(true);

      const res = await axiosSecure.post("/register/employee", employeeData);

      if (!res.data) {
        setError("Unexpected server response");
        return;
      }

      const employeeUser = res.data; 

      setSuccess("Employee registered successfully!");

      
      setUser(employeeUser);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Join as <span className="text-primary">Employee</span>
          </h2>

          {error && <p className="text-error text-sm mb-2">{error}</p>}
          {success && <p className="text-success text-sm mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Date of Birth</label>
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
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register as Employee"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Employees are linked to companies after approval
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
