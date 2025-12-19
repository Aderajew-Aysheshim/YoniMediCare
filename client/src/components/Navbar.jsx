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
    { name: "My Orders", path: "/orders", protected: true },
    { name: "Dashboard", path: "/admin", adminOnly: true },
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
            className={`flex items-center space-x-2 text-2xl font-black tracking-tighter hover:scale-105 transition-transform ${!isScrolled && location.pathname === "/" ? "text-white" : "text-emerald-700"
              }`}
          >
            <div className={`p-1.5 rounded-xl ${!isScrolled && location.pathname === "/" ? "bg-white/10" : "bg-emerald-100"
              }`}>
              <MdLocalPharmacy className="text-3xl" />
            </div>
            <span>Yoni<span className={!isScrolled && location.pathname === "/" ? "text-emerald-300" : "text-emerald-500"}>MediCare</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => {
                if (link.protected && !user) return null;
                if (link.adminOnly && (!user || user.role !== "admin")) return null;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-bold transition-all hover:text-emerald-400 ${!isScrolled && location.pathname === "/" ? "text-white/90" : "text-gray-700"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 border-l pl-8 border-gray-200">
              {/* Cart */}
              <Link to="/cart" className={`relative p-2 rounded-full transition-all group ${!isScrolled && location.pathname === "/" ? "bg-white/10 hover:bg-white/20" : "bg-gray-100 hover:bg-emerald-50"
                }`}>
                <FaShoppingCart className={`text-xl ${!isScrolled && location.pathname === "/" ? "text-white" : "text-gray-700 group-hover:text-emerald-600"
                  }`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Simplified User Menu */}
              <div className="flex items-center space-x-4 ml-2">
                {user ? (
                  <Link
                    to="/orders"
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-lg transition-all ${!isScrolled && location.pathname === "/"
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      }`}
                    title={user.name}
                  >
                    @
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className={`font-black uppercase tracking-widest text-[10px] px-6 py-2.5 rounded-full transition-all border ${!isScrolled && location.pathname === "/"
                      ? "bg-white text-emerald-900 border-white hover:bg-emerald-50"
                      : "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800"
                      }`}
                  >
                    Authorize @
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
          <div className="md:hidden glass rounded-3xl mt-2 p-6 space-y-4 animate-fade-in shadow-2xl border border-white/20">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              if (link.adminOnly && (!user || user.role !== "admin")) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-xl font-bold text-gray-800 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-between items-center text-xl font-bold text-gray-800"
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
