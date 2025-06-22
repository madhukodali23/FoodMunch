import React, { useState } from 'react';

const MenuItem = ({ item, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      ...item,
      quantity: quantity
    });
  };

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="shadow menu-item-card p-3 mb-3">
        <img src={item.image} className="menu-item-image w-100" alt={item.title} />
        <h1 className="menu-card-title">{item.title}</h1>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-price">
          <span className="price-amount">${item.price}</span>
        </div>
        
        <div className="quantity-selector mb-3">
          <label htmlFor={`quantity-${item.id}`} className="quantity-label">Quantity:</label>
          <div className="quantity-controls">
            <button 
              type="button" 
              className="quantity-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button 
              type="button" 
              className="quantity-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="menu-item-actions">
          <button 
            className="btn btn-add-to-cart"
            onClick={handleAddToCart}
          >
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button 
            className="btn btn-buy-now"
            onClick={handleBuyNow}
          >
            <i className="fas fa-shopping-bag"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem; 