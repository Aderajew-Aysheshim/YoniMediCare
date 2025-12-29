import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const PharmacyDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [outstandingPayments, setOutstandingPayments] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const ordersResponse = await api.get('/orders/pharmacy/current');
      setOrders(ordersResponse.data);

      const paymentsResponse = await api.get('/payments/outstanding');
      setOutstandingPayments(paymentsResponse.data.outstandingAmount);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Pharmacy Dashboard</h1>

      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
            {orders.length === 0 ? (
              <p>No current orders.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map(order => (
                  <li key={order._id} className="border rounded p-4">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Items:</strong> {order.items.length}</p>
                    <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Outstanding Payments</h2>
            <p className="text-lg font-bold">ETB {outstandingPayments.toFixed(2)}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default PharmacyDashboard;
