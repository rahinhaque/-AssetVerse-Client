// src/pages/hr/AddAsset.jsx
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    productImage: "",
    productType: "Returnable",
    productQuantity: 1,
    companyName: user?.companyName || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.productName || !form.productQuantity) {
      setError("Fill required fields");
      return;
    }
    try {
      const payload = {
        productName: form.productName,
        productImage: form.productImage,
        productType: form.productType,
        productQuantity: Number(form.productQuantity),
        hrEmail: user?.email || "",
        companyName: form.companyName,
      };
      await axiosSecure.post("/assets", payload);
      alert("Asset added");
      navigate("/assets");
    } catch (err) {
      console.error(err);
      setError("Failed to add asset");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Asset</h2>

      {error && <p className="text-error mb-2">{error}</p>}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label">Product Name</label>
          <input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            name="productImage"
            value={form.productImage}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Type</label>
          <select
            name="productType"
            value={form.productType}
            onChange={handleChange}
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
            value={form.productQuantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="1"
          />
        </div>

        <div>
          <label className="label">Company Name</label>
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary">Add Asset</button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
