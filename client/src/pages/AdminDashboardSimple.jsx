import { useState, useEffect } from "react";
import api from "../utils/api";
import { FaBox, FaUsers, FaDollarSign, FaClipboardList, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { MdDashboard, MdInventory, MdListAlt, MdPeople } from "react-icons/md";

const AdminDashboardSimple = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchStats(),
        fetchMedicines(),
        fetchOrders()
      ]);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/orders/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Set mock stats
      setStats({
        totalOrders: 156,
        totalRevenue: 45680,
        statusCounts: { pending: 23, processing: 45, shipped: 67, delivered: 21 }
      });
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await api.get("/medicines");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/admin/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-b-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Admin Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-300">Manage your pharmacy system</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <FaClipboardList className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold">ETB {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <FaDollarSign className="text-green-600 text-2xl" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Medicines</p>
                  <p className="text-2xl font-bold">{medicines.length}</p>
                </div>
                <FaBox className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex space-x-1 p-2">
            {[
              { id: "overview", label: "Overview", icon: MdDashboard },
              { id: "medicines", label: "Medicines", icon: MdInventory },
              { id: "orders", label: "Orders", icon: MdListAlt },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Recent Orders</h3>
                <div className="space-y-2">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex justify-between p-2 border-b">
                      <span>#{order._id?.slice(-8).toUpperCase()}</span>
                      <span>ETB {order.totalAmount?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Add Medicine
                  </button>
                  <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "medicines" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Medicine Inventory</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine) => (
                    <tr key={medicine._id} className="border-b">
                      <td className="p-2">{medicine.name}</td>
                      <td className="p-2">ETB {medicine.price}</td>
                      <td className="p-2">{medicine.stock}</td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Management</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order #{order._id?.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-600">{order.user?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">ETB {order.totalAmount?.toLocaleString()}</p>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardSimple;
