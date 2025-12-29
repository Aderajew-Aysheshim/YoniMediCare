import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import {
  FaShoppingCart,
  FaUserPlus,
  FaSignInAlt,
  FaPills,
  FaTruck,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaBox,
  FaSearch,
  FaFilter,
  FaHeartbeat
} from 'react-icons/fa';

const OrderNow = () => {
  const { user, loading } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in and is a pharmacy, redirect to medicines page
    if (!loading && user && user.role === 'user') {
      navigate('/medicines');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-b-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-900 font-black uppercase tracking-widest text-xs">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is admin, show admin message
  if (user && user.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-emerald-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Admin Access Detected</h1>
            <p className="text-gray-600 mb-8">
              You're logged in as an administrator. To place orders, you need to access the pharmacy portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admin"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Back to Admin Dashboard
              </Link>
              <Link
                to="/pharmacy"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Go to Pharmacy Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is already logged in as pharmacy, redirect message (should redirect automatically)
  if (user && user.role === 'user') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-b-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-900 font-black uppercase tracking-widest text-xs">Redirecting to medicines...</p>
        </div>
      </div>
    );
  }

  // Main Order Now page for non-logged-in users
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">Order Medicines Now</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Access Ethiopia's largest digital pharmacy catalog and order medicines with fast delivery
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Why Order From YoniMediCare?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FaPills className="text-emerald-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">1000+ Medicines</h3>
              <p className="text-gray-600 text-sm">Extensive catalog from trusted manufacturers</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FaTruck className="text-emerald-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Express delivery to your pharmacy location</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FaShieldAlt className="text-emerald-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">All medicines meet regulatory standards</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FaClock className="text-emerald-600 text-xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer assistance</p>
            </div>
          </div>
        </section>

        {/* Authentication Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Get Started With Ordering</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* New Pharmacy Registration */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserPlus className="text-emerald-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">New Pharmacy?</h3>
                <p className="text-gray-600">Register your pharmacy and start ordering today</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-emerald-600" />
                  <span className="text-sm text-gray-700">Create your pharmacy account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-emerald-600" />
                  <span className="text-sm text-gray-700">Submit license verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-emerald-600" />
                  <span className="text-sm text-gray-700">Start ordering immediately</span>
                </div>
              </div>

              <Link
                to="/register"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors"
              >
                <FaUserPlus />
                <span>Register Your Pharmacy</span>
                <FaArrowRight />
              </Link>
            </div>

            {/* Existing Pharmacy Login */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSignInAlt className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Already Registered?</h3>
                <p className="text-gray-600">Login to your pharmacy account to order</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-blue-600" />
                  <span className="text-sm text-gray-700">Access your order history</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-blue-600" />
                  <span className="text-sm text-gray-700">Track current orders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-blue-600" />
                  <span className="text-sm text-gray-700">Manage your account</span>
                </div>
              </div>

              <Link
                to="/login"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                <FaSignInAlt />
                <span>Login to Pharmacy</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Demo Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-black mb-6 text-center">Try Our Demo</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <FaBox className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold mb-2">Browse Catalog</h3>
                <p className="text-purple-100 text-sm">Explore our extensive medicine collection</p>
              </div>
              <div>
                <FaSearch className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold mb-2">Easy Search</h3>
                <p className="text-purple-100 text-sm">Find medicines quickly with smart search</p>
              </div>
              <div>
                <FaFilter className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold mb-2">Smart Filters</h3>
                <p className="text-purple-100 text-sm">Filter by category, price, and more</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-colors"
              >
                <span>Try Demo Login</span>
                <FaArrowRight />
              </Link>
              <p className="text-purple-200 text-sm mt-2">Use pharmacy@yonimedicare.com / pharmacy123</p>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">How Ordering Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaUserPlus, title: "1. Register/Login", desc: "Create account or login to your pharmacy" },
              { icon: FaSearch, title: "2. Browse", desc: "Search and filter medicines" },
              { icon: FaShoppingCart, title: "3. Add to Cart", desc: "Select medicines and quantities" },
              { icon: FaTruck, title: "4. Order", desc: "Checkout and get fast delivery" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-emerald-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-black mb-4">Ready to Order?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of pharmacies using YoniMediCare for reliable medicine distribution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center space-x-2"
              >
                <FaUserPlus />
                <span>Register Pharmacy</span>
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center space-x-2"
              >
                <FaSignInAlt />
                <span>Login Now</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderNow;
