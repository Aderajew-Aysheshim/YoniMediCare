import { useState, useEffect } from "react";
import api from "../utils/api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("medicines");
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

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
  });

  useEffect(() => {
    if (activeTab === "medicines") {
      fetchMedicines();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await api.get("/medicines");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders/admin/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMedicineFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicineForm({
      ...medicineForm,
      [name]: type === "checkbox" ? checked : value,
    });
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
      setMedicineForm({
        name: "",
        description: "",
        category: "Pain Relief",
        price: "",
        stock: "",
        manufacturer: "",
        requiresPrescription: false,
        dosage: "",
        sideEffects: "",
      });
      fetchMedicines();
    } catch (error) {
      console.error("Error saving medicine:", error);
      alert("Failed to save medicine");
    }
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setMedicineForm(medicine);
    setShowMedicineForm(true);
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await api.delete(`/medicines/${id}`);
        fetchMedicines();
      } catch (error) {
        console.error("Error deleting medicine:", error);
        alert("Failed to delete medicine");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("medicines")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === "medicines"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            Medicines
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === "orders"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            Orders
          </button>
        </div>

        {/* Medicines Tab */}
        {activeTab === "medicines" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Medicines</h2>
              <button
                onClick={() => {
                  setShowMedicineForm(!showMedicineForm);
                  setEditingMedicine(null);
                  setMedicineForm({
                    name: "",
                    description: "",
                    category: "Pain Relief",
                    price: "",
                    stock: "",
                    manufacturer: "",
                    requiresPrescription: false,
                    dosage: "",
                    sideEffects: "",
                  });
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Medicine</span>
              </button>
            </div>

            {/* Medicine Form */}
            {showMedicineForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {editingMedicine ? "Edit Medicine" : "Add New Medicine"}
                </h3>
                <form onSubmit={handleMedicineSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={medicineForm.name}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      required
                      value={medicineForm.category}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Pain Relief</option>
                      <option>Antibiotics</option>
                      <option>Vitamins</option>
                      <option>Cold & Flu</option>
                      <option>Digestive Health</option>
                      <option>Heart Health</option>
                      <option>Diabetes</option>
                      <option>Skin Care</option>
                      <option>First Aid</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <input
                      type="number"
                      name="price"
                      required
                      step="0.01"
                      value={medicineForm.price}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      required
                      value={medicineForm.stock}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer *</label>
                    <input
                      type="text"
                      name="manufacturer"
                      required
                      value={medicineForm.manufacturer}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                    <input
                      type="text"
                      name="dosage"
                      value={medicineForm.dosage}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      required
                      rows="3"
                      value={medicineForm.description}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects</label>
                    <textarea
                      name="sideEffects"
                      rows="2"
                      value={medicineForm.sideEffects}
                      onChange={handleMedicineFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="requiresPrescription"
                        checked={medicineForm.requiresPrescription}
                        onChange={handleMedicineFormChange}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Requires Prescription</span>
                    </label>
                  </div>

                  <div className="md:col-span-2 flex space-x-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      {editingMedicine ? "Update Medicine" : "Add Medicine"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMedicineForm(false);
                        setEditingMedicine(null);
                      }}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Medicines List */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {medicines.map((medicine) => (
                        <tr key={medicine._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{medicine.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{medicine.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${medicine.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medicine.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            <button
                              onClick={() => handleEditMedicine(medicine)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteMedicine(medicine._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {medicines.map((medicine) => (
                    <div key={medicine._id} className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{medicine.name}</h3>
                          <p className="text-sm text-gray-600">{medicine.category}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEditMedicine(medicine)}
                            className="text-blue-600 hover:text-blue-800 text-lg"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(medicine._id)}
                            className="text-red-600 hover:text-red-800 text-lg"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Price:</span>
                          <span className="ml-2 font-semibold text-emerald-600">${medicine.price.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Stock:</span>
                          <span className="ml-2 font-semibold">{medicine.stock}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Customer: {order.user.name} ({order.user.email})
                        </p>
                        <p className="text-sm text-gray-600">
                          Placed: {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm mb-1">
                          <span>{item.medicine.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-emerald-600">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <p className="text-sm text-gray-600">
                        <strong>Delivery Address:</strong> {order.deliveryAddress.street},{" "}
                        {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                        {order.deliveryAddress.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {order.deliveryAddress.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
