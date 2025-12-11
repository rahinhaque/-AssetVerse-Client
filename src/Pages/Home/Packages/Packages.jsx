import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Packages = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosSecure.get("/packages");
        setPackages(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p className="text-center py-10">Loading packages...</p>;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Choose Your <span className="text-primary">Package</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="border shadow-md rounded-xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold mb-2 text-primary">
                {pkg.name}
              </h3>

              <p className="text-gray-700 mb-4">
                <strong>{pkg.employeeLimit}</strong> Employees
              </p>

              <p className="text-3xl font-bold mb-4">${pkg.price}/mo</p>

              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✔ {feature}
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary w-full">Purchase</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
