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
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* Institutional Manifest Header */}
      <div className="bg-[#020617] pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_70%)] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-3 mb-6 animate-fade-in">
              <span className="h-px w-8 bg-emerald-500/50"></span>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">Patient Resource Manifest</p>
              <span className="h-px w-8 bg-emerald-500/50"></span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
              HISTORICAL <span className="text-emerald-500">RELAYS</span>
            </h1>
            <p className="max-w-xl text-slate-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
              Active tracking and historical archives of all pharmacy transfers and pharmaceutical deployments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-20">

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
              <span className="font-black uppercase tracking-widest text-xs">Explore Pharmacy</span>
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
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Reference</span>
                          <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase shadow-xl shadow-slate-900/20">#{order._id.slice(-8).toUpperCase()}</span>
                        </div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Manifest Initiated: {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-lg shadow-emerald-500/5' :
                          order.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100 shadow-lg shadow-rose-500/5' :
                            'bg-slate-50 text-slate-900 border-slate-100 shadow-lg shadow-slate-500/5'
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
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Pharmacy Regimen Breakdown</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-slate-200/40 transition-all duration-700">
                          <div className="flex items-center space-x-8">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-inner border border-slate-100 overflow-hidden p-4">
                              <img src={item.medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100"} alt={item.medicine.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="font-black text-slate-900 uppercase text-lg tracking-tighter">{item.medicine.name}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-[9px] font-black text-emerald-600 tracking-widest uppercase bg-emerald-50 px-2 py-0.5 rounded-md">{item.medicine.category}</span>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Qty: {item.quantity} units</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-slate-900 tracking-tighter text-2xl">{(item.price * item.quantity).toLocaleString()}</p>
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">ETB</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between gap-12">
                      <div className="flex-1 md:max-w-xs">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="h-0.5 w-4 bg-emerald-500"></span>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Relay Target</h4>
                        </div>
                        <p className="text-slate-900 font-black text-sm leading-relaxed uppercase tracking-tight">
                          {order.deliveryAddress.street}<br />
                          {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Direct Dispatch Protocol Active</p>
                      </div>

                      {order.prescriptionImage && (
                        <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group/rx">
                          <div className="flex items-center space-x-5">
                            <div className="w-14 h-14 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center text-white transition-transform group-hover/rx:rotate-6">
                              <FaFilePrescription className="text-2xl" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Medical Validation</p>
                              <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Institutional Auth PDF</p>
                            </div>
                          </div>
                          <a href={order.prescriptionImage} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-xl shadow-xl hover:bg-emerald-600 transition-all">
                            <MdLaunch className="text-xl" />
                          </a>
                        </div>
                      )}

                      <div className="text-right flex flex-col justify-end">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Liability Settlement</p>
                        <div className="flex items-end justify-end space-x-3 mb-8">
                          <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{order.totalAmount.toLocaleString()}</span>
                          <span className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">ETB</span>
                        </div>

                        <Link to="/medicines" className="group/btn inline-flex items-center justify-center space-x-4 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/20">
                          <FaRedo className="group-hover/btn:rotate-180 transition-transform duration-700" />
                          <span>REINITIATE REGIMEN</span>
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
