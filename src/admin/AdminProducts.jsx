import { useContext, useEffect, useState } from "react";
import AdminContext from "../context/AdminContext";
import AdminLayout from "./AdminLayout";
import AddProductForm from "./AddProductForm";

const AdminProducts = () => {
  const {
    adminProducts,
    fetchAdminProducts,
    deleteAdminProduct,
    loading,
  } = useContext(AdminContext);

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const closeForm = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const confirmDelete = async () => {
    await deleteAdminProduct(deleteProduct._id);
    setDeleteProduct(null);
  };

  return (
    <AdminLayout>
      {/* Add Product */}
      <button
        onClick={() => {
          setEditProduct(null);
          setShowForm(true);
        }}
        style={{ marginBottom: "15px" }}
      >
        ➕ Add Product
      </button>

      {/* Add / Edit Product Modal */}
      {showForm && (
        <AddProductForm
          onClose={closeForm}
          editProduct={editProduct}
        />
      )}

      {/* INLINE DELETE CONFIRMATION MODAL */}
      {deleteProduct && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>⚠️ Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <b>{deleteProduct.title}</b>?
            </p>

            <div style={buttonRow}>
              <button style={dangerBtn} onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                style={cancelBtn}
                onClick={() => setDeleteProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2>Admin Products</h2>

      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {adminProducts.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={p.imgSrc}
                  alt={p.title}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              </td>
              <td>{p.title}</td>
              <td>₹{p.price}</td>
              <td>{p.qty}</td>
              <td>
                <button
                  onClick={() => {
                    setEditProduct(p);
                    setShowForm(true);
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  style={{ color: "red", marginLeft: "10px" }}
                  onClick={() => setDeleteProduct(p)}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}

          {adminProducts.length === 0 && !loading && (
            <tr>
              <td colSpan="5" align="center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminProducts;

/* ---------------- INLINE STYLES ---------------- */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  width: "350px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const buttonRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const dangerBtn = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#e0e0e0",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};
