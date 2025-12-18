import { Link } from "react-router-dom";
import { MdLocalPharmacy, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MdLocalPharmacy className="text-3xl text-emerald-400" />
              <span className="text-2xl font-bold">YoniMediCare</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted online pharmacy for quality medicines and healthcare products.
              We deliver health to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/medicines" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Browse Medicines
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <MdEmail className="text-emerald-400" />
                <span className="text-sm">support@yonimedicare.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MdPhone className="text-emerald-400" />
                <span className="text-sm">+251 911 234 567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MdLocationOn className="text-emerald-400" />
                <span className="text-sm">Addis Ababa, Ethiopia</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Location Map Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <h3 className="text-2xl font-bold text-center mb-6">Visit Our Location</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-emerald-400">YoniMediCare Pharmacy</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start space-x-2">
                  <MdLocationOn className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span>AASTU Zone, Road 2, Addis Ababa, Ethiopia</span>
                </p>
                <p className="flex items-center space-x-2">
                  <MdPhone className="text-emerald-400" />
                  <span>+251 911 234 567</span>
                </p>
                <p className="flex items-center space-x-2">
                  <MdEmail className="text-emerald-400" />
                  <span>support@yonimedicare.com</span>
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="https://www.google.com/maps/search/Ayat+Zone+Addis+Ababa+Ethiopia/@8.9806,38.7578,15z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-2xl h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7578!3d8.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTgnNTAuMiJOIDM4wrA0NScyOC4xIkU!5e0!3m2!1sen!2set!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="YoniMediCare Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} YoniMediCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
