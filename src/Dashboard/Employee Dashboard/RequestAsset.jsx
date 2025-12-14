import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // This gives you employee name and email
  const queryClient = useQueryClient();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets/available");
      return res.data.data;
    },
  });

  const requestMutation = useMutation({
    mutationFn: async (requestData) => {
      const res = await axiosSecure.post("/requests", requestData);
      if (!res.data.success)
        throw new Error(res.data.message || "Request failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["availableAssets"]);
      setSelectedAsset(null);
      setNote("");
      document.getElementById("request_modal").close();
      alert("Asset request submitted successfully!");
    },
    onError: (err) => {
      alert(err.message || "Failed to submit request");
    },
  });

  if (isLoading)
    return <p className="text-center py-10">Loading available assets...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Request an Asset</h1>

      {assets.length === 0 ? (
        <p className="text-center py-20 text-xl opacity-70">
          No assets available for request
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{asset.productName}</h2>
                <p className="text-sm opacity-70">Type: {asset.productType}</p>
                <p className="text-sm">Available: {asset.availableQuantity}</p>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setSelectedAsset(asset);
                      document.getElementById("request_modal").showModal();
                    }}
                  >
                    Request Asset
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <dialog id="request_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Request: {selectedAsset?.productName}
          </h3>
          <p className="mb-4">Add an optional note:</p>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Why do you need this asset?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("request_modal").close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!selectedAsset || !user) return;

                requestMutation.mutate({
                  assetId: selectedAsset._id,
                  assetName: selectedAsset.productName,
                  assetType: selectedAsset.productType,
                  requesterName: user.name || "Employee",
                  requesterEmail: user.email,
                  hrEmail: selectedAsset.hrEmail,
                  companyName: selectedAsset.companyName,
                  note: note.trim(),
                });
              }}
              disabled={requestMutation.isPending}
            >
              {requestMutation.isPending ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
