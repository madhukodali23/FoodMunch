import React from 'react';

const Cart = ({ cartItems, isOpen, onClose, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(itemId, newQuantity);
    } else {
      onRemoveItem(itemId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: '#183b56', margin: 0 }}>
            <i className="fas fa-shopping-cart"></i> Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="btn btn-link"
            style={{ fontSize: '24px', color: '#666' }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
            <h4 style={{ color: '#666' }}>Your cart is empty</h4>
            <p style={{ color: '#999' }}>Add some delicious items to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <p style={{ color: '#666', margin: '5px 0', fontSize: '14px' }}>
                        {item.description}
                      </p>
                      <div className="cart-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="btn btn-sm btn-outline-danger mt-2"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3>Total: ${calculateTotal().toFixed(2)}</h3>
              <div className="mt-3">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={onCheckout}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  <i className="fas fa-credit-card"></i> Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 