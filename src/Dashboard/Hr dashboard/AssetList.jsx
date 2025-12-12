// src/pages/hr/AssetList.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

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
      
      const params = {};
      if (user?.email) params.hrEmail = user.email;
      const res = await axiosSecure.get("/assets", { params });
      const data = res.data?.data ?? res.data;
      setAssets(data);
    } catch (err) {
      console.error("Failed to fetch assets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line
  }, [user]);

  const filtered = assets.filter((a) =>
    a.productName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this asset?");
    if (!ok) return;
    try {
      await axiosSecure.delete(`/assets/${id}`);
      await fetchAssets();
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const openEdit = (asset) => {
    setEditing({
      id: asset._id,
      productName: asset.productName,
      productImage: asset.productImage,
      productType: asset.productType,
      productQuantity: asset.productQuantity,
      availableQuantity: asset.availableQuantity,
      companyName: asset.companyName,
    });
    setModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
     
      const payload = {
        productName: editing.productName,
        productImage: editing.productImage,
        productType: editing.productType,
        productQuantity: Number(editing.productQuantity),
        availableQuantity: Number(editing.availableQuantity),
        companyName: editing.companyName,
      };
      const res = await axiosSecure.put(`/assets/${editing.id}`, payload);
      setModalOpen(false);
      setEditing(null);
      await fetchAssets();
      alert("Updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <div className="p-6">Loading assets...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Asset List</h2>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets..."
            className="input input-bordered"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <div className="w-12 h-12">
                    <img
                      src={
                        asset.productImage ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={asset.productName}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </td>
                <td>{asset.productName}</td>
                <td>{asset.productType}</td>
                <td>{asset.availableQuantity ?? asset.productQuantity}</td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td className="flex gap-2">
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

      
      {modalOpen && editing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Asset</h3>
            <form onSubmit={submitEdit} className="space-y-3">
              <div>
                <label className="label">Product Name</label>
                <input
                  name="productName"
                  value={editing.productName}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Image URL</label>
                <input
                  name="productImage"
                  value={editing.productImage}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Type</label>
                <select
                  name="productType"
                  value={editing.productType}
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                >
                  <option>Returnable</option>
                  <option>Non-returnable</option>
                </select>
              </div>
              <div>
                <label className="label">Quantity</label>
                <input
                  name="productQuantity"
                  type="number"
                  value={editing.productQuantity}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">Available Quantity</label>
                <input
                  name="availableQuantity"
                  type="number"
                  value={editing.availableQuantity}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end gap-2 mt-3">
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
