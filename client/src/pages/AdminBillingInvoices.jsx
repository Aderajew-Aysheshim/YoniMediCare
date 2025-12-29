import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminBillingInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Billing & Invoices</h1>

      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Invoice Number</th>
              <th className="border border-slate-300 p-2">Pharmacy</th>
              <th className="border border-slate-300 p-2">Amount</th>
              <th className="border border-slate-300 p-2">GST / Tax</th>
              <th className="border border-slate-300 p-2">Status</th>
              <th className="border border-slate-300 p-2">Date</th>
              <th className="border border-slate-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice._id} className="text-center">
                <td className="border border-slate-300 p-2">{invoice.invoiceNumber}</td>
                <td className="border border-slate-300 p-2">{invoice.pharmacyName}</td>
                <td className="border border-slate-300 p-2">ETB {invoice.amount.toFixed(2)}</td>
                <td className="border border-slate-300 p-2">ETB {invoice.tax.toFixed(2)}</td>
                <td className="border border-slate-300 p-2">{invoice.status}</td>
                <td className="border border-slate-300 p-2">{new Date(invoice.date).toLocaleDateString()}</td>
                <td className="border border-slate-300 p-2">
                  <button
                    onClick={() => window.open(`/invoices/${invoice._id}`, '_blank')}
                    className="bg-emerald-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBillingInvoices;
