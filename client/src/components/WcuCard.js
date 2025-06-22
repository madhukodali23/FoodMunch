import React from 'react';

const WcuCard = ({ item }) => {
  return (
    <div className="col-12 col-md-4">
      <div className="wcu-card p-3 mb-3">
        <img src={item.image} className="wcu-card-image" alt={item.title} />
        <h1 className="wcu-card-title mt-3">{item.title}</h1>
        <p className="wcu-card-description">
          {item.description}
          {item.title === "Best Offers" && (
            <span className="offers"> 50% OFF</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default WcuCard; 