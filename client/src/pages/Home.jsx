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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#020617]">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-slate-950/80 to-teal-950/90 z-10"></div>
          <img
            src="/C:/Users/Ad/.gemini/antigravity/brain/4aff10fa-f0a2-473f-89ee-06712379bc6b/medical_logistics_hero_1766215468393.png"
            alt="Medical Hero"
            className="w-full h-full object-cover scale-110 animate-subtle-zoom opacity-40"
          />
          {/* Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

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
      </section>

      {/* Trust Badges */}
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 grid grid-cols-2 md:grid-cols-4 gap-12 group">
          <div className="flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-500">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
              <MdVerified className="text-4xl text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-2">Authenticated</h4>
            <p className="text-xs text-slate-500 font-medium">100% Genuine Clinical Grade</p>
          </div>
          <div className="flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-500">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
              <MdSecurity className="text-4xl text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-2">Secured</h4>
            <p className="text-xs text-slate-500 font-medium">End-to-End Encryption</p>
          </div>
          <div className="flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-500">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
              <MdDeliveryDining className="text-4xl text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-2">Expedited</h4>
            <p className="text-xs text-slate-500 font-medium">Nationwide Cold-Chain</p>
          </div>
          <div className="flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-500">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
              <MdSupportAgent className="text-4xl text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-2">Institutional</h4>
            <p className="text-xs text-slate-500 font-medium">Dedicated Priority Relay</p>
          </div>
        </div>
      </div>

      {/* Partners Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="h-[1px] w-20 bg-slate-200 mb-8"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Official Institutional Partners</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase whitespace-nowrap">EthioPharma Labs</span>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase whitespace-nowrap">Global Meds Corp</span>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase whitespace-nowrap">Addis Medical</span>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase whitespace-nowrap">Federal Health Gate</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="h-[2px] w-12 bg-emerald-600 mb-6"></div>
              <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[0.9]">
                ELITE<br />
                <span className="text-emerald-600">INVENTORY</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Curated clinical protocols for optimized healthcare outcomes</p>
            </div>
            <Link to="/medicines" className="group flex items-center space-x-4 bg-slate-50 border border-slate-100 px-8 py-4 rounded-2xl transition-all hover:bg-slate-900 hover:text-white hover:shadow-xl">
              <span className="font-black uppercase tracking-widest text-[10px]">Access Full Catalog</span>
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-50 p-6 h-[450px] rounded-[3rem] animate-pulse border border-slate-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredMedicines.map((medicine) => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Clinical Spotlight Section */}
      <section className="py-24 sm:py-32 bg-emerald-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-4 inline-block">Diagnostic Hardware</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">PRECISION INSTRUMENTS</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="group relative bg-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-700 shadow-2xl">
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-1/2 overflow-hidden h-72 lg:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1580281657527-47c48d1c07dd?auto=format&fit=crop&q=80&w=800"
                    alt="BP Monitor"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                </div>
                <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">Flagship Device</span>
                  <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">BP MANIFEST PRO</h3>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed">Institutional-grade blood pressure monitoring with clinical IRH detection and institutional cloud sync.</p>
                  <Link to="/medicines?category=Heart Health" className="text-emerald-400 font-black uppercase tracking-widest text-[10px] flex items-center space-x-3 group/link">
                    <span>ACQUIRE PROTOCOL</span>
                    <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all duration-700 shadow-2xl">
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-1/2 overflow-hidden h-72 lg:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1582719478170-2f08d4fbcf06?auto=format&fit=crop&q=80&w=800"
                    alt="Glucometer"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                </div>
                <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-6">Institutional Care</span>
                  <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">GLUCOLINK ELITE</h3>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed">High-fidelity glucose monitoring with zero-latency data transmission for institutional patient manifests.</p>
                  <Link to="/medicines?category=Diabetes" className="text-teal-400 font-black uppercase tracking-widest text-[10px] flex items-center space-x-3 group/link">
                    <span>ACQUIRE PROTOCOL</span>
                    <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Smart Prescription Section */}
      <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-emerald-500/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <div>
                <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-black text-[10px] tracking-[0.2em] uppercase mb-6">
                  Intelligent Logistics
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-6">
                  SMART<br />
                  <span className="text-emerald-600">MANIFEST</span><br />
                  PROTOCOL
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  Eliminate procedural delays. Our digital relay verifies prescriptions and automates fulfillment for high-priority clinical distribution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "INSTANT RELAY", desc: "Real-time digital scan and verification" },
                  { title: "PHARMA-VERIFIED", desc: "Validated by licensed institutions" },
                  { title: "COLD-CHAIN SECURE", desc: "Temperature-controlled logistics" },
                  { title: "AUTO-PROTOCOL", desc: "Seamless supply chain alerts" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <MdVerified className="text-emerald-500 text-xl" />
                      <h4 className="font-black text-slate-900 tracking-widest text-[10px] uppercase">{item.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link to="/medicines" className="inline-flex items-center space-x-3 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl">
                  <span>INITIATE MANIFEST</span>
                  <FaArrowRight className="text-emerald-400" />
                </Link>
              </div>
            </div>

            <div className="flex-1 relative group">
              <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[100px] group-hover:blur-[120px] transition-all"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl">
                <img
                  src="/C:/Users/Ad/.gemini/antigravity/brain/4aff10fa-f0a2-473f-89ee-06712379bc6b/ethiopian_modern_pharmacy_1766215452004.png"
                  alt="Elite Pharmacy"
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-emerald-500/5 skew-x-[30deg] translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
            Institutional Access Only
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-none">
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">CLINICAL NETWORK</span>
          </h2>
          <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            Secure your institution's role in the next generation of Ethiopian pharmaceutical distribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="group relative overflow-hidden bg-emerald-500 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-emerald-500/20 shadow-2xl hover:scale-105 active:scale-95">
              <span className="relative z-10">AUTHORIZE INSTITUTION</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            <Link to="/login" className="px-12 py-6 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/5 hover:border-white/30 transition-all active:scale-95">
              ACCESS PORTAL
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
