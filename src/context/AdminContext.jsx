import { createContext, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  //const url = "http://localhost:1000/api";
  const url = "https://e-commerce-api-e87l.onrender.com/api";
  const token = localStorage.getItem("token");

  const [adminProducts, setAdminProducts] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const addAdminProduct = async (productData) => {
    const res = await axios.post(`${url}/admin/product/add`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // update UI instantly
    setAdminProducts((prev) => [res.data.product, ...prev]);

    return res.data;
  };
  const updateAdminProduct = async (id, updatedData) => {
    const res = await axios.put(`${url}/admin/product/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // update product in UI instantly
    setAdminProducts((prev) =>
      prev.map((p) => (p._id === id ? res.data.product : p))
    );

    return res.data;
  };

  // ---------------- PRODUCTS ----------------
  const fetchAdminProducts = async () => {
    setLoading(true);
    const res = await axios.get(`${url}/admin/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdminProducts(res.data.products);
    setLoading(false);
  };

  const deleteAdminProduct = async (id) => {
    await axios.delete(`${url}/admin/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // update UI instantly
    setAdminProducts((prev) => prev.filter((product) => product._id !== id));
  };

  // ---------------- USERS ----------------
  const fetchAdminUsers = async () => {
    setLoading(true);
    const res = await axios.get(`${url}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdminUsers(res.data.users);
    setLoading(false);
  };

  return (
    <AdminContext.Provider
      value={{
        adminProducts,
        adminUsers,
        fetchAdminProducts,
        deleteAdminProduct,
        fetchAdminUsers,
        addAdminProduct,
        updateAdminProduct,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
