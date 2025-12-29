import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaTrash, FaShoppingCart, FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { MdOutlinePayments, MdSecurity, MdLocalShipping } from "react-icons/md";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const SHIPPING_COST = 5.00;
  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING_COST;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-16 lg:p-24 text-center">
            <div className="bg-emerald-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <FaShoppingCart className="text-5xl text-emerald-600" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Your cart is pristine</h2>
            <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">Looks like you haven't added any medicines yet. Our catalog is ready for you!</p>
            <Link
              to="/medicines"
              className="btn-primary px-12 py-5 text-xl shadow-2xl"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Institutional Manifest Header */}
      <div className="bg-[#020617] pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(16,185,129,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6 font-black uppercase tracking-widest text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Active Resource Manifest</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                MY <span className="text-emerald-500">MANIFEST</span>
              </h1>
              <p className="text-slate-400 text-sm mt-4 font-medium uppercase tracking-[0.2em]">Transaction relay awaiting authorization ({cartItems.length} entries)</p>
            </div>
            <button
              onClick={clearCart}
              className="text-white hover:text-red-400 font-black text-[10px] tracking-widest uppercase py-3 px-6 bg-white/5 border border-white/10 rounded-2xl transition-all backdrop-blur-md"
            >
              PURGE MANIFEST
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.medicine._id}
                className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-8 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-10 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-700"
              >
                <div className="relative w-36 h-36 flex-shrink-0 bg-slate-50 rounded-[2rem] p-4 flex items-center justify-center border border-slate-50 shadow-inner overflow-hidden">
                  <img
                    src={item.medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200"}
                    alt={item.medicine.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                  />
                  {item.medicine.requiresPrescription && (
                    <div className="absolute top-4 left-4 bg-slate-900 text-white p-2 rounded-xl shadow-xl border border-white/20">
                      <MdSecurity className="text-xs" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2 block">
                    {item.medicine.category}
                  </span>
                  <Link
                    to={`/medicines/${item.medicine._id}`}
                    className="text-2xl font-black text-slate-900 hover:text-emerald-600 transition-colors tracking-tight uppercase"
                  >
                    {item.medicine.name}
                  </Link>
                  <p className="text-slate-900 font-black text-xl mt-4">
                    {item.medicine.price.toLocaleString()} <span className="text-slate-300 text-xs uppercase tracking-widest">ETB / Unit</span>
                  </p>
                </div>

                <div className="flex items-center space-x-8">
                  {/* Qty Manager */}
                  <div className="bg-slate-50 p-2 rounded-[1.5rem] flex items-center space-x-5 border border-slate-100">
                    <button
                      onClick={() => updateQuantity(item.medicine._id, item.quantity - 1)}
                      className="bg-white hover:text-emerald-600 text-slate-400 w-12 h-12 rounded-xl font-black shadow-sm transition-all active:scale-90"
                    >
                      <FaMinus className="mx-auto text-xs" />
                    </button>
                    <span className="w-6 text-center font-black text-xl text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.medicine._id, item.quantity + 1)}
                      disabled={item.quantity >= item.medicine.stock}
                      className="bg-white hover:text-emerald-600 text-slate-400 w-12 h-12 rounded-xl font-black shadow-sm transition-all disabled:opacity-30 active:scale-90"
                    >
                      <FaPlus className="mx-auto text-xs" />
                    </button>
                  </div>

                  <div className="text-right min-w-[140px]">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Row Total</span>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">
                      {(item.medicine.price * item.quantity).toLocaleString()} <span className="text-xs text-slate-400">ETB</span>
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.medicine._id)}
                    className="p-4 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-4">
                <MdLocalShipping className="text-3xl text-blue-500 mt-1" />
                <div>
                  <h4 className="font-black text-blue-900 text-sm">Free Express Shipping</h4>
                  <p className="text-blue-700/70 text-xs font-bold mt-1 uppercase tracking-wider">On orders above $100</p>
                </div>
              </div>
              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-start space-x-4">
                <MdSecurity className="text-3xl text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-black text-emerald-900 text-sm">Secure Checkout</h4>
                  <p className="text-emerald-700/70 text-xs font-bold mt-1 uppercase tracking-wider">256-bit SSL Protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(2,6,23,0.15)] border border-slate-100 p-10 sticky top-28 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>

              <h2 className="text-xs font-black text-slate-400 mb-10 tracking-[0.4em] uppercase">Relay Summary</h2>

              <div className="space-y-8 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Subtotal</span>
                  <span className="text-xl font-black text-slate-900">{subtotal.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distribution Fee</span>
                  <span className="text-xl font-black text-slate-900">{SHIPPING_COST.toLocaleString()} ETB</span>
                </div>

                <div className="h-px bg-slate-100 w-full"></div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">Authorize Manifest Total</span>
                  <div className="flex flex-col">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">
                      {total.toLocaleString()}
                    </span>
                    <span className="text-sm font-black text-slate-300 uppercase tracking-widest mt-1">Ethiopian Birr</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center space-x-4 shadow-2xl shadow-slate-900/40 hover:bg-emerald-600 hover:-translate-y-2 transition-all duration-500 group"
                >
                  <MdSecurity className="text-xl group-hover:scale-125 transition-transform" />
                  <span>INITIATE AUTHORIZATION</span>
                </button>
                <Link
                  to="/medicines"
                  className="w-full flex items-center justify-center py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-emerald-600 transition-colors"
                >
                  Return to Manifest Search
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col items-center">
                <div className="flex space-x-6 grayscale opacity-20 mb-4">
                  <MdOutlinePayments className="text-3xl" />
                  <MdSecurity className="text-3xl" />
                  <MdLocalShipping className="text-3xl" />
                </div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Institutional Grade Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
