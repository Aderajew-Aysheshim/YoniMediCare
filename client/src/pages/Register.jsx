import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdLocalPharmacy, MdArrowForward, MdEmail, MdPersonOutline, MdPhone, MdLocationOn, MdVpnKey } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Authorization keys do not match. Please verify.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Access key must be at least 6 characters for security.");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration sequence failed. System error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/3 bg-emerald-950 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-[10s]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-teal-950/20 to-transparent"></div>

        <div className="relative z-10 w-full p-16 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 text-white mb-12">
              <div className="p-2 bg-emerald-500 rounded-xl">
                <MdLocalPharmacy className="text-3xl text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter uppercase">Yoni<span className="text-emerald-400">Medi</span></span>
                <span className="text-[7px] font-black uppercase tracking-[0.4em] text-emerald-500/60 text-center">Healthcare Hub</span>
              </div>
            </div>
            <h2 className="text-5xl font-black text-white leading-tight tracking-tighter mb-6 uppercase">
              JOIN THE <br />
              <span className="text-emerald-400">PROTOCOL.</span>
            </h2>
            <p className="text-emerald-100/50 font-medium text-lg max-w-xs">
              Start your journey with Ethiopia's most premium medical delivery platform. Professional, Secure, Precise.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <MdVpnKey className="text-xl text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest">End-to-End Encryption</p>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Your data is secured</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 lg:p-16 bg-gray-50/30 overflow-y-auto">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="mb-12">
            <h3 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Create Manifest</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Initialize your medical profile</p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-2xl text-xs font-bold mb-8 flex items-center space-x-3 animate-shake">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Identity */}
            <div>
              <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-6 flex items-center space-x-2">
                <span className="w-6 h-[1px] bg-emerald-600/30"></span>
                <span>01 Identification</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Legal Full Name</label>
                  <div className="relative group">
                    <MdPersonOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-emerald-600 group-hover:text-gray-600 transition-colors" />
                    <input name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none" placeholder="First Last" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Communications (Email)</label>
                  <div className="relative group">
                    <MdEmail className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-emerald-600 group-hover:text-gray-600 transition-colors" />
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none" placeholder="you@example.com" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Logistics */}
            <div>
              <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-6 flex items-center space-x-2">
                <span className="w-6 h-[1px] bg-emerald-600/30"></span>
                <span>02 Logistics Target</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Access</label>
                  <div className="relative group">
                    <MdPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-emerald-600" />
                    <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none" placeholder="+251 ..." />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street / Block</label>
                  <div className="relative group">
                    <MdLocationOn className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-emerald-600" />
                    <input name="address.street" type="text" required value={formData.address.street} onChange={handleChange} className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none" placeholder="Bole St, 12..." />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City / Region</label>
                  <input name="address.city" type="text" required value={formData.address.city} onChange={handleChange} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none" placeholder="Addis Ababa" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Postal Code</label>
                  <input name="address.zipCode" type="text" required value={formData.address.zipCode} onChange={handleChange} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none" placeholder="1000" />
                </div>
              </div>
            </div>

            {/* Section 3: Security */}
            <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200">
              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-8">03 Critical Access Keys</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Define Password</label>
                  <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold focus:border-emerald-500 transition-all outline-none" placeholder="••••••••" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Confirm Identity Key</label>
                  <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold focus:border-emerald-500 transition-all outline-none" placeholder="••••••••" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-10 py-6 rounded-[2.5rem] bg-emerald-600 text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-500 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all flex items-center justify-center space-x-4 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-b-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>INITIALIZE CLINICAL PROFILE</span>
                    <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-bold text-gray-400">
              EXISTING PATIENT?{" "}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-800 font-black uppercase tracking-widest ml-2 underline decoration-2 underline-offset-4">
                Access Profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
