import { Link } from "react-router-dom";
import { MdLocalPharmacy, MdEmail, MdPhone, MdLocationOn, MdKeyboardArrowRight, MdArrowForward, MdLocalShipping, MdSecurity, MdSupport } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white mt-auto overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Engine */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-500">
                <MdLocalPharmacy className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">YoniMediCare</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-xs">
              Ethiopia's leading digital medicine distribution platform. We connect pharmacies with quality medicines, ensuring fast delivery and regulatory compliance. Your trusted healthcare partner.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/25109534671" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-green-500 border border-green-400 flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300">
                <FaWhatsapp />
              </a>
              <a href="https://t.me/yonimedicare" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-blue-500 border border-blue-400 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300">
                <FaTelegram />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">What We Do</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start space-x-3">
                  <MdLocalPharmacy className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-white mb-1">Medicine Distribution</p>
                    <p className="text-gray-400 text-xs">Connect pharmacies with quality medicines</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start space-x-3">
                  <MdLocalShipping className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-white mb-1">Fast Delivery</p>
                    <p className="text-gray-400 text-xs">Express logistics to your location</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start space-x-3">
                  <MdSecurity className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-white mb-1">Quality Assurance</p>
                    <p className="text-gray-400 text-xs">Regulatory compliance guaranteed</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start space-x-3">
                  <MdSupport className="text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-white mb-1">24/7 Support</p>
                    <p className="text-gray-400 text-xs">Round-the-clock customer service</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/medicines" className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  <span className="font-bold text-sm">Medicines Catalog</span>
                </Link>
              </li>
              <li>
                <Link to="/order-now" className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  <span className="font-bold text-sm">Order Now</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  <span className="font-bold text-sm">How It Works</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  <span className="font-bold text-sm">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  <span className="font-bold text-sm">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Node */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-[10px] font-black text-white px-2 py-1 bg-emerald-500 rounded inline-block uppercase tracking-widest mb-6">Contact Us</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MdPhone />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Hotline</p>
                  <p className="text-xs font-bold">0953 464171</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MdEmail />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Email</p>
                  <p className="text-xs font-bold">info@yonimedicare.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MdLocationOn />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Location</p>
                  <p className="text-xs font-bold">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Location & Map */}
        <div className="pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div className="flex items-start space-x-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[2rem] flex-shrink-0 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                  <MdLocationOn className="text-3xl text-white" />
                </div>
                <div>
                  <h4 className="text-3xl font-black tracking-tighter mb-4 uppercase">Addis Ababa Headquarters</h4>
                  <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-sm">
                    Bole Medhanialem Area,<br />
                    Addis Ababa, Ethiopia<br />
                    Postal Code: 1000
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="tel:+25109534671"
                      className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/10"
                    >
                      Call Now: 0953 4671
                    </a>
                    <a
                      href="https://wa.me/25109534671"
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-4 bg-green-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-green-500/10"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-[2.5rem] p-8 border border-emerald-500/20">
              <h4 className="text-2xl font-black text-white mb-8">Our Impact in Ethiopia</h4>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-400 mb-2">50+</div>
                  <p className="text-gray-300 text-sm font-medium">Partner Pharmacies</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-400 mb-2">1000+</div>
                  <p className="text-gray-300 text-sm font-medium">Medicines Available</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-400 mb-2">24/7</div>
                  <p className="text-gray-300 text-sm font-medium">Support Available</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-400 mb-2">99.9%</div>
                  <p className="text-gray-300 text-sm font-medium">Delivery Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Business Hours */}
            <div className="text-center">
              <h3 className="text-lg font-black text-emerald-500 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-400">
                <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-sm">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-sm">Sunday: Closed</p>
                <p className="text-sm text-emerald-400 font-medium mt-2">Emergency: 24/7 Available</p>
              </div>
            </div>

            {/* Services */}
            <div className="text-center">
              <h3 className="text-lg font-black text-emerald-500 mb-4">Our Services</h3>
              <div className="space-y-2 text-gray-400">
                <p className="text-sm">Medicine Distribution</p>
                <p className="text-sm">Pharmacy Network Management</p>
                <p className="text-sm">Regulatory Compliance</p>
                <p className="text-sm">Emergency Medical Supplies</p>
                <p className="text-sm text-emerald-400 font-medium mt-2">Serving All Regions of Ethiopia</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="text-center">
              <h3 className="text-lg font-black text-emerald-500 mb-4">Certifications</h3>
              <div className="space-y-2 text-gray-400">
                <p className="text-sm">FDA Ethiopia Approved</p>
                <p className="text-sm">ISO 9001 Certified</p>
                <p className="text-sm">Good Distribution Practice</p>
                <p className="text-sm">Pharmacy License Verified</p>
                <p className="text-sm text-emerald-400 font-medium mt-2">Fully Compliant Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Status */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-2">
              &copy; {new Date().getFullYear()} YoniMediCare - Ethiopia's Digital Medicine Distribution Platform
            </p>
            <p className="text-xs text-gray-500">Serving Ethiopian healthcare with quality medicines and fast delivery</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System Online</span>
            </div>
            <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">SECURE & COMPLIANT</div>
            <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">ETHIOPIAN OWNED</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
