import React from 'react';
import { Link } from 'react-router-dom';

// Mock user data for demo
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  ordersCount: 5,
};

const UserDashboard = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
          <p className="mb-2"><span className="font-medium">Name:</span> {mockUser.name}</p>
          <p className="mb-2"><span className="font-medium">Email:</span> {mockUser.email}</p>
          <p className="mb-2"><span className="font-medium">Phone:</span> {mockUser.phone}</p>
          <Link to="/profile" className="mt-4 btn-primary">Edit Profile</Link>
        </div>
        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
          <p className="text-4xl font-bold text-primary-700 mb-2">{mockUser.ordersCount}</p>
          <p className="mb-4 text-gray-500">Total Orders</p>
          <Link to="/orders" className="btn-primary">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
