import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const PharmacyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [creditLimit, setCreditLimit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const paymentsResponse = await api.get('/payments/history');
      setPayments(paymentsResponse.data);

      const creditResponse = await api.get('/pharmacy/credit-limit');
      setCreditLimit(creditResponse.data.limit);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Payments</h1>

      {loading ? (
        <p>Loading payments data...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Credit Limit</h2>
            <p className="text-lg font-bold">ETB {creditLimit.toFixed(2)}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            {payments.length === 0 ? (
              <p>No payment history available.</p>
            ) : (
              <ul className="space-y-4">
                {payments.map(payment => (
                  <li key={payment._id} className="border rounded p-4">
                    <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                    <p><strong>Amount:</strong> ETB {payment.amount.toFixed(2)}</p>
                    <p><strong>Method:</strong> {payment.method}</p>
                    <p><strong>Status:</strong> {payment.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default PharmacyPayments;
