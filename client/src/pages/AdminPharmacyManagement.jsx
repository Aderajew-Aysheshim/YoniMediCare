import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminPharmacyManagement = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/pharmacies');
      setPharmacies(response.data);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/pharmacies/${id}/approve`);
      fetchPharmacies();
    } catch (error) {
      console.error('Error approving pharmacy:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/admin/pharmacies/${id}/reject`);
      fetchPharmacies();
    } catch (error) {
      console.error('Error rejecting pharmacy:', error);
    }
  };

  const handleActivate = async (id) => {
    try {
      await api.put(`/admin/pharmacies/${id}/activate`);
      fetchPharmacies();
    } catch (error) {
      console.error('Error activating pharmacy:', error);
    }
  };

  const handleSuspend = async (id) => {
    try {
      await api.put(`/admin/pharmacies/${id}/suspend`);
      fetchPharmacies();
    } catch (error) {
      console.error('Error suspending pharmacy:', error);
    }
  };

  const handleAssignCreditLimit = async (id, limit) => {
    try {
      await api.put(`/admin/pharmacies/${id}/credit-limit`, { limit });
      fetchPharmacies();
    } catch (error) {
      console.error('Error assigning credit limit:', error);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Pharmacy Management</h1>

      {loading ? (
        <p>Loading pharmacies...</p>
      ) : (
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Name</th>
              <th className="border border-slate-300 p-2">License Verified</th>
              <th className="border border-slate-300 p-2">Credit Limit</th>
              <th className="border border-slate-300 p-2">Status</th>
              <th className="border border-slate-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map(pharmacy => (
              <tr key={pharmacy._id} className="text-center">
                <td className="border border-slate-300 p-2">{pharmacy.name}</td>
                <td className="border border-slate-300 p-2">{pharmacy.licenseVerified ? 'Yes' : 'No'}</td>
                <td className="border border-slate-300 p-2">ETB {pharmacy.creditLimit.toFixed(2)}</td>
                <td className="border border-slate-300 p-2">{pharmacy.status}</td>
                <td className="border border-slate-300 p-2 space-x-2">
                  {pharmacy.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(pharmacy._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(pharmacy._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {pharmacy.status === 'Active' && (
                    <button
                      onClick={() => handleSuspend(pharmacy._id)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Suspend
                    </button>
                  )}
                  {pharmacy.status === 'Suspended' && (
                    <button
                      onClick={() => handleActivate(pharmacy._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Activate
                    </button>
                  )}
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Credit Limit"
                    onBlur={(e) => handleAssignCreditLimit(pharmacy._id, parseFloat(e.target.value))}
                    className="border border-slate-300 rounded px-2 py-1 w-24"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPharmacyManagement;
