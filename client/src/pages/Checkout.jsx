import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { FaCloudUploadAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import { MdOutlinePayments, MdSecurity } from "react-icons/md";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    phone: user?.phone || "",
  });

  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [transactionId, setTransactionId] = useState("");

  const requiresPrescription = cartItems.some(
    (item) => item.medicine.requiresPrescription
  );

  const handleChange = (e) => {
    setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescriptionPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (requiresPrescription && !prescriptionFile) {
      setError("Critical Requirement: Please upload your prescription to continue.");
      return;
    }

    setLoading(true);

    try {
      let prescriptionUrl = null;

      // Upload prescription if provided
      if (prescriptionFile) {
        const formData = new FormData();
        formData.append("prescription", prescriptionFile);

        const uploadResponse = await api.post("/upload/prescription", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        prescriptionUrl = uploadResponse.data.fileUrl;
      }

      // Create order
      const orderData = {
        items: cartItems.map((item) => ({
          medicine: item.medicine._id,
          quantity: item.quantity,
          price: item.medicine.price,
        })),
        deliveryAddress,
        prescriptionImage: prescriptionUrl,
        payment: {
          method: paymentMethod,
          transactionId: transactionId,
        }
      };

      await api.post("/orders", orderData);

      setOrderPlaced(true);
      clearCart();
      setTimeout(() => {
        navigate("/orders");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Hyperlink Error: Connection to pharmacy failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] shadow-2xl p-16 text-center max-w-xl animate-fade-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <FaCheck className="text-4xl text-emerald-600" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">ORDER SECURED</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-8">Redirecting to order tracking...</p>
          <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full w-full animate-progress-bar origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const SHIPPING_COST = 5.00;
  const total = getCartTotal() + SHIPPING_COST;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Authorization Header */}
      <div className="bg-[#020617] pt-28 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/cart" className="group inline-flex items-center text-slate-400 hover:text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-12 transition-all">
            <FaArrowLeft className="mr-3 group-hover:-translate-x-2 transition-transform" />
            RETURN TO HUB
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                Security clearance required
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                ORDER <span className="text-emerald-500">AUTHORIZATION</span>
              </h1>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Liability</span>
              <span className="text-5xl font-black text-emerald-500">{total.toLocaleString()} <span className="text-xl text-slate-600">ETB</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-3xl font-bold text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Step 1: Logistics */}
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -z-10"></div>
                <div className="flex items-center space-x-6 mb-12">
                  <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">01</div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Logistics Manifest</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Designate distribution target</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Street Protocol</label>
                    <input
                      type="text"
                      name="street"
                      placeholder="e.g., Bole Road, House 123"
                      required
                      value={deliveryAddress.street}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Urban Zone (City)</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g., Addis Ababa"
                      required
                      value={deliveryAddress.city}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Administrative Region</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="e.g., Addis Ababa"
                      required
                      value={deliveryAddress.state}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Protocol Relay Code (Zip)</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="e.g., 1000"
                      required
                      value={deliveryAddress.zipCode}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Direct Comm Line (Phone)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g., +251 9..."
                      required
                      value={deliveryAddress.phone}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Prescription Validation (Conditional) */}
              {requiresPrescription && (
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-10"></div>
                  <div className="flex items-center space-x-6 mb-12">
                    <div className="bg-emerald-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">02</div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Verification Assets</h2>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Clinical prescription mandatory</p>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="file"
                      id="prescription"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor="prescription"
                      className={`block w-full border-2 border-dashed rounded-[2rem] p-12 text-center cursor-pointer transition-all ${prescriptionPreview ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
                        }`}
                    >
                      {prescriptionPreview ? (
                        <div className="relative inline-block">
                          <img src={prescriptionPreview} alt="Preview" className="max-h-64 rounded-2xl shadow-2xl transition-transform group-hover:scale-105" />
                          <div className="absolute -top-4 -right-4 bg-emerald-600 text-white p-2 rounded-full shadow-xl">
                            <FaCheck />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
                            <FaCloudUploadAlt className="text-4xl text-slate-300" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Upload Authorized Manifest</p>
                          <p className="text-xs text-slate-300 font-medium">JPEG, PNG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -z-10"></div>
                <div className="flex items-center space-x-6 mb-12">
                  <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">{requiresPrescription ? '03' : '02'}</div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Settlement Protocol</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Authorized transaction relay</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {[
                    { id: "telebirr", name: "Telebirr", sub: "Mobile Logic", color: "text-blue-500", acc: "0912345678" },
                    { id: "cbe", name: "CBE Bank", sub: "Regional Reserve", color: "text-purple-600", acc: "100012345678" },
                    { id: "dashen", name: "Dashen Bank", sub: "Commercial Auth", color: "text-blue-700", acc: "200098765432" },
                    { id: "manual", name: "Manual Transfer", sub: "Direct Relay", color: "text-emerald-700", acc: "Institutional Portal" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-8 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group ${paymentMethod === method.id
                        ? 'border-emerald-500 bg-emerald-50/20'
                        : 'border-slate-50 bg-slate-50/50 hover:border-slate-100 hover:bg-slate-100/50'
                        }`}
                    >
                      {paymentMethod === method.id && (
                        <div className="absolute top-6 right-6 text-emerald-600"><FaCheck /></div>
                      )}
                      <p className={`text-xl font-black uppercase tracking-tighter ${method.color}`}>{method.name}</p>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mt-1">{method.sub}</p>

                      {paymentMethod === method.id && (
                        <div className="mt-6 pt-6 border-t border-emerald-100 animate-slide-in">
                          <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Protocol Address:</p>
                          <p className="text-sm font-black text-slate-900 mt-1">{method.acc}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Transaction Reference ID</label>
                  <input
                    type="text"
                    placeholder="ENTER SMS/RECEIPT TRANSACTION ID..."
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-black text-xs uppercase tracking-widest text-slate-900 outline-none placeholder:text-slate-200"
                  />
                  <div className="mt-4 flex items-center space-x-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                    <MdSecurity className="text-sm" />
                    <span>Transaction will undergo root verification</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Action */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-6 rounded-3xl text-2xl flex items-center justify-center space-x-4 shadow-emerald-200 uppercase tracking-tighter"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-6 w-6 border-b-2 border-white rounded-full"></div>
                      <span>AUTHORIZING...</span>
                    </>
                  ) : (
                    <>
                      <MdSecurity className="text-3xl" />
                      <span>EXECUTE SHIPMENT</span>
                    </>
                  )}
                </button>
                <p className="text-center mt-6 text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">By placing order you agree to the medical terms of service</p>
              </div>
            </form>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-10">
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -z-10"></div>
                <h3 className="text-xs font-black text-slate-400 mb-10 uppercase tracking-[0.4em] border-b border-slate-50 pb-6">Protocol List</h3>

                <div className="space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.medicine._id} className="flex justify-between items-center group">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl overflow-hidden shadow-inner font-black text-xs flex items-center justify-center text-slate-900 border border-slate-100">
                          {item.quantity}×
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 truncate max-w-[140px] uppercase tracking-tight">{item.medicine.name}</p>
                          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">{item.medicine.category}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-900">{(item.medicine.price * item.quantity).toLocaleString()} <span className="text-[10px] text-slate-300">ETB</span></span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-10 border-t border-slate-50 space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Subtotal</span>
                    <span className="text-sm font-black text-slate-900">{getCartTotal().toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distribution Fee</span>
                    <span className="text-sm font-black text-slate-900">{SHIPPING_COST.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex flex-col pt-6">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Final Settlement</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{total.toLocaleString()} <span className="text-lg text-slate-300">ETB</span></span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.2),transparent)]"></div>
                <MdSecurity className="text-4xl text-emerald-500 mb-6 relative z-10" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-3 relative z-10 text-white">Vault Clearance</h4>
                <p className="text-slate-400 text-[10px] font-medium leading-relaxed uppercase tracking-widest relative z-10">Institutional encryption protocols active. Secure distribution relay initiated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
