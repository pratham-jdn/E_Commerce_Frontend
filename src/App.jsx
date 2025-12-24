import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import { AdminProvider } from "./context/AdminContext";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./admin/AdminProducts";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";

const App = () => {
  // const {} = useContext(AppContext)
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/oderconfirmation" element={<OrderConfirmation />} />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProvider>
                <AdminProducts />
              </AdminProvider>
            </AdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminProvider>
                <AdminDashboard />
              </AdminProvider>
            </AdminRoute>
          }
        />
        // Admin Users
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminProvider>
                <AdminUsers />
              </AdminProvider>
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
