import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "220px", padding: "20px", background: "#222", color: "#fff" }}>
        <h3>Admin Panel</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/admin" style={{ color: "#fff" }}>Dashboard</Link></li>
          <li><Link to="/admin/products" style={{ color: "#fff" }}>Products</Link></li>
          <li><Link to="/admin/users" style={{ color: "#fff" }}>Users</Link></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
