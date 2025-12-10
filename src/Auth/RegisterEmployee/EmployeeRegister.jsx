import { useState } from "react";

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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

    // Final payload (ready for backend later)
    const employeeData = {
      ...formData,
      role: "employee",
    };

    console.log("Employee Register Data:", employeeData);

    setSuccess("Employee registered successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
    });
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
                placeholder="Enter your full name"
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
                placeholder="personal@email.com"
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
                placeholder="Minimum 6 characters"
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
              Register as Employee
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Employees are affiliated with companies after approval
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
