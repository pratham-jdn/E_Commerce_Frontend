import { useState, useContext, useEffect } from "react";
import AdminContext from "../context/AdminContext";

const AddProductForm = ({ onClose, editProduct = null }) => {
  const { addAdminProduct, updateAdminProduct } =
    useContext(AdminContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: "",
    imgSrc: "",
  });

  // 👇 Prefill form when editing
  useEffect(() => {
    if (editProduct) {
      setForm({
        title: editProduct.title,
        description: editProduct.description,
        price: editProduct.price,
        category: editProduct.category,
        qty: editProduct.qty,
        imgSrc: editProduct.imgSrc,
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      qty: Number(form.qty),
      imgSrc: form.imgSrc,
    };

    if (editProduct) {
      await updateAdminProduct(editProduct._id, payload);
    } else {
      await addAdminProduct(payload);
    }

    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <h2>
          {editProduct ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>

        <form onSubmit={submitHandler} style={formStyle}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            style={{ ...inputStyle, height: "70px" }}
          />

          <div style={rowStyle}>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              style={inputStyle}
            />
            <input
              name="qty"
              type="number"
              value={form.qty}
              onChange={handleChange}
              placeholder="Qty"
              required
              style={inputStyle}
            />
          </div>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            style={inputStyle}
          />

          <input
            name="imgSrc"
            value={form.imgSrc}
            onChange={handleChange}
            placeholder="Image URL"
            required
            style={inputStyle}
          />

          {form.imgSrc && (
            <img
              src={form.imgSrc}
              alt="preview"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          )}

          <div style={buttonRow}>
            <button type="submit" style={primaryBtn}>
              {editProduct ? "Update" : "Save"}
            </button>
            <button type="button" onClick={onClose} style={secondaryBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

/* ---------- styles (unchanged) ---------- */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "420px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const rowStyle = {
  display: "flex",
  gap: "10px",
};

const buttonRow = {
  display: "flex",
  justifyContent: "space-between",
};

const primaryBtn = {
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const secondaryBtn = {
  background: "#eee",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};
