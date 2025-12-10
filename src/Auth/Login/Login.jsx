import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axiosSecure.post("/login/hr", { email, password });
      if (response.data.success) {
        localStorage.setItem("hrUser", JSON.stringify(response.data.hr));
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Login as <span className="text-primary">HR Manager</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                required
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                required
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button type="submit" className="btn btn-primary w-full mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
