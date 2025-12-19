import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdLocalPharmacy, MdArrowForward, MdLockOutline, MdEmail } from "react-icons/md";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-950 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-[10s]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>

        <div className="relative z-10 w-full p-20 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 text-white mb-8 animate-fade-in-up">
              <MdLocalPharmacy className="text-4xl text-emerald-400" />
              <span className="text-2xl font-black tracking-tighter uppercase">YoniMediCare</span>
            </div>
            <h2 className="text-6xl font-black text-white leading-tight tracking-tighter mb-6 animate-fade-in-up delay-100">
              Your Health, <br />
              Digitally <span className="text-emerald-400">Perfected.</span>
            </h2>
            <p className="text-emerald-100/60 font-medium text-lg max-w-md animate-fade-in-up delay-200">
              Access your personalized pharmaceutical dashboard and manage your prescriptions with clinical precision.
            </p>
          </div>

          <div className="animate-fade-in-up delay-300">
            <div className="flex items-center space-x-4 text-white/40">
              <div className="w-12 h-[1px] bg-white/20"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">SSL PROTECTED SYSTEM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 px-4 sm:px-12 lg:px-24 bg-gray-50/30">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <div className="lg:hidden flex items-center space-x-2 text-emerald-600 mb-6">
              <MdLocalPharmacy className="text-3xl" />
              <span className="text-xl font-black tracking-tighter uppercase">YoniMediCare</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Welcome Back</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Identify yourself to continue</p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-2xl text-xs font-bold mb-8 flex items-center space-x-3 animate-shake">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Secure Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                  <MdEmail className="text-xl" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 focus:outline-none transition-all shadow-sm group-hover:shadow-md"
                  placeholder="patient@medical-hub.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Access Token (Password)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                  <MdLockOutline className="text-xl" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 focus:outline-none transition-all shadow-sm group-hover:shadow-md"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 border-gray-200 rounded-lg text-emerald-600 focus:ring-0 cursor-pointer" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Keep Session Active</span>
              </label>
              <button type="button" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-800 transition-colors">Lost Access?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-3xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-gray-900/10 hover:bg-black hover:shadow-gray-900/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-b-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Authorize Access</span>
                  <MdArrowForward className="text-lg group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-bold text-gray-400">
              NEW TO THE LABORATORY?{" "}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-800 font-black uppercase tracking-widest ml-2 underline decoration-2 underline-offset-4">
                Register Manifest
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
