import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["myAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/assets/${user.email}`);
      return res.data.data || [];
    },
  });

  const returnMutation = useMutation({
    mutationFn: async (assetId) => {
      const res = await axiosSecure.patch(`/assets/return/${assetId}`, {
        employeeEmail: user.email,
      });
      if (!res.data.success)
        throw new Error(res.data.message || "Return failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myAssets", user.email]);
      alert("Asset returned successfully!");
    },
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || asset.assetType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading your assets...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Assets</h1>
        <button onClick={handlePrint} className="btn btn-primary print:hidden">
          Print / Download PDF
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 print:hidden">
        <input
          type="text"
          placeholder="Search by asset name..."
          className="input input-bordered w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-64"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {filteredAssets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-70">
            {assets.length === 0
              ? "You have no assigned assets yet."
              : "No assets match your search/filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={
                    asset.assetImage ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={asset.assetName}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{asset.assetName}</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="opacity-70">Type:</span>{" "}
                    <span className="badge badge-outline">
                      {asset.assetType}
                    </span>
                  </p>
                  <p>
                    <span className="opacity-70">Company:</span>{" "}
                    {asset.companyName}
                  </p>
                  <p>
                    <span className="opacity-70">Request Date:</span>{" "}
                    {format(
                      new Date(asset.requestDate || asset.assignmentDate),
                      "dd MMM yyyy"
                    )}
                  </p>
                  <p>
                    <span className="opacity-70">Approval Date:</span>{" "}
                    {asset.approvalDate
                      ? format(new Date(asset.approvalDate), "dd MMM yyyy")
                      : "N/A"}
                  </p>
                  <p>
                    <span className="opacity-70">Status:</span>{" "}
                    <span className="badge badge-success">Assigned</span>
                  </p>
                </div>

                <div className="card-actions justify-end mt-6 print:hidden">
                  {asset.assetType === "Returnable" &&
                    asset.status === "assigned" && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => returnMutation.mutate(asset.assetId)}
                        disabled={returnMutation.isPending}
                      >
                        {returnMutation.isPending
                          ? "Returning..."
                          : "Return Asset"}
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          .card {
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #ddd;
          }
          .grid {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MyAssets;
