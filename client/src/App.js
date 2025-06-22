import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AdminHome from './components/AdminHome';
import AdminUsers from './components/AdminUsers';
import AdminOrders from './components/AdminOrders';
import AdminRestaurants from './components/AdminRestaurants';
import RestaurantDashboard from './components/RestaurantDashboard';
import RestaurantHome from './components/RestaurantHome';
import RestaurantMenu from './components/RestaurantMenu';
import RestaurantOrders from './components/RestaurantOrders';

const MainLayout = ({ user, onLogout, cartItemsCount, onOpenCart, onCartUpdate }) => (
  <div>
    <Navbar 
      user={user} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
      onOpenCart={onOpenCart}
    />
    <Home 
      onLogout={onLogout} 
      onCartUpdate={onCartUpdate}
    />
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [onOpenCart, setOnOpenCart] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    // Force a re-render to ensure user is redirected
    window.location.href = '/login';
  };

  const handleCartUpdate = (count, openCartFunction) => {
    setCartItemsCount(count);
    setOnOpenCart(() => openCartFunction);
  };
  
  return (
    <Router basename="/FoodMunch">
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                user.userType === 'admin' ? (
                  <Navigate to="/admin" />
                ) : user.userType === 'restaurant' ? (
                  <Navigate to="/restaurant" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                user.userType === 'admin' ? (
                  <Navigate to="/admin" />
                ) : user.userType === 'restaurant' ? (
                  <Navigate to="/restaurant" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Register onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {user?.userType === 'admin' ? (
                  <Navigate to="/admin" />
                ) : user?.userType === 'restaurant' ? (
                  <Navigate to="/restaurant" />
                ) : (
                  <MainLayout
                    user={user}
                    onLogout={handleLogout}
                    cartItemsCount={cartItemsCount}
                    onOpenCart={onOpenCart}
                    onCartUpdate={handleCartUpdate}
                  />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {user?.userType === 'admin' ? (
                  <AdminDashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" />
                )}
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
          </Route>
          <Route
            path="/restaurant"
            element={
              <ProtectedRoute>
                {user?.userType === 'restaurant' ? (
                  <RestaurantDashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" />
                )}
              </ProtectedRoute>
            }
          >
            <Route index element={<RestaurantHome />} />
            <Route path="menu" element={<RestaurantMenu />} />
            <Route path="orders" element={<RestaurantOrders />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App; 