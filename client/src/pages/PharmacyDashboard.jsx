import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import {
  FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBell,
  FaSearch, FaCog, FaUserCircle, FaSignOutAlt, FaPlus,
  FaChevronDown, FaFilter, FaFileExport, FaFileImport, FaSyncAlt,
  FaDollarSign, FaShoppingBag, FaChartBar, FaEdit, FaTrash,
  FaCloudUploadAlt, FaClipboardList, FaMoneyBillWave, FaTruck,
  FaPills, FaHospital, FaClock, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import {
  MdDashboard, MdInventory, MdLocalShipping, MdListAlt,
  MdPayment, MdPeople, MdSettings, MdMenu, MdNotifications,
  MdCheck, MdVisibility, MdLocalPharmacy
} from 'react-icons/md';

const PharmacyDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    outstandingPayments: 0,
    lowStockItems: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch pharmacy orders
      const ordersResponse = await api.get('/orders');
      setOrders(ordersResponse.data);

      // Calculate stats
      const totalOrders = ordersResponse.data.length;
      const pendingOrders = ordersResponse.data.filter(order => order.status === 'pending' || order.status === 'processing').length;
      const completedOrders = ordersResponse.data.filter(order => order.status === 'delivered').length;
      const totalRevenue = ordersResponse.data
        .filter(order => order.payment?.confirmed)
        .reduce((sum, order) => sum + order.totalAmount, 0);
      const outstandingPayments = ordersResponse.data
        .filter(order => !order.payment?.confirmed)
        .reduce((sum, order) => sum + order.totalAmount, 0);

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
        outstandingPayments,
        lowStockItems: 0 // Would need separate API call
      });

      // Set recent orders (last 5)
      setRecentOrders(ordersResponse.data.slice(0, 5).reverse());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data for demo
      setStats({
        totalOrders: 156,
        pendingOrders: 23,
        completedOrders: 133,
        totalRevenue: 45680,
        outstandingPayments: 2340,
        lowStockItems: 8
      });
      setRecentOrders([
        {
          _id: 'mock1',
          status: 'pending',
          items: [{ medicine: { name: 'Paracetamol' }, quantity: 2 }],
          totalAmount: 120,
          createdAt: new Date().toISOString(),
          user: { name: 'John Doe' }
        },
        {
          _id: 'mock2',
          status: 'processing',
          items: [{ medicine: { name: 'Amoxicillin' }, quantity: 1 }],
          totalAmount: 85,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          user: { name: 'Jane Smith' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      processing: "bg-blue-100 text-blue-700 border-blue-200",
      shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
      delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
      cancelled: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock className="text-amber-600" />,
      processing: <FaSyncAlt className="text-blue-600 animate-spin" />,
      shipped: <FaTruck className="text-indigo-600" />,
      delivered: <FaCheckCircle className="text-emerald-600" />,
      cancelled: <FaExclamationTriangle className="text-rose-600" />,
    };
    return icons[status] || <FaClock className="text-gray-600" />;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-emerald-600 border-b-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-emerald-900 font-black uppercase tracking-widest text-xs">Loading Pharmacy Portal...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#020617] pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(16,185,129,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <MdLocalPharmacy className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
                  PHARMACY <span className="text-emerald-500">PORTAL</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl font-medium">Manage your pharmacy operations, orders, and inventory.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <FaBell className="text-white text-xl" />
              </button>
              <button
                onClick={handleLogout}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <FaSignOutAlt className="text-white text-xl" />
                <span className="text-white text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FaClipboardList className="text-emerald-600 text-xl" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">{stats.totalOrders}</h3>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaClock className="text-amber-600 text-xl" />
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">{stats.pendingOrders}</h3>
            <p className="text-sm text-gray-500 font-medium">Pending Orders</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-blue-600 text-xl" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">{stats.completedOrders}</h3>
            <p className="text-sm text-gray-500 font-medium">Completed</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaDollarSign className="text-green-600 text-xl" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+15%</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">ETB {stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <FaMoneyBillWave className="text-rose-600 text-xl" />
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Pending</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">ETB {stats.outstandingPayments.toLocaleString()}</h3>
            <p className="text-sm text-gray-500 font-medium">Outstanding</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaPills className="text-purple-600 text-xl" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Alert</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">{stats.lowStockItems}</h3>
            <p className="text-sm text-gray-500 font-medium">Low Stock</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Recent Orders</h2>
                <Link to="/orders" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View All</Link>
              </div>

              <div className="space-y-4">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No recent orders</p>
                  </div>
                ) : (
                  recentOrders.map((order) => (
                    <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="font-black text-gray-900">#{order._id?.slice(-8).toUpperCase()}</p>
                          <p className="text-sm text-gray-500">{order.user?.name} • {order.items?.length} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900">ETB {order.totalAmount?.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/medicines" className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                  <FaBox />
                  <span>Browse Medicines</span>
                </Link>
                <Link to="/orders" className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  <FaClipboardList />
                  <span>View Orders</span>
                </Link>
                <Link to="/cart" className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                  <FaShoppingCart />
                  <span>Shopping Cart</span>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <FaHospital className="text-3xl" />
                <h3 className="text-xl font-black">Pharmacy Portal</h3>
              </div>
              <p className="text-emerald-50 mb-6">Manage your pharmacy operations efficiently with our comprehensive dashboard.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-emerald-200" />
                  <span>Real-time order tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-emerald-200" />
                  <span>Inventory management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-emerald-200" />
                  <span>Payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
