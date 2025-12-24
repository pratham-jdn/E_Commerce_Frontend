import { useContext, useEffect } from "react";
import AdminContext from "../context/AdminContext";
import AdminLayout from "./AdminLayout";

const AdminUsers = () => {
  const { adminUsers, fetchAdminUsers, loading } =
    useContext(AdminContext);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  return (
    <AdminLayout>
      <h2>Admin Users</h2>

      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminUsers;
