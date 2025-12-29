import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminReportsAnalytics = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading reports...</p>;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Reports & Analytics</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sales by Medicine</h2>
        <ul>
          {reports.salesByMedicine.map((item) => (
            <li key={item.medicineId}>
              {item.medicineName}: {item.sales}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Pharmacies</h2>
        <ul>
          {reports.topPharmacies.map((pharmacy) => (
            <li key={pharmacy.pharmacyId}>
              {pharmacy.pharmacyName}: {pharmacy.totalOrders}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Monthly Revenue</h2>
        <p>ETB {reports.monthlyRevenue.toFixed(2)}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Stock Movement</h2>
        <ul>
          {reports.stockMovement.map((item) => (
            <li key={item.medicineId}>
              {item.medicineName}: {item.movement}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminReportsAnalytics;
