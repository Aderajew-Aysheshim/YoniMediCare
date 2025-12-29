import { Link } from "react-router-dom";
import {
  MdVerifiedUser,
  MdLocalShipping,
  MdPriceChange,
  MdSecurity,
  MdPhonelinkSetup,
  MdAssignmentTurnedIn
} from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">
              Yon<span className="text-emerald-600">Medicare</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-900 font-medium hover:text-emerald-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">How It Works</Link>
              <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link>
              <Link
                to="/login"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition-colors"
              >
                Pharmacy Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted Medicine Distribution<br className="hidden md:block" /> for Pharmacies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            YonMedicare connects verified pharmacies with reliable, fast, and compliant medicine supply.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            Register Your Pharmacy
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20 lg:py-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Institutional Grade Distribution</p>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase animate-fade-in-up">
            EMPOWERING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 animate-gradient-x">
              ETHIOPIAN
            </span><br />
            PHARMACIES
          </h1>

          <p className="text-xl sm:text-2xl mb-12 text-slate-400 font-medium leading-relaxed max-w-2xl animate-fade-in-up delay-100">
            The premier medical distribution manifesto for healthcare institutions.
            Delivering <span className="text-white">clinical precision</span> across the nation.
          </p>

          <div className="flex flex-wrap gap-6 animate-fade-in-up delay-200">
            <Link to="/medicines" className="relative group overflow-hidden bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-emerald-500/25 shadow-2xl">
              <span className="relative z-10 flex items-center">
                EXPLORE INVENTORY <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            <Link to="/register" className="px-10 py-5 rounded-2xl border border-white/10 hover:border-white/30 text-white font-black uppercase tracking-widest text-xs backdrop-blur-sm hover:bg-white/5 transition-all">
              REQUEST ACCESS
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 gap-12 border-t border-white/5 pt-12 animate-fade-in-up delay-300">
            <div>
              <p className="text-3xl font-black text-white">10k+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Network Partners</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Verified Supply</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-3xl font-black text-white">24h</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Express Logistics</p>
            </div>
          </div>
        </div>
      </div>
      {/* Why YonMedicare */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose YonMedicare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MdVerifiedUser className="h-10 w-10 text-emerald-600" />,
                title: "Verified Medicines",
                description: "All medicines are batch-tracked and compliance-approved."
              },
              {
                icon: <MdLocalShipping className="h-10 w-10 text-emerald-600" />,
                title: "Fast Distribution",
                description: "Reliable logistics ensuring on-time delivery."
              },
              {
                icon: <MdPriceChange className="h-10 w-10 text-emerald-600" />,
                title: "Wholesale Pricing",
                description: "Best prices for registered pharmacies."
              },
              {
                icon: <MdSecurity className="h-10 w-10 text-emerald-600" />,
                title: "Secure Platform",
                description: "Role-based access and secure login."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <MdPhonelinkSetup className="h-8 w-8" />,
                title: "Register Pharmacy",
                description: "Create your pharmacy account with basic details"
              },
              {
                step: "2",
                icon: <MdVerifiedUser className="h-8 w-8" />,
                title: "Upload License",
                description: "Submit your pharmacy license for verification"
              },
              {
                step: "3",
                icon: <MdAssignmentTurnedIn className="h-8 w-8" />,
                title: "Order Medicines",
                description: "Browse catalog and place your orders"
              },
              {
                step: "4",
                icon: <MdLocalShipping className="h-8 w-8" />,
                title: "Get Fast Delivery",
                description: "Receive your order with our reliable logistics"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Grow Your Pharmacy with YonMedicare
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of pharmacies trusting YonMedicare Distribution.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-gray-100 shadow-lg transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 YonMedicare Distribution. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
