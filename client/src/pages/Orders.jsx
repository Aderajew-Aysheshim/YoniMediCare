import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaClipboard, FaFilePrescription, FaRedo } from "react-icons/fa";
import { MdHistory, MdKeyboardArrowRight, MdLaunch } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    pending: { label: "Awaiting Auth", icon: FaClipboard, color: "text-amber-500", step: 1 },
    processing: { label: "Preparing Meds", icon: FaBox, color: "text-blue-500", step: 2 },
    shipped: { label: "In Transit", icon: FaTruck, color: "text-indigo-500", step: 3 },
    delivered: { label: "Delivered", icon: FaCheckCircle, color: "text-emerald-500", step: 4 },
    cancelled: { label: "Voided", icon: FaTimesCircle, color: "text-rose-500", step: 0 },
  };

  if (loading) return (
    <div className="min-h-screen bg-[#fcfcfd] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-b-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-emerald-900 font-black uppercase tracking-widest text-[10px]">Retrieving Medical History...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase mb-2">My Manifests</h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Track your pharmaceutical journey</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-20 text-center animate-fade-in">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <MdHistory className="text-4xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">No History Detected</h2>
            <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">Your medical order history is currently empty. Start your first treatment plan today.</p>
            <Link
              to="/medicines"
              className="btn-primary inline-flex items-center space-x-3 px-10 py-4 shadow-emerald-200"
            >
              <span className="font-black uppercase tracking-widest text-xs">Explore Catalog</span>
              <MdKeyboardArrowRight className="text-xl" />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => {
              const currentStatus = statusMap[order.status] || statusMap.pending;
              return (
                <div key={order._id} className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/40 border border-gray-50 overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                  <div className="p-10 md:p-12">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Reference</span>
                          <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase">#{order._id.slice(-8).toUpperCase()}</span>
                        </div>
                        <p className="text-gray-400 font-bold text-xs">Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          order.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            'bg-gray-50 text-gray-900 border-gray-100'
                          }`}>
                          <currentStatus.icon className="text-sm" />
                          <span>{currentStatus.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Tracker (only if not cancelled) */}
                    {order.status !== 'cancelled' && (
                      <div className="relative mb-16 px-4">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2"></div>
                        <div
                          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-1000"
                          style={{ width: `${((currentStatus.step - 1) / 3) * 100}%` }}
                        ></div>
                        <div className="relative flex justify-between">
                          {[1, 2, 3, 4].map((step) => {
                            const stepInfo = Object.values(statusMap).find(s => s.step === step);
                            const isActive = currentStatus.step >= step;
                            return (
                              <div key={step} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 border-4 ${isActive ? 'bg-emerald-500 border-white shadow-lg shadow-emerald-200 text-white' : 'bg-white border-gray-100 text-gray-300'
                                  }`}>
                                  <stepInfo.icon className="text-xs" />
                                </div>
                                <span className={`mt-4 text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                                  {stepInfo.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="space-y-6 mb-12">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Treatment Breakdown</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-500">
                          <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-inner border border-gray-100 overflow-hidden">
                              <img src={item.medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100"} alt={item.medicine.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-black text-gray-900 uppercase text-sm tracking-tight">{item.medicine.name}</p>
                              <p className="text-[10px] font-black text-emerald-600 tracking-widest uppercase mt-0.5">{item.medicine.category}</p>
                              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right font-black text-gray-900 tracking-tighter text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between gap-10">
                      <div className="flex-1 md:max-w-xs">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Logistics Target</h4>
                        <p className="text-gray-900 font-black text-sm leading-relaxed">
                          {order.deliveryAddress.street}<br />
                          {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                        </p>
                      </div>

                      {order.prescriptionImage && (
                        <div className="flex-1 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6 rounded-[2rem] border border-emerald-500/10 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                              <FaFilePrescription className="text-xl" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Medical Validation</p>
                              <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Authorized PDF</p>
                            </div>
                          </div>
                          <a href={order.prescriptionImage} target="_blank" rel="noreferrer" className="p-3 bg-white text-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <MdLaunch className="text-xl" />
                          </a>
                        </div>
                      )}

                      <div className="text-right flex flex-col justify-end">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Settlement</p>
                        <p className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-6">${order.totalAmount.toFixed(2)}</p>

                        <Link to="/medicines" className="inline-flex items-center justify-center space-x-3 bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                          <FaRedo />
                          <span>REORDER REGIMEN</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
