import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const RestaurantDashboard = ({ user, onLogout }) => {
  return (
    <div className="restaurant-dashboard">
      <header className="restaurant-header">
        <h1>Food Munch (Restaurant)</h1>
        <p>Welcome, {user.username}!</p>
        <nav>
          <Link to="/restaurant">Home</Link>
          <Link to="menu">Menu</Link>
          <Link to="orders">Orders</Link>
          <button onClick={onLogout}>Logout</button>
        </nav>
      </header>
      <main className="restaurant-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default RestaurantDashboard; 