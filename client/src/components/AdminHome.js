import React from 'react';

const AdminHome = () => {
    return (
        <div>
            <div className="admin-cards">
                <div className="card">
                    <h3>Total users</h3>
                    <p>5</p>
                    <button>View all</button>
                </div>
                <div className="card">
                    <h3>All Restaurants</h3>
                    <p>4</p>
                    <button>View all</button>
                </div>
                <div className="card">
                    <h3>All Orders</h3>
                    <p>7</p>
                    <button>View all</button>
                </div>
            </div>
            <div className="admin-panels">
                <div className="panel">
                    <h3>Popular Restaurants (promotions)</h3>
                    {/* Add promotions content here */}
                </div>
                <div className="panel">
                    <h3>Approvals</h3>
                    <p>No new requests...</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome; 