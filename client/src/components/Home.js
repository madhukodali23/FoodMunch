import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import WcuCard from './WcuCard';
import Cart from './Cart';
import { menuItems, wcuItems, socialLinks, paymentMethods } from '../data/menuItems';

const Home = ({ onLogout, onCartUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (onCartUpdate) {
      onCartUpdate(cartItemsCount, () => setIsCartOpen(true));
    }
  }, [cartItemsCount, onCartUpdate]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleBuyNow = (item) => {
    // For buy now, we can either add to cart and open cart, or go directly to checkout
    addToCart(item);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    // Here you would typically redirect to a checkout page or payment gateway
    alert('Proceeding to checkout with total: $' + 
      cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner-section-bg-container d-flex justify-content-center flex-column">
        <div className="text-center">
          <h1 className="banner-heading mb-3">Get Delicious Food Anytime</h1>
          <p className="banner-caption mb-4">Eat Smart & Healthy</p>
          <button className="custom-button">View Menu</button>
          <button className="custom-outline-button">Order Now</button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="wcu-section pt-5 pb-5" id="wcuSection">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="wcu-section-heading">Why Choose Us?</h1>
              <p className="wcu-section-description">
                We use both original recipes and classic versions of famous food items.
              </p>
            </div>
            {wcuItems.map(item => (
              <WcuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Explore Menu Section */}
      <div className="explore-menu-section pt-5 pb-5" id="exploreMenuSection">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="menu-section-heading">Explore Menu</h1>
            </div>
            {menuItems.map(item => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Healthy Food Section */}
      <div className="healthy-food-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="text-center">
                <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/healthy-food-plate-img.png" className="healthy-food-section-img" alt="Healthy Food" />
              </div>
            </div>
            <div className="col-12 col-md-7">
              <h1 className="healthy-food-section-heading">
                Fresh, Healthy, Organic, Delicious Fruits
              </h1>
              <p className="healthy-food-section-description">
                Say no to harmful chemicals and go fully organic with our range of
                fresh fruits and veggies. Pamper your body and your senses with
                the true and unadulterated gifts from mother nature. with the true
                and unadulterated gifts from mother nature.
              </p>
              <button className="custom-button">Watch Video</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery and Payment Section */}
      <div className="delivery-and-payment-section pt-5 pb-5" id="deliveryPaymentSection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-5 order-2 order-md-1">
              <div className="text-center">
                <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/delivery-payment-section-img.png" className="delivery-and-payment-section-img" alt="Delivery and Payment" />
              </div>
            </div>
            <div className="col-12 col-md-7 order-1 order-md-2">
              <h1 className="delivery-and-payment-section-heading">
                Delivery and Payment
              </h1>
              <p className="delivery-and-payment-section-description">
                Enjoy hassle-free payment with the plenitude of payment options
                available for you. Get live tracking and locate your food on a
                live map. It's quite a sight to see your food arrive to your door.
                Plus, you get a 5% discount on every order every time you pay
                online.
              </p>
              <button className="custom-button">Order Now</button>
              <div className="mt-3">
                {paymentMethods.map(method => (
                  <img key={method.id} src={method.image} className="payment-card-img" alt={method.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thanking Customers Section */}
      <div className="thanking-customers-section pt-5 pb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
              <h1 className="thanking-customers-section-heading">
                Thank you for being a valuable customer to us.
              </h1>
              <p className="thanking-customers-section-description">
                We have a surprise gift for you
              </p>
              <div>
                <button type="button" className="custom-button" onClick={() => setShowModal(true)}>
                  Redeem Gift
                </button>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/thanking-customers-section-img.png" className="thanking-customers-section-img" alt="Thanking Customers" />
            </div>
          </div>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="follow-us-section pt-5 pb-5" id="followUsSection">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="follow-us-section-heading">Follow Us</h1>
            </div>
            <div className="col-12">
              <div className="d-flex flex-row justify-content-center">
                {socialLinks.map(social => (
                  <div key={social.id} className="follow-us-icon-container">
                    <i className={`${social.icon} icon`}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-logo-light.png" className="food-munch-logo" alt="FoodMunch" />
              <h1 className="footer-section-mail-id">orderfood@foodmunch.com</h1>
              <p className="footer-section-address">
                123 Ayur Vigyan Nagar, New Delhi, India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
      />

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog mt-5">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title thanking-customers-section-modal-title">
                  Gift Voucher
                </h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/gift-voucher-img.png" className="w-100" alt="Gift Voucher" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Backdrop */}
      {showModal && (
        <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>
      )}
    </div>
  );
};

export default Home; 