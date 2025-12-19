import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import MedicineCard from "../components/MedicineCard";
import {
  MdLocalPharmacy,
  MdSecurity,
  MdDeliveryDining,
  MdVerified,
  MdSupportAgent,
  MdPayments
} from "react-icons/md";
import { FaArrowRight, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Home = () => {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMedicines = async () => {
      try {
        const response = await api.get("/medicines?limit=8");
        setFeaturedMedicines(response.data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          {/* Cinematic Backdrop Orbs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#0f172a]">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/40 rounded-full blur-[140px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/30 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto py-12">
            <div className="inline-block px-8 py-3 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 mb-10 shadow-2xl animate-fade-in">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Next-Generation Pharmaceutical Manifest</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] uppercase animate-fade-in-up">
              ELITE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">HEALTHCARE</span><br />
              DASHBOARD
            </h1>
            <p className="text-lg sm:text-2xl mb-16 text-emerald-100/60 font-medium leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-100 italic">
              "Redefining clinical precision through cinematic technology and institutional trust."
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-200">
              <Link to="/medicines" className="btn-emerald px-12 py-6 text-base group shadow-pro-lg">
                <span className="flex items-center">
                  LAUNCH CATALOG <FaArrowRight className="ml-4 group-hover:translate-x-3 transition-transform duration-500" />
                </span>
              </Link>
              <Link to="/register" className="btn-outline px-12 py-6 text-base text-white border-white/20 hover:bg-white/5 hover:border-white transition-all">
                JOIN CLINICAL NETWORK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="glass p-8 rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-3 rounded-2xl mb-3">
              <MdVerified className="text-3xl text-emerald-600" />
            </div>
            <span className="font-bold text-gray-800">100% Genuine</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-3 rounded-2xl mb-3">
              <MdSecurity className="text-3xl text-emerald-600" />
            </div>
            <span className="font-bold text-gray-800">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-3 rounded-2xl mb-3">
              <MdDeliveryDining className="text-3xl text-emerald-600" />
            </div>
            <span className="font-bold text-gray-800">Express Delivery</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-3 rounded-2xl mb-3">
              <MdSupportAgent className="text-3xl text-emerald-600" />
            </div>
            <span className="font-bold text-gray-800">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Trust Ecosystem - Partnership Logos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-xl font-black tracking-tighter text-gray-400 uppercase">EthioPharma Labs</span>
          <span className="text-xl font-black tracking-tighter text-gray-400 uppercase">Global Meds Corp</span>
          <span className="text-xl font-black tracking-tighter text-gray-400 uppercase">HealthPlus</span>
          <span className="text-xl font-black tracking-tighter text-gray-400 uppercase">MediLink Institutional</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-[0.9]">Professional <br className="hidden sm:block" /> Pharmaceutical Catalog</h2>
              <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">Curated protocols for optimized clinical outcomes</p>
            </div>
            <Link to="/medicines" className="group flex items-center space-x-3 bg-emerald-50 px-6 py-3 rounded-2xl transition-all hover:bg-emerald-100">
              <span className="text-emerald-700 font-black uppercase tracking-widest text-[10px]">Show All Medicines</span>
              <span className="text-emerald-600 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 h-[400px] rounded-[2.5rem] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredMedicines.map((medicine) => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Clinical Spotlight Section */}
      <section className="py-20 sm:py-32 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Precision Instruments</h2>
            <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">Advanced Diagnostic Hardware for Clinical Accuracy</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
            <div className="group relative bg-white rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-1/2 overflow-hidden h-64 lg:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1580281657527-47c48d1c07dd?auto=format&fit=crop&q=80&w=600"
                    alt="BP Monitor"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Flagship Device</span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Precision BP Manifest</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">Institutional-grade blood pressure monitoring with Irregular Heartbeat Detection and multi-user memory.</p>
                  <Link to="/medicines?category=Heart Health" className="text-emerald-600 font-black uppercase tracking-widest text-[10px] flex items-center space-x-2 group/link">
                    <span>Acquire Protocol</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-1/2 overflow-hidden h-64 lg:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1582719478170-2f08d4fbcf06?auto=format&fit=crop&q=80&w=600"
                    alt="Glucometer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-4">Diabetes Care</span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">GlucoLink Pro</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">5-second results with minimal sample required. Bluetooth-ready for seamless health data manifests.</p>
                  <Link to="/medicines?category=Diabetes" className="text-teal-600 font-black uppercase tracking-widest text-[10px] flex items-center space-x-2 group/link">
                    <span>Acquire Protocol</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero 2 - Prescription Section */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm tracking-wide uppercase">
                Smart Prescription Order
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Ordering Prescription <br />
                Medicine Made <span className="text-gradient">Simple.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                No need to wait in line. Simply upload a photo of your prescription, and our licensed pharmacists will verify it and prepare your order for same-day delivery.
              </p>
              <ul className="space-y-4">
                {[
                  "Upload photo instantly",
                  "Expert pharmacist verification",
                  "Safe and confidential handling",
                  "Auto-refill reminders"
                ].map((text, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="bg-emerald-500 rounded-full p-1">
                      <MdVerified className="text-white text-sm" />
                    </div>
                    <span className="font-medium text-gray-700">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link to="/medicines" className="btn-primary inline-flex px-12 py-4">
                  Upload Prescription
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-emerald-100/50 rounded-3xl blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800"
                alt="Pharmacist"
                className="relative rounded-3xl shadow-2xl border border-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-emerald-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-800/30 transform skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 tracking-tighter uppercase">Join the Clinical Network</h2>
          <p className="text-lg sm:text-xl text-emerald-100 mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of authorized users who manage their pharmaceutical manifests via YoniMediCare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link to="/register" className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all transform hover:-translate-y-1">
              Authorize Device
            </Link>
            <Link to="/login" className="border border-emerald-400 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all">
              Access @
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
