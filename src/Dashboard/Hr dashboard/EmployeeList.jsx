
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeList = ({ companyName, packageLimit, currentEmployees }) => {
  const axiosSecure = useAxiosSecure();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/hr/employees/${companyName}`);
      if (res.data.success) setEmployees(res.data.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [companyName]);

  // Remove employee
  const handleRemove = async (email) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this employee from your team?"
    );
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/hr/employees/${email}`);
      if (res.data.success) {
        alert("Employee removed ✅");
        fetchEmployees();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove employee ❌");
    }
  };

  if (loading) return <p className="p-6">Loading employees...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Employees</h2>
      <p className="mb-4">
        Employees used: {employees.length}/{packageLimit}
      </p>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Assets Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.email}>
                  <td>
                    <img
                      src={emp.photo || "https://via.placeholder.com/40"}
                      alt={emp.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td>{emp.assetsCount}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleRemove(emp.email)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
