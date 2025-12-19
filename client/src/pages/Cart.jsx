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
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter uppercase">My Health Hub</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Review your selected treatments ({cartItems.length} items)</p>
          </div>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-black text-xs tracking-widest uppercase py-2 px-4 bg-red-50 rounded-xl transition-all"
          >
            Purge Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.medicine._id}
                className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={item.medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200"}
                    alt={item.medicine.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
                  />
                  {item.medicine.requiresPrescription && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg">
                      <MdSecurity className="text-xs" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <Link
                    to={`/medicines/${item.medicine._id}`}
                    className="text-xl font-black text-gray-900 hover:text-emerald-600 transition-colors tracking-tight"
                  >
                    {item.medicine.name}
                  </Link>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
                    {item.medicine.category}
                  </p>
                  <p className="text-emerald-600 font-black text-lg mt-3">
                    ${item.medicine.price.toFixed(2)} <span className="text-gray-300 text-xs font-bold">/ unit</span>
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Qty Manager */}
                  <div className="bg-gray-50 p-1.5 rounded-2xl flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.medicine._id, item.quantity - 1)}
                      className="bg-white hover:bg-emerald-50 text-gray-700 w-10 h-10 rounded-xl font-bold shadow-sm transition-all"
                    >
                      <FaMinus className="mx-auto text-xs" />
                    </button>
                    <span className="w-6 text-center font-black text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.medicine._id, item.quantity + 1)}
                      disabled={item.quantity >= item.medicine.stock}
                      className="bg-white hover:bg-emerald-50 text-gray-700 w-10 h-10 rounded-xl font-bold shadow-sm transition-all disabled:opacity-30"
                    >
                      <FaPlus className="mx-auto text-xs" />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="text-2xl font-black text-gray-900 tracking-tighter">
                      ${(item.medicine.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.medicine._id)}
                    className="p-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all"
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
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-gray-100 p-8 sticky top-28 overflow-hidden group">
              {/* Card Design Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 group-hover:scale-150 transition-transform duration-700"></div>

              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter uppercase">Summary</h2>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  <span>Subtotal</span>
                  <span className="text-gray-900 text-base font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  <span>Delivery Fee</span>
                  <span className="text-gray-900 text-base font-black">${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  <span>Tax (Included)</span>
                  <span className="text-gray-900 text-base font-black">$0.00</span>
                </div>

                <div className="border-t border-gray-100 pt-6 flex justify-between">
                  <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">Total Amount</span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-emerald-600 tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full py-5 rounded-2xl text-xl flex items-center justify-center space-x-3 shadow-emerald-200"
                >
                  <span>SECURE CHECKOUT</span>
                  <FaArrowRight />
                </button>
                <Link
                  to="/medicines"
                  className="w-full flex items-center justify-center py-4 text-emerald-600 font-black text-sm uppercase tracking-widest hover:underline"
                >
                  KEEP EXPLORING
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center space-x-4 grayscale opacity-30">
                <MdOutlinePayments className="text-2xl" />
                <div className="font-black text-[10px] uppercase tracking-widest mt-1">PCI Compliant System</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
