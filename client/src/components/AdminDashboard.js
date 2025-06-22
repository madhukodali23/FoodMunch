import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Food Munch (admin)</h1>
        <nav>
          <Link to="/admin">Home</Link>
          <Link to="users">Users</Link>
          <Link to="orders">Orders</Link>
          <Link to="restaurants">Restaurants</Link>
          <button onClick={onLogout}>Logout</button>
        </nav>
      </header>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard; 