import React from 'react';
import { Link } from 'react-scroll';

const Navbar = ({ user, onLogout, cartItemsCount, onOpenCart }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png" className="food-munch-logo" alt="FoodMunch" />
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto d-flex align-items-center">
            <Link 
              activeClass="active" 
              to="wcuSection" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="nav-link"
            >
              Why Choose Us?
            </Link>
            <Link 
              to="exploreMenuSection" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="nav-link"
            >
              Explore Menu
            </Link>
            <Link 
              to="deliveryPaymentSection" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="nav-link"
            >
              Delivery & Payment
            </Link>
            <Link 
              to="followUsSection" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="nav-link"
            >
              Follow Us
            </Link>
            
            {/* Cart Icon */}
            <div className="cart-icon" onClick={onOpenCart}>
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </div>
            
            {/* User Info and Logout */}
            {user && (
              <div className="user-info">
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{user?.name || user?.username || 'User'}</span>
                <button className="btn btn-logout" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 