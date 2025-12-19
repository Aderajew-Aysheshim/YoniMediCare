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
  const [activeTab, setActiveTab] = useState("description");

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
    // Success animation could go here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-4"></div>
          <p className="text-gray-500 font-bold animate-pulse">Loading Premium Care...</p>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdInfo className="text-4xl text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Medicine missing</h2>
          <p className="text-gray-500 mb-8">The product you're looking for might have been moved or discontinued.</p>
          <button
            onClick={() => navigate("/medicines")}
            className="btn-primary w-full shadow-none"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-500 hover:text-emerald-600 font-black mb-10 transition-colors"
        >
          <div className="bg-white p-2 rounded-xl shadow-sm mr-4 group-hover:shadow-md transition-all">
            <FaArrowLeft />
          </div>
          BACK
        </button>

        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden relative">
          {/* Dynamic Background Blob */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/4 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 lg:p-16 relative z-10">
            {/* Hero Gallery (Simplified for now) */}
            <div className="space-y-6">
              <div className="relative group aspect-square rounded-[2rem] overflow-hidden bg-white border border-gray-50 shadow-inner">
                <img
                  src={medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"}
                  alt={medicine.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {medicine.requiresPrescription && (
                    <span className="glass-dark text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-xl">
                      Prescription Required
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg border border-emerald-100">
                    {medicine.category}
                  </span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50/80 p-4 rounded-2xl text-center">
                  <MdVerified className="text-2xl text-emerald-600 mx-auto mb-2" />
                  <span className="text-[10px] font-black uppercase text-gray-400">Verified Item</span>
                </div>
                <div className="bg-gray-50/80 p-4 rounded-2xl text-center">
                  <MdSecurity className="text-2xl text-emerald-600 mx-auto mb-2" />
                  <span className="text-[10px] font-black uppercase text-gray-400">Safe Storage</span>
                </div>
                <div className="bg-gray-50/80 p-4 rounded-2xl text-center">
                  <MdLocalPharmacy className="text-2xl text-emerald-600 mx-auto mb-2" />
                  <span className="text-[10px] font-black uppercase text-gray-400">Pharmacy Auth</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col">
              <div className="mb-8">
                <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter leading-tight">{medicine.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-black text-emerald-600">${medicine.price.toFixed(2)}</span>
                  <span className="text-gray-400 line-through text-lg">${(medicine.price * 1.2).toFixed(2)}</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-md font-black">SAVE 20%</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-8 border-b border-gray-100 mb-8">
                {["description", "details", "safety"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-emerald-600" : "text-gray-400"
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full animate-fade-in"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-grow min-h-[160px] animate-fade-in">
                {activeTab === "description" && (
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    {medicine.description}
                  </p>
                )}
                {activeTab === "details" && (
                  <div className="space-y-4 font-bold text-gray-700">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-400 uppercase text-[10px]">Manufacturer</span>
                      <span>{medicine.manufacturer}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-400 uppercase text-[10px]">Dosage Form</span>
                      <span>{medicine.dosage || "Tablets"}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400 uppercase text-[10px]">Stock Status</span>
                      <span className={medicine.stock > 0 ? "text-emerald-600" : "text-red-500"}>
                        {medicine.stock > 0 ? `${medicine.stock} IN STOCK` : "OUT OF STOCK"}
                      </span>
                    </div>
                  </div>
                )}
                {activeTab === "safety" && (
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                    <h4 className="text-red-800 font-black mb-3 text-sm uppercase">Side Effects & Guidance</h4>
                    <p className="text-red-700 text-sm leading-relaxed font-medium">
                      {medicine.sideEffects || "Consult a professional before use. Typical effects may include mild dizziness or fatigue."}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-12 space-y-8">
                {medicine.stock > 0 && (
                  <div className="flex items-center space-x-8">
                    <div className="bg-gray-100 p-2 rounded-2xl flex items-center space-x-6">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-700 hover:text-emerald-600 transition-colors"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-xl font-black w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(q => Math.min(medicine.stock, q + 1))}
                        className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-700 hover:text-emerald-600 transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Only {medicine.stock} items <br /> remaining in stock
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={medicine.stock === 0}
                    className={`flex-grow py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 shadow-2xl transition-all duration-300 transform active:scale-95 ${medicine.stock === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        : "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1"
                      }`}
                  >
                    <FaShoppingCart className="text-2xl" />
                    <span>{medicine.stock === 0 ? "RESTOCKING..." : "ADD TO CART"}</span>
                  </button>

                  <button className="p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-emerald-500 transition-colors text-gray-400 hover:text-emerald-600">
                    <MdInfo className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Placeholder */}
        <div className="mt-20">
          <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">You might also need</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 opacity-50 select-none grayscale">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl h-64 border border-gray-100 shadow-sm flex items-center justify-center italic text-gray-300">
                Recommendation {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
