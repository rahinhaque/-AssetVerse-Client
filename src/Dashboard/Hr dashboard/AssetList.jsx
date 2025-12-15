import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/assets", {
        params: { hrEmail: user?.email },
      });
      setAssets(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch assets", err);
      alert("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchAssets();
  }, [user]);

  const filtered = assets.filter((a) =>
    a.productName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this asset? This cannot be undone."
      )
    )
      return;

    try {
      await axiosSecure.delete(`/assets/${id}`);
      await fetchAssets();
      alert("Asset deleted successfully");
    } catch (err) {
      alert("Failed to delete asset");
    }
  };

  const openEdit = (asset) => {
    setEditing({
      id: asset._id,
      productName: asset.productName,
      productImage: asset.productImage || "",
      productType: asset.productType,
      productQuantity: asset.productQuantity,
    });
    setModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/assets/${editing.id}`, {
        productName: editing.productName,
        productImage: editing.productImage,
        productType: editing.productType,
        productQuantity: Number(editing.productQuantity),
      });
      setModalOpen(false);
      setEditing(null);
      await fetchAssets();
      alert("Asset updated successfully");
    } catch (err) {
      alert("Failed to update asset");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading assets...</div>;

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">My Asset List</h2>
        <input
          type="text"
          placeholder="Search by asset name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-70">
            {assets.length === 0
              ? "No assets added yet."
              : "No assets match your search."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Total Qty</th>
                <th>Available</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded">
                        <img
                          src={
                            asset.productImage ||
                            "https://via.placeholder.com/80?text=No+Image"
                          }
                          alt={asset.productName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{asset.productName}</td>
                  <td>
                    <span className="badge badge-outline">
                      {asset.productType}
                    </span>
                  </td>
                  <td>{asset.productQuantity}</td>
                  <td>
                    <span
                      className={`badge ${
                        asset.availableQuantity > 0
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {asset.availableQuantity}
                    </span>
                  </td>
                  <td>{format(new Date(asset.dateAdded), "dd MMM yyyy")}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openEdit(asset)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(asset._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {modalOpen && editing && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Asset</h3>
            <form onSubmit={submitEdit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  name="productName"
                  value={editing.productName}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL (optional)</span>
                </label>
                <input
                  name="productImage"
                  value={editing.productImage}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  name="productType"
                  value={editing.productType}
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Total Quantity</span>
                </label>
                <input
                  name="productQuantity"
                  type="number"
                  min="1"
                  value={editing.productQuantity}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-warning">
                    Note: Reducing below assigned amount is not allowed
                  </span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setModalOpen(false);
                    setEditing(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssetList;
