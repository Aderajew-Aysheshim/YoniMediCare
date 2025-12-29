import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { MdVerified, MdSecurity, MdLocalPharmacy, MdInfo } from "react-icons/md";

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    fetchMedicine();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchMedicine = async () => {
    try {
      const response = await api.get(`/medicines/${id}`);
      setMedicine(response.data);
    } catch (error) {
      console.error("Error fetching medicine:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-4"></div>
          <p className="text-gray-500 font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Accessing Manifest...</p>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center p-12 bg-white rounded-[3rem] shadow-2xl max-w-md border border-slate-100">
          <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <MdInfo className="text-4xl text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Protocol Missing</h2>
          <p className="text-slate-500 mb-10 text-sm font-medium">The requested manifest entry is unavailable or has been reclassified.</p>
          <button
            onClick={() => navigate("/medicines")}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
          >
            Return to Inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* High-Impact Header */}
      <div className="bg-[#020617] pt-28 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(16,185,129,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center text-slate-400 hover:text-emerald-400 font-black mb-12 transition-all tracking-[0.2em] text-[10px]"
          >
            <FaArrowLeft className="mr-3 group-hover:-translate-x-2 transition-transform" />
            RETURN TO INVENTORY
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                Manifest protocol {medicine._id.slice(-6).toUpperCase()}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                {medicine.name}
              </h1>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Protocol Valuation</span>
              <span className="text-5xl font-black text-emerald-500">{medicine.price.toLocaleString()} <span className="text-xl text-slate-600">ETB</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Component */}
            <div className="p-12 lg:p-20 bg-slate-50 relative group overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent)]"></div>
              <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-slate-100 p-12">
                <img
                  src={medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"}
                  alt={medicine.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                />

                <div className="absolute top-8 left-8 flex flex-col gap-3">
                  {medicine.requiresPrescription && (
                    <span className="bg-slate-900 text-white text-[10px] px-5 py-2 rounded-full font-black uppercase tracking-widest shadow-xl">
                      Rx Mandatory
                    </span>
                  )}
                  <span className="bg-emerald-500 text-white text-[10px] px-5 py-2 rounded-full font-black uppercase tracking-widest shadow-xl">
                    {medicine.category}
                  </span>
                </div>
              </div>

              {/* Logistics Badges */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { icon: MdVerified, label: "Authenticated" },
                  { icon: MdSecurity, label: "Cold-Chain" },
                  { icon: MdLocalPharmacy, label: "Licensed" }
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <badge.icon className="text-3xl text-emerald-600 mb-3" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data & Actions Panel */}
            <div className="p-12 lg:p-20 flex flex-col">
              <div className="mb-12">
                <div className="h-1 w-12 bg-emerald-500 mb-10"></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Protocol Specifications</h3>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {medicine.description}
                </p>
              </div>

              {/* Technical Tabs */}
              <div className="flex space-x-10 border-b border-slate-100 mb-10">
                {["details", "safety", "analytics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? "text-slate-900" : "text-slate-300"
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 animate-slide-in"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-grow min-h-[200px]">
                {activeTab === "details" && (
                  <div className="space-y-6">
                    {[
                      { label: "Manufacturer", value: medicine.manufacturer },
                      { label: "Dosage Form", value: medicine.dosage || "Tablets" },
                      { label: "Institutional Stock", value: medicine.stock > 0 ? `${medicine.stock} PROTOCOLS` : "DEPLETED", highlight: medicine.stock > 0 }
                    ].map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-none">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{detail.label}</span>
                        <span className={`text-sm font-black ${detail.highlight ? "text-emerald-600" : "text-slate-900"}`}>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "safety" && (
                  <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <MdInfo className="text-amber-600 text-xl" />
                      <h4 className="text-amber-900 font-black text-[10px] uppercase tracking-widest">Clinical Advisory</h4>
                    </div>
                    <p className="text-amber-800 text-sm leading-relaxed font-medium">
                      {medicine.sideEffects || "Authorized personnel must verify patient eligibility prior to fulfillment. Standard protocols apply."}
                    </p>
                  </div>
                )}
                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Demand Rating</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[85%]"></div>
                        </div>
                        <span className="text-xs font-black text-slate-900 uppercase">High</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Zone */}
              <div className="mt-16 space-y-10">
                {medicine.stock > 0 && (
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-md transition-all active:scale-90"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-2xl font-black w-10 text-center text-slate-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity(q => Math.min(medicine.stock, q + 1))}
                        className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:shadow-md transition-all active:scale-90"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                      Limited Manifest <br /> {medicine.stock} Protocols Available
                    </div>
                  </div>
                )}

                <div className="flex gap-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={medicine.stock === 0}
                    className={`flex-grow py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center space-x-4 shadow-2xl transition-all duration-500 transform active:scale-95 ${medicine.stock === 0
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                      : "bg-slate-900 text-white shadow-slate-200 hover:bg-emerald-600 hover:-translate-y-2 group"
                      }`}
                  >
                    <FaShoppingCart className="text-xl group-hover:rotate-12 transition-transform" />
                    <span>{medicine.stock === 0 ? "MANIFEST DEPLETED" : "INITIATE TRANSFER"}</span>
                  </button>
                  <button className="p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-emerald-500 transition-all text-slate-300 hover:text-emerald-600 hover:shadow-xl">
                    <MdInfo className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Placeholder */}
        <div className="mt-20">
          <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">You might also need</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 opacity-50 select-none grayscale">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] h-64 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl mb-4"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Protocol {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
