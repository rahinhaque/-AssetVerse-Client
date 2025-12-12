import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiEye, FiEyeOff } from "react-icons/fi";

const HrProfile = () => {
  const { user } = useAuth(); // logged-in HR user
  const axiosSecure = useAxiosSecure();
  const [hrData, setHrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch HR profile data
  useEffect(() => {
    const fetchHrData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/hr/${user?.email}`);
        setHrData(res.data.user || res.data);
      } catch (err) {
        console.error("Failed to fetch HR data", err);
        setHrData(user); // fallback to auth data
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchHrData();
  }, [user]);

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;
  if (!hrData) return <p className="p-6 text-center">No profile data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      {/* HEADER */}
      <div className="flex items-center gap-6 mb-6">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full border border-gray-300 overflow-hidden">
            <img
              src={hrData.companyLogo || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="Company Logo"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{hrData.name}</h1>
          <p className="text-gray-600">{hrData.companyName}</p>
          <p className="text-sm text-gray-500">
            Joined: {new Date(hrData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* PROFILE INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CONTACT INFO */}
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Contact Info</h2>
          <p>
            <strong>Email:</strong> {hrData.email}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(hrData.dateOfBirth).toLocaleDateString()}
          </p>
        </div>

        {/* ROLE & SUBSCRIPTION */}
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Role & Subscription</h2>
          <p>
            <strong>Role:</strong> {hrData.role}
          </p>
          <p>
            <strong>Subscription:</strong> {hrData.subscription}
          </p>
          <p>
            <strong>Package Limit:</strong> {hrData.packageLimit}
          </p>
          <p>
            <strong>Current Employees:</strong> {hrData.currentEmployees}
          </p>
        </div>

        {/* SECURITY / PASSWORD */}
        <div className="p-4 border rounded-lg md:col-span-2">
          <h2 className="font-semibold mb-2">Security</h2>
          <div className="flex items-center gap-2">
            <span>
              <strong>Password:</strong>{" "}
              {showPassword ? hrData.password : "********"}
            </span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrProfile;
