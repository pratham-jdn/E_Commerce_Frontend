import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div className="card">📦 Products</div>
        <div className="card">👤 Users</div>
        <div className="card">🛒 Orders</div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
