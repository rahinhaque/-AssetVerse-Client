import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets/available");
      return res.data.data || [];
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

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Loading available assets...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Request an Asset</h1>

      {assets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl opacity-70">
            No assets are currently available for request
          </p>
          <p className="text-lg opacity-50 mt-4">
            Check back later or contact your HR
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <figure className="px-6 pt-6">
                <img
                  src={
                    asset.productImage ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={asset.productName}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-lg">{asset.productName}</h2>

                <div className="space-y-2 mt-2">
                  <p className="text-sm">
                    <span className="font-medium">Type:</span>{" "}
                    <span className="badge badge-outline badge-sm">
                      {asset.productType}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Available:</span>{" "}
                    <span className="badge badge-success badge-sm">
                      {asset.availableQuantity}
                    </span>
                  </p>
                  <p className="text-sm opacity-70">
                    Added by: {asset.hrEmail}
                  </p>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setNote("");
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

      {/* Request Modal */}
      <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">Request Asset</h3>
          <p className="text-lg mb-6">
            <strong>{selectedAsset?.productName}</strong> (
            {selectedAsset?.productType})
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Additional Note (Optional)
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 resize-none"
              placeholder="Why do you need this asset? Any special requirements?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action mt-8">
            <button
              className="btn btn-ghost"
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
              {requestMutation.isPending ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </div>

        {/* Close modal when clicking outside */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RequestAsset;
