import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminInventoryWarehouse = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockItems();
  }, []);

  const fetchStockItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/inventory');
      setStockItems(response.data);
    } catch (error) {
      console.error('Error fetching stock items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Inventory & Warehouse</h1>

      {loading ? (
        <p>Loading inventory data...</p>
      ) : (
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Medicine</th>
              <th className="border border-slate-300 p-2">Batch Number</th>
              <th className="border border-slate-300 p-2">Expiry Date</th>
              <th className="border border-slate-300 p-2">Stock Quantity</th>
              <th className="border border-slate-300 p-2">Low Stock Alert</th>
              <th className="border border-slate-300 p-2">Expiry Alert</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map(item => (
              <tr key={item._id} className="text-center">
                <td className="border border-slate-300 p-2">{item.medicineName}</td>
                <td className="border border-slate-300 p-2">{item.batchNumber}</td>
                <td className="border border-slate-300 p-2">{new Date(item.expiryDate).toLocaleDateString()}</td>
                <td className="border border-slate-300 p-2">{item.stockQuantity}</td>
                <td className="border border-slate-300 p-2">{item.stockQuantity < item.lowStockThreshold ? 'Yes' : 'No'}</td>
                <td className="border border-slate-300 p-2">{new Date(item.expiryDate) < new Date() ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminInventoryWarehouse;
