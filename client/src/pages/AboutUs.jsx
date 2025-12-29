import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeartbeat,
  FaTruck,
  FaShieldAlt,
  FaUsers,
  FaHandshake,
  FaAward,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe
} from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FaHeartbeat className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">About YoniMediCare</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Leading digital medicine distributor revolutionizing pharmacy supply chains in Ethiopia
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <FaHeartbeat className="text-emerald-600 text-xl" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Our Mission & Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-600 mb-3">Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  YoniMediCare is committed to being a leading digital medicine distributor, simplifying medicine distribution for pharmacies, ensuring regulatory compliance, and driving recurring revenue and long-term partnerships.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-600 mb-3">Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become Ethiopia's most trusted digital pharmacy platform, connecting healthcare providers with seamless medicine distribution and innovative supply chain solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <FaTruck className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Distribution Capacity</h3>
              <p className="text-gray-600">
                We operate a centralized medicine distribution platform connecting a large primary pharmacy with multiple partner pharmacies, enabling efficient bulk distribution and inventory control.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FaShieldAlt className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regulatory Compliance</h3>
              <p className="text-gray-600">
                YoniMediCare ensures full compliance with medicine regulatory standards, maintaining transparency and trust through license verification and audit capabilities.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FaUsers className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partner Network</h3>
              <p className="text-gray-600">
                Building strong partnerships with pharmacies across Ethiopia, creating a robust network for reliable medicine distribution and healthcare access.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-black mb-8 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">50+</div>
                <p className="text-emerald-100">Partner Pharmacies</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">1000+</div>
                <p className="text-emerald-100">Medicines Distributed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">24/7</div>
                <p className="text-emerald-100">Support Available</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">99.9%</div>
                <p className="text-emerald-100">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <FaHandshake className="text-3xl text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Trust</h3>
              <p className="text-sm text-gray-600">Building reliable partnerships based on transparency and integrity</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <FaAward className="text-3xl text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">Delivering highest quality service and pharmaceutical standards</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <FaClock className="text-3xl text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Efficiency</h3>
              <p className="text-sm text-gray-600">Streamlined processes for fast and reliable distribution</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <FaGlobe className="text-3xl text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">Embracing technology to transform healthcare distribution</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-emerald-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Addis Ababa, Ethiopia</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-emerald-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+251 911 000 000</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-emerald-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@yonimedicare.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-black mb-4">Ready to Partner With Us?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join our network of trusted pharmacies and transform your medicine distribution experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-emerald-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/medicines"
                className="px-8 py-3 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors"
              >
                Browse Medicines
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
