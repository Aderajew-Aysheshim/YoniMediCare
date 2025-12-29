import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Medicines", path: "/medicines" },
    { name: "Order Now", path: "/order-now" },
    { name: "My Orders", path: "/orders", protected: true },
    { name: "Dashboard", path: "/admin", adminOnly: true },
  ];

  const secondaryLinks = [
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Contact", path: "/contact" },
  ];

  const cartCount = getCartCount();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? "bg-white/80 backdrop-blur-lg shadow-lg py-2 border-b border-gray-100"
      : "bg-transparent py-4 text-white"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-3 text-2xl font-black tracking-tighter transition-all hover:scale-105 active:scale-95 group ${!isScrolled && location.pathname === "/" ? "text-white" : "text-slate-900"
              }`}
          >
            <div className={`p-2 rounded-2xl shadow-xl transition-all duration-500 group-hover:rotate-12 ${!isScrolled && location.pathname === "/" ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-emerald-600 text-white shadow-emerald-500/20"
              }`}>
              <MdLocalPharmacy className="text-2xl" />
            </div>
            <div className="flex flex-col leading-[0.8]">
              <span className="text-2xl">YONI<span className={!isScrolled && location.pathname === "/" ? "text-emerald-400" : "text-emerald-600"}>MEDI</span></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Healthcare Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                if (link.protected && !user) return null;
                if (link.adminOnly && (!user || user.role !== "admin")) return null;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs sm:text-sm font-bold uppercase tracking-[0.3em] transition-all relative py-2 ${!isScrolled && location.pathname === "/"
                      ? isActive ? "text-white" : "text-white/60 hover:text-white"
                      : isActive ? "text-emerald-600" : "text-slate-500 hover:text-slate-900"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${!isScrolled && location.pathname === "/" ? "bg-white" : "bg-emerald-600"
                        } animate-slide-in`}></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Secondary Links */}
            <div className="hidden xl:flex items-center space-x-4 border-l pl-4 border-slate-200/20">
              {secondaryLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs sm:text-sm font-bold uppercase tracking-[0.3em] transition-all relative py-2 ${!isScrolled && location.pathname === "/"
                      ? isActive ? "text-white" : "text-white/60 hover:text-white"
                      : isActive ? "text-emerald-600" : "text-slate-500 hover:text-slate-900"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${!isScrolled && location.pathname === "/" ? "bg-white" : "bg-emerald-600"
                        } animate-slide-in`}></div>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 border-l pl-4 sm:pl-10 border-slate-200/20">
              {/* Cart */}
              <Link to="/cart" className="relative p-2 sm:p-3 rounded-xl transition-all group overflow-hidden">
                <FaShoppingCart className={`text-sm sm:text-lg ${!isScrolled && location.pathname === "/" ? "text-white" : "text-slate-600 group-hover:text-emerald-600"
                  }`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] rounded-lg h-5 w-5 flex items-center justify-center font-black shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Simplified User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {user ? (
                  <Link
                    to="/orders"
                    className={`flex items-center space-x-2 px-3 py-2 sm:px-4 rounded-lg transition-all border ${!isScrolled && location.pathname === "/"
                      ? "bg-white/10 border-white/10 text-white hover:bg-white/20"
                      : "bg-white border-slate-100 text-slate-900 shadow-sm hover:border-emerald-500/20 hover:shadow-emerald-500/5"
                      }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">{user.name.split(' ')[0]}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className={`text-xs sm:text-sm font-black uppercase tracking-[0.3em] px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all shadow-2xl ${!isScrolled && location.pathname === "/"
                      ? "bg-white text-slate-900 hover:bg-emerald-50 shadow-white/10"
                      : "bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-900/20"
                      }`}
                  >
                    Authorize @ Access
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl text-2xl ${!isScrolled && location.pathname === "/" ? "text-white bg-white/10" : "text-emerald-700 bg-emerald-50"
              }`}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass rounded-3xl mt-2 p-4 sm:p-6 space-y-4 animate-fade-in shadow-2xl border border-white/20">
            {/* Main Navigation */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Main Menu</h3>
              {navLinks.map((link) => {
                if (link.protected && !user) return null;
                if (link.adminOnly && (!user || user.role !== "admin")) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg sm:text-xl font-bold text-gray-800 hover:text-emerald-600 transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Secondary Navigation */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Company</h3>
              {secondaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-base sm:text-lg font-medium text-gray-600 hover:text-emerald-600 transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-800 pt-4 border-t border-gray-100"
            >
              <span>Cart</span>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full text-sm">{cartCount} items</span>
            </Link>

            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-2xl font-black mb-2">
                      @
                    </div>
                    <p className="font-black text-gray-800 uppercase tracking-widest text-[10px]">{user.name}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 font-black uppercase tracking-widest text-[10px] w-full py-4 rounded-2xl hover:bg-red-100 transition-all"
                  >
                    Terminate Session
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-emerald-700 text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center py-5 rounded-2xl shadow-xl"
                  >
                    Authorize @
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="border border-gray-200 text-gray-500 font-black uppercase tracking-widest text-[10px] flex items-center justify-center py-5 rounded-2xl"
                  >
                    Register Manifest
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
