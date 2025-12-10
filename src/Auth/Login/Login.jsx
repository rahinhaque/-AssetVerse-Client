import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { useNavigate } from "react-router";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/"); 
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            Login to <span className="text-primary">AssetVerse</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                required
                className="input input-bordered w-full"
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button className="btn btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
