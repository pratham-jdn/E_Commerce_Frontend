import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  // 🔑 Read token DIRECTLY (sync)
  const token = localStorage.getItem("token");

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 2️⃣ Token exists but user profile still loading
  if (!user) {
    return <h3>Checking admin access...</h3>;
  }

  // 3️⃣ Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // 4️⃣ Admin verified
  return children;
};

export default AdminRoute;
