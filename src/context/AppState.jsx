import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  // const url = "http://localhost:1000/api";

  const url = "https://e-commerce-api-e87l.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  /* ---------------- RESTORE TOKEN ---------------- */
  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
      });
      setProducts(api.data.products);
      setFilteredData(api.data.products);
    };
    fetchProduct();
  }, []);

  /* ---------------- AUTH REHYDRATION (IMPORTANT FIX) ---------------- */
  useEffect(() => {
    if (token) {
      userProfile();
      userCart();
      getAddress();
      user_Order();
    }
  }, [token, reload]);

  // ---------------- REGISTER ----------------
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      { headers: { "Content-Type": "Application/json" } }
    );

    toast.success(api.data.message, {
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
  };

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      { headers: { "Content-Type": "Application/json" } }
    );

    toast.success(api.data.message, {
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });

    localStorage.setItem("token", api.data.token);
    setToken(api.data.token);
    setIsAuthenticated(true);

    return api.data;
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");

    toast.success("Logout Successfully!", {
      autoClose: 1500,
      theme: "dark",
      transition: Bounce,
    });
  };

  // ---------------- USER PROFILE ----------------
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
    });
    setUser(api.data.user);
  };

  // ---------------- CART ----------------
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      { headers: { "Content-Type": "Application/json", Auth: token } }
    );
    setReload(!reload);
  };

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: { "Content-Type": "Application/json", Auth: token },
    });
    setCart(api.data.cart);
  };

  const decreaseQty = async (productId, qty) => {
    await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      { headers: { "Content-Type": "Application/json", Auth: token } }
    );
    setReload(!reload);
  };

  const removeFromCart = async (productId) => {
    await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: { "Content-Type": "Application/json", Auth: token },
    });
    setReload(!reload);
  };

  const clearCart = async () => {
    await axios.delete(`${url}/cart/clear`, {
      headers: { "Content-Type": "Application/json", Auth: token },
    });
    setReload(!reload);
  };

  // ---------------- ADDRESS ----------------
  const shippingAddress = async (data) => {
    await axios.post(`${url}/address/add`, data, {
      headers: { "Content-Type": "Application/json", Auth: token },
    });
    setReload(!reload);
  };

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: { "Content-Type": "Application/json", Auth: token },
    });
    setUserAddress(api.data.userAddress);
  };

  // ---------------- ORDERS ----------------
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: { "Content-Type": "Application/json", Auth: token },
    });
    setUserOrder(api.data);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        logout,
        token,
        isAuthenticated,
        user,
        filteredData,
        setFilteredData,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
