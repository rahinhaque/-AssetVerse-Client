import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const [error, setError] = useState("");
  const [role, setRole] = useState("hr"); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const endpoint = role === "hr" ? "/login/hr" : "/login/employee";

    try {
      const res = await axiosSecure.post(endpoint, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("role", role);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="hr">HR Manager</option>
              <option value="employee">Employee</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <button className="btn btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
