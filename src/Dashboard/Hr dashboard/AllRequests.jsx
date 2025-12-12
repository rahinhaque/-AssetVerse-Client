// src/pages/hr/AllRequests.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/requests");
      // Backend returns array of objects with fields:
      // assetId, assetName, assetType, requesterName, requesterEmail, requestDate, status
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve request
  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this request?"))
      return;
    try {
      await axiosSecure.patch(`/requests/${id}/approve`);
      alert("Request approved ✅");
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to approve request ❌");
    }
  };

  // Reject request
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this request?"))
      return;
    try {
      await axiosSecure.patch(`/requests/${id}/reject`);
      alert("Request rejected ❌");
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to reject request ❌");
    }
  };

  if (loading) return <p className="p-6">Loading requests...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Employee Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Date Requested</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.requesterName}</td>
                  <td>{req.assetName}</td>
                  <td>{req.assetType}</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.requestStatus === "pending"
                          ? "badge-warning"
                          : req.requestStatus === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.requestStatus.charAt(0).toUpperCase() +
                        req.requestStatus.slice(1)}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {req.requestStatus === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="btn btn-sm btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>—</span>
                    )}
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

export default AllRequests;
