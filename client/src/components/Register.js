import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer' // Default to customer
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength
    if (name === 'password') {
      let strength = 0;
      let message = '';
      let className = '';

      if (value.length >= 6) strength++;
      if (value.match(/[a-z]/)) strength++;
      if (value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;

      if (strength < 2) {
        message = 'Weak password';
        className = 'strength-weak';
      } else if (strength < 4) {
        message = 'Medium strength password';
        className = 'strength-medium';
      } else {
        message = 'Strong password';
        className = 'strength-strong';
      }

      setPasswordStrength({ message, className });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setAlert({
        show: true,
        message: 'Passwords do not match',
        type: 'danger'
      });
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setAlert({
        show: true,
        message: 'Password must be at least 6 characters long',
        type: 'danger'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setAlert({
        show: true,
        message: 'Account created successfully! Redirecting...',
        type: 'success'
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        onLogin(response.data.user);
        navigate('/');
      }, 2000);

    } catch (error) {
      let errorMessage = 'Registration failed';
      
      if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.map(error => error.msg).join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setAlert({
        show: true,
        message: errorMessage,
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
          maxWidth: '500px'
        }}>
          {/* Header */}
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
              Create your account and start ordering delicious food!
            </p>
          </div>

          {/* Body */}
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
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                {passwordStrength.message && (
                  <small className={`form-text ${passwordStrength.className}`}>
                    {passwordStrength.message}
                  </small>
                )}
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
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user-tag"></i>
                    </span>
                  </div>
                  <select
                    className="form-control"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option value="customer">Customer</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="admin">Admin</option>
                  </select>
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
                    <i className="fas fa-spinner fa-spin"></i> Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i> Create Account
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p style={{ color: '#666', margin: 0 }}>
                Already have an account?{' '}
                <a href="/login" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: '600' }}>
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 