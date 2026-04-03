import React, { useState } from 'react';

/**
 * UserProfile Component
 * Shows user info, address book, order history, and saved payment methods
 * Allows editing profile settings
 */
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  addresses: [
    {
      id: 1,
      label: 'Home',
      address: '123 Main St, Mumbai, MH, 400001',
      phone: '+91 9876543210',
    },
    {
      id: 2,
      label: 'Office',
      address: '456 Corporate Ave, Pune, MH, 411001',
      phone: '+91 9123456789',
    },
  ],
  paymentMethods: [
    { id: 1, type: 'Credit Card', last4: '1234', brand: 'Visa' },
    { id: 2, type: 'UPI', upi: 'john@upi' },
  ],
};

const UserProfile = () => {
  const [user, setUser] = useState(mockUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone });

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: user.name, email: user.email, phone: user.phone });
  };
  const handleSave = () => {
    setUser({ ...user, ...form });
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">User Profile</h1>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Profile Info</h2>
          {!editMode && (
            <button onClick={handleEdit} className="text-primary-600 hover:underline font-medium">Edit</button>
          )}
        </div>
        {editMode ? (
          <div className="space-y-4">
            <input type="text" className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="text" className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary">Save</button>
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Phone:</span> {user.phone}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Book</h2>
        <ul className="space-y-3">
          {user.addresses.map(addr => (
            <li key={addr.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-semibold text-primary-700 mr-2">{addr.label}:</span>
                <span>{addr.address}</span>
                <div className="text-xs text-gray-500">{addr.phone}</div>
              </div>
              <button className="text-primary-600 hover:underline mt-2 md:mt-0">Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Payment Methods</h2>
        <ul className="space-y-3">
          {user.paymentMethods.map(pm => (
            <li key={pm.id} className="border rounded-lg p-4 flex items-center justify-between">
              <span>
                {pm.type === 'Credit Card' && (
                  <>
                    <span className="font-semibold">{pm.brand}</span> Card ending in <span className="font-mono">{pm.last4}</span>
                  </>
                )}
                {pm.type === 'UPI' && (
                  <>
                    <span className="font-semibold">UPI:</span> {pm.upi}
                  </>
                )}
              </span>
              <button className="text-primary-600 hover:underline">Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
        <p className="text-gray-500">Order history integration coming soon.</p>
      </div>
    </div>
  );
};

export default UserProfile;
