import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Fetch packages from backend
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/packages");

      // Handle both possible response shapes
      const data = res.data.success ? res.data.data : res.data;
      setPackages(data || []);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSelect = (pkg) => setSelectedPackage(pkg);

  const handleUpgrade = async () => {
    if (!selectedPackage) return alert("Select a package first");

    try {
      const res = await axiosSecure.post("/stripe/create-checkout-session", {
        packageName: selectedPackage.name,
      });
      if (res.data.url) {
        window.location.href = res.data.url; // redirect to Stripe checkout
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create payment session ❌");
    }
  };

  if (loading) return <p className="p-6">Loading packages...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Choose Your <span className="text-primary">Package</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id || pkg.name}
            className={`p-5 border rounded-lg cursor-pointer transition-all ${
              selectedPackage?.name === pkg.name
                ? "border-primary bg-base-200 shadow-md"
                : "border-gray-300 hover:shadow-lg"
            }`}
            onClick={() => handleSelect(pkg)}
          >
            <h3 className="font-bold text-xl mb-2 text-primary">{pkg.name}</h3>
            <p className="mb-1">Employee Limit: {pkg.employeeLimit}</p>
            <p className="mb-2">Price: ${pkg.price}/month</p>

            <ul className="list-disc list-inside text-sm space-y-1">
              {pkg.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className="mt-6 flex justify-end">
          <button className="btn btn-primary" onClick={handleUpgrade}>
            Upgrade to {selectedPackage.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpgradePackage;
