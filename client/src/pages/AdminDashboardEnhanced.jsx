import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBell,
  FaSearch, FaCog, FaUserCircle, FaSignOutAlt, FaPlus,
  FaChevronDown, FaFilter, FaFileExport, FaFileImport, FaSyncAlt,
  FaDollarSign, FaShoppingBag, FaChartBar, FaEdit, FaTrash,
  FaCloudUploadAlt, FaClipboardList, FaMoneyBillWave, FaTruck,
  FaPills, FaHospital, FaClock, FaCheckCircle, FaExclamationTriangle,
  FaEye, FaDownload, FaUpload, FaCalendarAlt
} from "react-icons/fa";
import {
  MdDashboard, MdInventory, MdLocalShipping, MdListAlt,
  MdPayment, MdPeople, MdSettings, MdMenu, MdNotifications,
  MdCheck, MdVisibility, MdLocalPharmacy, MdAnalytics, MdAssessment
} from "react-icons/md";
import { Link } from "react-router-dom";

const AdminDashboardEnhanced = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [medicineForm, setMedicineForm] = useState({
    name: "",
    description: "",
    category: "Pain Relief",
    price: "",
    stock: "",
    manufacturer: "",
    requiresPrescription: false,
    dosage: "",
    sideEffects: "",
    image: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchStats(),
        fetchMedicines(),
        fetchOrders(),
        fetchUsers()
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
      // Set mock stats for demo
      setStats({
        totalOrders: 156,
        totalRevenue: 45680,
        statusCounts: {
          pending: 23,
          processing: 45,
          shipped: 67,
          delivered: 21
        },
        revenueByMonth: [
          { _id: 1, revenue: 12000 },
          { _id: 2, revenue: 15000 },
          { _id: 3, revenue: 18680 }
        ]
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

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Set mock users for demo
      setUsers([
        { _id: '1', name: 'Admin User', email: 'admin@yonimedicare.com', role: 'admin', phone: '+251 911 111 111' },
        { _id: '2', name: 'Pharmacy Manager', email: 'pharmacy@yonimedicare.com', role: 'user', phone: '+251 911 333 333' },
        { _id: '3', name: 'John Doe', email: 'user@example.com', role: 'user', phone: '+251 911 222 222' },
        { _id: '4', name: 'Sarah Johnson', email: 'sarah@demo.com', role: 'user', phone: '+251 911 444 444' },
        { _id: '5', name: 'Michael Brown', email: 'michael@demo.com', role: 'user', phone: '+251 911 555 555' }
      ]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("medicine", file);

    try {
      const response = await api.post("/upload/medicine", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMedicineForm({ ...medicineForm, image: response.data.fileUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMedicineSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMedicine) {
        await api.put(`/medicines/${editingMedicine._id}`, medicineForm);
      } else {
        await api.post("/medicines", medicineForm);
      }
      setShowMedicineForm(false);
      setEditingMedicine(null);
      setImagePreview(null);
      fetchMedicines();
      fetchStats();
    } catch (error) {
      console.error("Error saving medicine:", error);
      alert("Failed to save medicine");
    }
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setMedicineForm(medicine);
    setImagePreview(medicine.image);
    setShowMedicineForm(true);
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await api.delete(`/medicines/${id}`);
        fetchMedicines();
        fetchStats();
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
      fetchStats();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleConfirmPayment = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/confirm-payment`, { method: "manual" });
      fetchOrders();
      fetchStats();
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Payment confirmation failed");
    }
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

  const filteredOrders = orders.filter(order => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-emerald-600 border-b-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-emerald-900 font-black uppercase tracking-widest text-xs">Loading Admin Dashboard...</p>
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
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <MdDashboard className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
                  ADMIN <span className="text-emerald-500">DASHBOARD</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl font-medium">Complete pharmacy management system with real-time analytics.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors relative">
                <FaBell className="text-white text-xl" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                onClick={handleLogout}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors flex items-center space-x-2"
                title="Logout"
              >
                <FaSignOutAlt className="text-white text-xl" />
                <span className="text-white text-sm font-medium hidden md:block">Logout</span>
              </button>

              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-white text-lg" />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">{user?.name || 'Admin User'}</p>
                    <p className="text-emerald-200 text-xs">Administrator</p>
                  </div>
                  <FaChevronDown className={`text-white text-sm transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                          <FaUserCircle className="text-white text-xl" />
                        </div>
                        <div>
                          <p className="font-black text-gray-900">{user?.name || 'Admin User'}</p>
                          <p className="text-sm text-gray-500">{user?.email || 'admin@yonimedicare.com'}</p>
                          <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mt-1">
                            Administrator
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaUserCircle className="text-gray-400" />
                        <span className="text-sm font-medium">Profile Settings</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaCog className="text-gray-400" />
                        <span className="text-sm font-medium">System Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          // Add analytics or reports functionality
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <FaChartBar className="text-gray-400" />
                        <span className="text-sm font-medium">Analytics & Reports</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                      >
                        <FaSignOutAlt className="text-red-500" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaUsers className="text-blue-600 text-xl" />
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+8%</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">{users.length}</h3>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FaBox className="text-purple-600 text-xl" />
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Active</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">{medicines.length}</h3>
              <p className="text-sm text-gray-500 font-medium">Medicines</p>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: "overview", label: "Overview", icon: MdDashboard },
              { id: "medicines", label: "Medicines", icon: MdInventory },
              { id: "orders", label: "Orders", icon: MdListAlt },
              { id: "users", label: "Users", icon: MdPeople },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === tab.id
                  ? "bg-emerald-600 text-white"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
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
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setShowMedicineForm(true)}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                >
                  <FaPlus />
                  <span>Add New Medicine</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  <FaFileExport />
                  <span>Export Orders</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                  <FaSyncAlt />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "medicines" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Medicine Inventory</h2>
              <button
                onClick={() => setShowMedicineForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                <FaPlus />
                <span>Add Medicine</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Medicine</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Stock</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine) => (
                    <tr key={medicine._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FaPills className="text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-black text-gray-900">{medicine.name}</p>
                            <p className="text-sm text-gray-500">{medicine.manufacturer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                          {medicine.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-black text-gray-900">ETB {medicine.price}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-lg text-sm font-medium ${medicine.stock < 50 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          }`}>
                          {medicine.stock}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditMedicine(medicine)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(medicine._id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Order Management</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-black text-gray-900">Order #{order._id?.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-gray-500">{order.user?.name} • {order.user?.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900">ETB {order.totalAmount?.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Items: {order.items?.length}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">Payment: {order.payment?.confirmed ? "Confirmed" : "Pending"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      {!order.payment?.confirmed && (
                        <button
                          onClick={() => handleConfirmPayment(order._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                          Confirm Payment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-6">User Management</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                      }`}>
                      {user.role}
                    </span>
                    <span className="text-sm text-gray-500">{user.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Medicine Form Modal */}
      {showMedicineForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-gray-900 mb-6">
              {editingMedicine ? "Edit Medicine" : "Add New Medicine"}
            </h3>
            <form onSubmit={handleMedicineSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                  <input
                    type="text"
                    required
                    value={medicineForm.name}
                    onChange={(e) => setMedicineForm({ ...medicineForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={medicineForm.category}
                    onChange={(e) => setMedicineForm({ ...medicineForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Vitamins">Vitamins</option>
                    <option value="Cold & Flu">Cold & Flu</option>
                    <option value="Digestive Health">Digestive Health</option>
                    <option value="Heart Health">Heart Health</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="First Aid">First Aid</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={medicineForm.description}
                  onChange={(e) => setMedicineForm({ ...medicineForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB)</label>
                  <input
                    type="number"
                    required
                    value={medicineForm.price}
                    onChange={(e) => setMedicineForm({ ...medicineForm, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={medicineForm.stock}
                    onChange={(e) => setMedicineForm({ ...medicineForm, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    required
                    value={medicineForm.manufacturer}
                    onChange={(e) => setMedicineForm({ ...medicineForm, manufacturer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                <input
                  type="text"
                  required
                  value={medicineForm.dosage}
                  onChange={(e) => setMedicineForm({ ...medicineForm, dosage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Side Effects</label>
                <input
                  type="text"
                  required
                  value={medicineForm.sideEffects}
                  onChange={(e) => setMedicineForm({ ...medicineForm, sideEffects: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requiresPrescription"
                  checked={medicineForm.requiresPrescription}
                  onChange={(e) => setMedicineForm({ ...medicineForm, requiresPrescription: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="requiresPrescription" className="text-sm font-medium text-gray-700">
                  Requires Prescription
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowMedicineForm(false);
                    setEditingMedicine(null);
                    setImagePreview(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? "Uploading..." : editingMedicine ? "Update Medicine" : "Add Medicine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardEnhanced;
