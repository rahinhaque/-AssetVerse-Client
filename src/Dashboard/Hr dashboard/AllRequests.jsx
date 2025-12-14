import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companyRequests", user?.companyName],
    enabled: !!user?.companyName,
    queryFn: async () => {
      const res = await axiosSecure.get("/requests"); // Get all
      return res.data.filter((req) => req.companyName === user.companyName); // Filter client-side
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requests/${id}/approve`);
      if (!res.data.success)
        throw new Error(res.data.message || "Approve failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companyRequests", user.companyName]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requests/${id}/reject`, {
        hrEmail: user.email,
      });
      if (!res.data.success)
        throw new Error(res.data.message || "Reject failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["companyRequests", user.companyName]);
    },
  });

  if (isLoading)
    return <p className="text-center py-10">Loading requests...</p>;
  if (isError)
    return (
      <p className="text-error text-center py-10">Error loading requests</p>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Asset Requests</h1>

      {data.length === 0 ? (
        <p className="text-center py-20 text-xl opacity-70">
          No pending requests for your company.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Requester</th>
                <th>Date</th>
                <th>Status</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div>
                      <div className="font-bold">{req.assetName}</div>
                      <div className="text-sm opacity-70">{req.assetType}</div>
                    </div>
                  </td>
                  <td>
                    {req.requesterName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {req.requesterEmail}
                    </span>
                  </td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.requestStatus === "pending"
                          ? "badge-warning"
                          : req.requestStatus === "Approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.requestStatus}
                    </span>
                  </td>
                  <td className="max-w-xs truncate">{req.note || "-"}</td>
                  <td>
                    {req.requestStatus === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-xs mr-2"
                          onClick={() => approveMutation.mutate(req._id)}
                          disabled={approveMutation.isPending}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => rejectMutation.mutate(req._id)}
                          disabled={rejectMutation.isPending}
                        >
                          Reject
                        </button>
                      </>
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
