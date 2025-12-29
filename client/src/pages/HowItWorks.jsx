import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserPlus,
  FaCheckCircle,
  FaShoppingCart,
  FaTruck,
  FaHandshake,
  FaShieldAlt,
  FaClock,
  FaChartLine,
  FaUsers,
  FaHospital,
  FaBox,
  FaSearch,
  FaFileContract
} from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: FaUserPlus,
      title: "Register",
      description: "Partner pharmacies register on the YoniMedicare platform with their business details and licensing information.",
      details: ["Create account", "Submit business documents", "License verification"]
    },
    {
      icon: FaCheckCircle,
      title: "Verify",
      description: "YoniMedicare verifies the pharmacy licenses and approves registrations within 24-48 hours.",
      details: ["License verification", "Background check", "Account approval"]
    },
    {
      icon: FaShoppingCart,
      title: "Order",
      description: "Pharmacies place bulk medicine orders through the centralized catalog with competitive pricing.",
      details: ["Browse catalog", "Compare prices", "Place bulk orders"]
    },
    {
      icon: FaTruck,
      title: "Deliver",
      description: "Orders are processed, packed, and delivered via express logistics to your pharmacy location.",
      details: ["Order processing", "Quality packaging", "Fast delivery"]
    }
  ];

  const benefits = [
    {
      icon: FaShieldAlt,
      title: "Quality Assurance",
      description: "All medicines are sourced from verified manufacturers and meet regulatory standards."
    },
    {
      icon: FaClock,
      title: "Fast Delivery",
      description: "Express logistics ensure timely delivery to maintain your inventory levels."
    },
    {
      icon: FaChartLine,
      title: "Competitive Pricing",
      description: "Bulk ordering and direct sourcing provide the best prices in the market."
    },
    {
      icon: FaUsers,
      title: "Dedicated Support",
      description: "24/7 customer support to assist with orders and account management."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FaFileContract className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">How It Works</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Simple 4-step process to join Ethiopia's leading digital medicine distribution platform
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Process Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Join Our Network in 4 Simple Steps</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 h-full hover:shadow-2xl transition-shadow">
                  <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <step.icon className="text-emerald-600 text-2xl" />
                  </div>

                  <h3 className="text-xl font-black text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>

                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Why Choose YoniMediCare?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="text-emerald-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-black mb-8 text-center">Platform Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FaBox className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold mb-2">Extensive Catalog</h3>
                <p className="text-emerald-100">1000+ medicines from trusted manufacturers</p>
              </div>
              <div className="text-center">
                <FaSearch className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold mb-2">Easy Search</h3>
                <p className="text-emerald-100">Find medicines quickly with advanced search</p>
              </div>
              <div className="text-center">
                <FaHospital className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold mb-2">Pharmacy Network</h3>
                <p className="text-emerald-100">Join 50+ partner pharmacies nationwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Registration Requirements</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                <FaUsers className="text-emerald-600 mr-3" />
                Pharmacy Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Valid pharmacy license from Ethiopian Food and Drug Authority</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Business registration certificate</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Tax identification number (TIN)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Physical pharmacy location</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                <FaFileContract className="text-emerald-600 mr-3" />
                Documentation Needed
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Scanned copies of all licenses</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Pharmacist in charge credentials</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Bank account details for payments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Contact information and address proof</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join our network of trusted pharmacies and transform your medicine procurement process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center space-x-2"
              >
                <FaUserPlus />
                <span>Register Now</span>
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
