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
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/cart" className="flex items-center text-gray-400 hover:text-emerald-600 font-black text-[10px] tracking-widest uppercase mb-4 transition-colors">
            <FaArrowLeft className="mr-2" />
            BACK TO HUB
          </Link>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">Finalization</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-3xl font-bold text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Step 1: Delivery */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">1</div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Logistics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={deliveryAddress.street}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={deliveryAddress.city}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">State / Region</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={deliveryAddress.state}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={deliveryAddress.zipCode}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={deliveryAddress.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method - Elite Local Integration */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">3</div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Settlement Manifest</h2>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-10">Select your preferred local payment gateway.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { id: "telebirr", name: "Telebirr", sub: "Fast Mobile Pay", color: "text-blue-600", acc: "0912345678" },
                    { id: "cbe", name: "CBE Bank", sub: "Commercial Bank", color: "text-purple-700", acc: "1000123456789" },
                    { id: "dashen", name: "Dashen Bank", sub: "Premier Banking", color: "text-blue-800", acc: "2000987654321" },
                    { id: "berhan", name: "Berhan Bank", sub: "Clinical Ethics", color: "text-emerald-700", acc: "3000555666777" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${paymentMethod === method.id
                        ? 'border-emerald-600 bg-emerald-50/30'
                        : 'border-gray-50 bg-gray-50/50 hover:bg-gray-100'
                        }`}
                    >
                      {paymentMethod === method.id && (
                        <div className="absolute top-4 right-4 text-emerald-600"><FaCheck className="text-sm" /></div>
                      )}
                      <p className={`text-lg font-black tracking-tighter ${method.color}`}>{method.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{method.sub}</p>
                      {paymentMethod === method.id && (
                        <div className="mt-4 pt-4 border-t border-emerald-100 animate-fade-in">
                          <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Account Target:</p>
                          <p className="text-sm font-black text-gray-900 mt-1">{method.acc}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-tighter">YoniMediCare Pharmaceuticals</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Transaction ID / Reference (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter the ID from your payment SMS/Receipt"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold placeholder:text-gray-300"
                  />
                  <p className="mt-3 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Payment will be manually verified by the pharmacy root</p>
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
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[3rem] -z-10"></div>
                <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Treatment List</h3>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.medicine._id} className="flex justify-between items-center group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shadow-inner font-black text-xs flex items-center justify-center">
                          {item.quantity}×
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 truncate max-w-[120px]">{item.medicine.name}</p>
                          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{item.medicine.category}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-gray-900">${(item.medicine.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-emerald-50 space-y-4">
                  <div className="flex justify-between text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-black">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                    <span>Logistics</span>
                    <span className="text-gray-900 font-black">${SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-emerald-600 pt-4 tracking-tighter">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                {/* Cyber decoration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-full h-full border border-emerald-400 rounded-2xl"></div>
                </div>
                <MdSecurity className="text-4xl text-emerald-400 mb-4" />
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Vault Protection</h4>
                <p className="text-emerald-300 text-[10px] font-bold leading-relaxed uppercase tracking-wider">Your clinical and financial data is encrypted and managed by licensed pharmaceutical standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
