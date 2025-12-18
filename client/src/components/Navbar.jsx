import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const cartCount = getCartCount();

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:scale-105 transition-transform"
          >
            <MdLocalPharmacy className="text-3xl" />
            <span>YoniMediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/medicines"
              className="hover:text-emerald-200 transition-colors font-medium"
            >
              Medicines
            </Link>

            {user && (
              <Link
                to="/orders"
                className="hover:text-emerald-200 transition-colors font-medium"
              >
                My Orders
              </Link>
            )}

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="hover:text-emerald-200 transition-colors font-medium"
              >
                Admin Dashboard
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative hover:scale-110 transition-transform">
              <FaShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="hover:text-emerald-200 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/medicines"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-emerald-200 transition-colors font-medium"
            >
              Medicines
            </Link>

            {user && (
              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-emerald-200 transition-colors font-medium"
              >
                My Orders
              </Link>
            )}

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-emerald-200 transition-colors font-medium"
              >
                Admin Dashboard
              </Link>
            )}

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-emerald-200 transition-colors font-medium"
            >
              Cart ({cartCount})
            </Link>

            {user ? (
              <>
                <div className="text-sm py-2">Hello, {user.name}</div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:text-emerald-200 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
