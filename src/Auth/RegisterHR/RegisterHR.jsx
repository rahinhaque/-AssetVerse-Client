
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const RegisterHR = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    companyLogo: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axiosSecure.post("/register/hr", {
        ...formData,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      });

     
      if (!response.data) {
        setError("Unexpected server response");
        return;
      }

      const hrUser = response.data;

     
      setUser(hrUser);

      setSuccess("HR Registered successfully!");

     
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Register as <span className="text-primary">HR Manager</span>
          </h2>

          {error && <p className="text-error mb-2">{error}</p>}
          {success && <p className="text-success mb-2">{success}</p>}

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
              <label className="label">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Company Logo URL</label>
              <input
                type="text"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                className="input input-bordered w-full"
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

            <button type="submit" className="btn btn-primary w-full mt-2">
              Register HR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterHR;
