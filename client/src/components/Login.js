import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
      
      setAlert({
        show: true,
        message: 'Login successful! Redirecting...',
        type: 'success'
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || 'Login failed',
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-main-container">
      <div className="centered-container">
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: 0, fontWeight: 600, fontSize: '28px' }}>
              <i className="fas fa-utensils"></i> FoodMunch
            </h2>
            <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
              Welcome back! Please login to your account.
            </p>
          </div>

          <div style={{ padding: '40px 30px' }}>
            {alert.show && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
                {alert.message}
                <button type="button" className="close" onClick={() => setAlert({ ...alert, show: false })}>
                  <span>&times;</span>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  marginTop: '20px'
                }}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p style={{ color: '#666', margin: 0 }}>
                Don't have an account?{' '}
                <a href="/register" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: '600' }}>
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 