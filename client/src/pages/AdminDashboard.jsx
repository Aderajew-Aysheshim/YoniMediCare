import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBell,
  FaSearch, FaCog, FaUserCircle, FaSignOutAlt, FaPlus,
  FaChevronDown, FaFilter, FaFileExport, FaFileImport, FaSyncAlt
} from "react-icons/fa";
import {
  MdDashboard, MdInventory, MdLocalShipping,
  MdPayment, MdPeople, MdSettings, MdMenu
} from "react-icons/md";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with API calls
  const [stats, setStats] = useState({
    totalSales: 12540,
    totalOrders: 324,
    totalProducts: 45,
    totalUsers: 1289
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: 'John Doe', date: '2023-06-15', amount: 125.99, status: 'Completed', payment: 'Paid' },
    { id: 2, customer: 'Jane Smith', date: '2023-06-14', amount: 89.50, status: 'Processing', payment: 'Paid' },
    { id: 3, customer: 'Robert Johnson', date: '2023-06-14', amount: 210.00, status: 'Shipped', payment: 'Paid' },
    { id: 4, customer: 'Emily Davis', date: '2023-06-13', amount: 156.75, status: 'Pending', payment: 'Pending' },
    { id: 5, customer: 'Michael Brown', date: '2023-06-12', amount: 78.20, status: 'Completed', payment: 'Paid' },
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 5.99, stock: 45, sales: 128 },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 8.50, stock: 32, sales: 98 },
    { id: 3, name: 'Ibuprofen 200mg', category: 'Pain Relief', price: 4.99, stock: 67, sales: 112 },
    { id: 4, name: 'Omeprazole 20mg', category: 'Antacids', price: 7.25, stock: 28, sales: 76 },
    { id: 5, name: 'Cetirizine 10mg', category: 'Allergy', price: 6.75, stock: 51, sales: 89 },
  ]);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">YoniMediCare</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700"
          >
            <MdMenu className="text-2xl" />
          </button>
        </div>

        <nav className="mt-6">
          {[
            { icon: <MdDashboard className="text-xl" />, name: 'Dashboard', active: activeTab === 'dashboard' },
            { icon: <FaBox className="text-lg" />, name: 'Products', active: activeTab === 'products' },
            { icon: <FaShoppingCart className="text-lg" />, name: 'Orders', active: activeTab === 'orders' },
            { icon: <MdLocalShipping className="text-xl" />, name: 'Shipping', active: activeTab === 'shipping' },
            { icon: <MdPayment className="text-xl" />, name: 'Payments', active: activeTab === 'payments' },
            { icon: <FaUsers className="text-lg" />, name: 'Customers', active: activeTab === 'customers' },
            { icon: <FaChartLine className="text-lg" />, name: 'Analytics', active: activeTab === 'analytics' },
            { icon: <MdSettings className="text-xl" />, name: 'Settings', active: activeTab === 'settings' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${item.active ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              <span className="mr-4">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                <FaBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <FaUserCircle className="text-2xl" />
                </div>
                {sidebarOpen && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                  </div>
                )}
                <button className="text-gray-600 hover:text-gray-800">
                  <FaChevronDown className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </header>
        {id: "orders", label: "Logistics Hub", icon: MdListAlt, desc: "Active Shipments" },
          ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center space-x-4 px-6 py-5 rounded-[2rem] transition-all group ${activeTab === item.id
            ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/40 translate-x-3'
            : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
            }`}
        >
          <item.icon className={`text-2xl ${activeTab === item.id ? 'text-emerald-400' : 'group-hover:text-emerald-600'}`} />
          <div className="text-left">
            <p className="font-black text-[11px] uppercase tracking-widest">{item.label}</p>
            <p className={`text-[8px] font-bold uppercase tracking-tight ${activeTab === item.id ? 'text-white/40' : 'text-gray-300'}`}>{item.desc}</p>
          </div>
        </button>
          ))}
      </nav>

      <div className="p-10">
        <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-800 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-4">Core Frequency</p>
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
            <span className="text-xs font-black tracking-widest">LIVE DATA FEED</span>
          </div>
        </div>
      </div>
    </aside>

      {/* Main Content Pane */ }
      <main className="flex-1 ml-80 p-12 lg:p-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="h-1 w-8 bg-emerald-600 rounded-full"></span>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Administrative Command</p>
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">{activeTab} <span className="text-emerald-600">Report</span></h2>
          </div>

          <div className="flex items-center space-x-6 bg-white p-3 pr-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-50">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full border-4 border-white flex items-center justify-center font-black text-white text-lg">Y</div>
              <div className="w-12 h-12 bg-gray-900 rounded-full border-4 border-white flex items-center justify-center">
                <MdNotifications className="text-white text-xl" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-900 uppercase">Yoni Admin</p>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">System Architect</p>
            </div>
          </div>
        </header>

        {/* Tab Content - Strategic Overview */}
        {activeTab === "overview" && stats && (
          <div className="animate-fade-in pb-20">
            {/* High-Fidelity Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
              {[
                { label: "Gross Manifest Valuation", value: `${stats.totalRevenue.toLocaleString()}`, unit: "ETB", icon: FaDollarSign, color: "emerald", trend: "+12.5%" },
                { label: "Relayed Protocols", value: stats.totalOrders, unit: "UNITS", icon: FaShoppingBag, color: "blue", trend: "+8.2%" },
                { label: "Active Inventory SKUs", value: medicines.length, unit: "ENTRIES", icon: FaBox, color: "amber", trend: "Stable" },
                { label: "Efficiency Index", value: "98.4%", unit: "SCORE", icon: FaChartBar, color: "rose", trend: "+0.4%" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/30 border border-slate-50 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700`}></div>
                  <div className={`w-14 h-14 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mb-8`}>
                    <stat.icon className={`text-2xl text-${stat.color}-600`} />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</h4>
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{stat.unit}</span>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Revenue Momentum */}
            <div className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-gray-200/40 border border-gray-50 mb-12">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-1">Financial Momentum</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-none">Global Revenue Distribution by Month</p>
                </div>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Growth Phase</span>
                </div>
              </div>

              <div className="flex items-end space-x-6 h-80 border-b border-gray-100 pb-4">
                {stats.revenueByMonth?.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full bg-emerald-600 rounded-2xl transition-all duration-700 hover:bg-emerald-900 cursor-pointer relative shadow-lg shadow-emerald-100"
                      style={{ height: `${Math.max(10, (item.revenue / Math.max(...stats.revenueByMonth.map(r => r.revenue))) * 100)}%` }}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-xl border border-white/10 shadow-2xl">
                        {item.revenue.toLocaleString()} ETB
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-6">M-{item._id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "medicines" && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Inventory Control</h3>
              <button
                onClick={() => { setShowMedicineForm(true); setEditingMedicine(null); setMedicineForm({ name: "", description: "", category: "Pain Relief", price: "", stock: "", manufacturer: "", requiresPrescription: false, dosage: "", sideEffects: "", image: "" }); setImagePreview(null); }}
                className="btn-primary flex items-center space-x-3 px-8 shadow-emerald-200"
              >
                <FaPlus />
                <span>REGISTER ITEM</span>
              </button>
            </div>

            {showMedicineForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowMedicineForm(false)}></div>
                <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
                  <div className="p-12">
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8">{editingMedicine ? 'Update Item' : 'New Registration'}</h3>
                    <form onSubmit={handleMedicineSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Image Upload Area */}
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Product Visual</label>
                        <div className="flex items-center space-x-8">
                          <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex items-center justify-center relative">
                            {imagePreview ? (
                              <img src={imagePreview} className="w-full h-full object-cover" />
                            ) : (
                              <FaCloudUploadAlt className="text-3xl text-gray-300" />
                            )}
                            {uploadingImage && <div className="absolute inset-0 bg-white/60 flex items-center justify-center"><div className="w-6 h-6 border-2 border-emerald-600 border-b-transparent rounded-full animate-spin"></div></div>}
                          </div>
                          <div className="flex-1">
                            <input type="file" onChange={handleImageUpload} className="hidden" id="admin-file-upload" />
                            <label htmlFor="admin-file-upload" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-black transition-all">Select Image Source</label>
                            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-wider">Recommended: Square Aspect Ratio, Min 800px</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Item Name</label>
                        <input type="text" value={medicineForm.name} onChange={(e) => setMedicineForm({ ...medicineForm, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold" required />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Classification</label>
                        <select value={medicineForm.category} onChange={(e) => setMedicineForm({ ...medicineForm, category: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold appearance-none">
                          {["Pain Relief", "Antibiotics", "Vitamins", "Cold & Flu", "Digestive Health", "Heart Health", "Diabetes", "Skin Care", "First Aid", "Other"].map(cat => (
                            <option key={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Manifest Value (ETB)</label>
                        <input type="number" step="0.01" value={medicineForm.price} onChange={(e) => setMedicineForm({ ...medicineForm, price: e.target.value })} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 transition-all font-black text-slate-900 outline-none" required />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Logistic Stock (Units)</label>
                        <input type="number" value={medicineForm.stock} onChange={(e) => setMedicineForm({ ...medicineForm, stock: e.target.value })} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 transition-all font-black text-slate-900 outline-none" required />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Clinical Description</label>
                        <textarea value={medicineForm.description} onChange={(e) => setMedicineForm({ ...medicineForm, description: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold" rows="3" required />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" checked={medicineForm.requiresPrescription} onChange={(e) => setMedicineForm({ ...medicineForm, requiresPrescription: e.target.checked })} className="w-6 h-6 border-none bg-gray-100 rounded-lg text-emerald-600 focus:ring-0" />
                          <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Medical Auth Required (Rx)</span>
                        </label>
                      </div>

                      <div className="md:col-span-2 flex space-x-6 pt-6">
                        <button type="submit" className="btn-primary flex-1 py-5 rounded-[2rem] text-lg font-black">{editingMedicine ? 'UPDATE CATALOG' : 'REGISTER ITEM'}</button>
                        <button type="button" onClick={() => setShowMedicineForm(false)} className="bg-gray-100 text-gray-400 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Info</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-bold text-gray-900">
                  {medicines.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-inner border border-gray-100 overflow-hidden">
                            <img src={item.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100"} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black text-gray-900">{item.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.manufacturer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full tracking-widest uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-emerald-600 font-black tracking-tighter text-xl">
                        {item.price.toLocaleString()} <span className="text-[10px] text-slate-300 uppercase tracking-widest">ETB</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 bg-slate-100 h-2 rounded-full w-24 overflow-hidden border border-slate-50 shadow-inner">
                            <div className={`h-full rounded-full transition-all duration-1000 ${item.stock < 10 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, item.stock)}%` }}></div>
                          </div>
                          <span className={`text-xs font-black ${item.stock < 10 ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`}>{item.stock}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditMedicine(item)} className="p-3 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-xl transition-all"><FaEdit /></button>
                          <button onClick={() => handleDeleteMedicine(item._id)} className="p-3 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-xl transition-all"><FaTrash /></button>
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
          <div className="animate-fade-in space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-10 overflow-hidden relative">
                {/* Designer element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[4rem] -z-10 group-hover:scale-110 transition-transform"></div>

                <div className="flex flex-col lg:flex-row justify-between gap-12">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                        ORD-#{order._id.slice(-6).toUpperCase()}
                      </div>
                      <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                      {order.payment?.method && (
                        <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl">
                          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{order.payment.method}</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${order.payment.confirmed ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 pt-8 border-t border-gray-50">
                      <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Patient Information</h4>
                        <p className="font-black text-gray-900 text-lg">{order.user.name}</p>
                        <p className="text-gray-500 font-bold text-sm mt-1">{order.user.email}</p>
                        <p className="text-gray-500 font-bold text-sm mt-1">{order.deliveryAddress.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Logistics Target</h4>
                        <p className="text-gray-900 font-black text-sm">
                          {order.deliveryAddress.street}, <br />
                          {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Treatment Manifest</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-inner font-black text-xs flex items-center justify-center border border-gray-100">
                              {item.quantity}
                            </div>
                            <span className="font-black text-gray-900 uppercase text-sm">{item.medicine.name}</span>
                          </div>
                          <span className="font-black text-emerald-600">{item.price.toLocaleString()} <span className="text-[9px] text-slate-300 uppercase tracking-widest">ETB</span></span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center px-6 pt-10">
                        <span className="font-black text-slate-300 uppercase tracking-[0.3em] text-[10px]">Settlement Amount</span>
                        <div className="text-right">
                          <span className="text-4xl font-black text-slate-900 tracking-tighter">{order.totalAmount.toLocaleString()}</span>
                          <span className="text-xs font-black text-slate-300 uppercase tracking-widest block mt-1">Ethiopian Birr</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-80 space-y-6">
                    {/* Flow Control */}
                    <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Manifest Status Control</h4>

                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment</p>
                            <p className={`font-black text-sm mt-1 ${order.payment?.confirmed ? 'text-emerald-600' : 'text-rose-500'}`}>{order.payment?.confirmed ? 'Paid' : 'Unpaid'}</p>
                          </div>
                          {!order.payment?.confirmed && (
                            <button onClick={() => handleConfirmPayment(order._id)} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">Confirm Payment</button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleUpdateOrderStatus(order._id, s)}
                            className={`w-full flex items-center justify-between px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${order.status === s
                              ? 'bg-gray-900 text-white shadow-xl shadow-black/20'
                              : 'bg-white text-gray-400 border border-gray-100 hover:border-emerald-500 hover:text-emerald-600'
                              }`}
                          >
                            <span>{s}</span>
                            {order.status === s && <MdCheck className="text-lg" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Prescription Check */}
                    {order.prescriptionImage && (
                      <div className="bg-white border-2 border-emerald-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-colors pointer-events-none"></div>
                        <MdVisibility className="text-4xl text-emerald-600 mb-4" />
                        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Auth Document Attached</h4>
                        <a
                          href={order.prescriptionImage}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-[10px] font-black text-emerald-600 underline uppercase tracking-widest hover:text-emerald-800 transition-colors"
                        >
                          View Verification PDF
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(order.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.payment === 'Paid' ? (
                          <span className="text-green-500">Paid</span>
                        ) : (
                          <span className="text-yellow-500">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <FaBox className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales} sold</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

  {/* Recent Activity */ }
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Recent Activity</h2>
    </div>
    <div className="p-4">
      <div className="space-y-4">
        {[/* ... */].map((activity) => (
          <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              {activity.icon}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
      </main >
    </div >
  );
};

export default AdminDashboard;
