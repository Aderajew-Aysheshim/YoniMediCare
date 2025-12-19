import { Link } from "react-router-dom";
import { MdLocalPharmacy, MdEmail, MdPhone, MdLocationOn, MdKeyboardArrowRight } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

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
              Redefining pharmaceutical accessibility through precision delivery and institutional trust. Ethiopia's premier digital health partner.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div>
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Clinical Pathways</h3>
            <ul className="space-y-4">
              {['Medicines', 'Prescriptions', 'Therapy', 'Diagnostics'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="font-bold text-sm">{item} Catalog</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Integrity */}
          <div>
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Governance</h3>
            <ul className="space-y-4">
              {['Privacy', 'Terms', 'Licensing', 'Compliance'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <MdKeyboardArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="font-bold text-sm">{item} Protocol</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Node */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-[10px] font-black text-white px-2 py-1 bg-emerald-500 rounded inline-block uppercase tracking-widest mb-6">HQ Contact</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MdEmail />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Inquiries</p>
                  <p className="text-xs font-bold">support@yoni.med</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MdPhone />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Emergency Line</p>
                  <p className="text-xs font-bold">+251 911 234 567</p>
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
                  <h4 className="text-3xl font-black tracking-tighter mb-4 uppercase">Kilinto Logistics Hub</h4>
                  <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-sm">
                    AASTU Kilinto Campus,<br />
                    Akaki Kaliti District,<br />
                    Addis Ababa, Ethiopia
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=8.883602,38.81059"
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/10"
                    >
                      Route Protocol
                    </a>
                    <a
                      href="tel:+251911234567"
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      COMMS LINK
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Cinematic Map Embed */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative h-[350px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group-hover:-translate-y-2 transition-transform duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15760.360170428586!2d38.808077599999996!3d8.88360215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMg4MycyMC45Im4gMzhCMzgnNDIuNiJl!5e0!3m2!1sen!2set!4v1703088000000!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(150deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AASTU Kilinto Location"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Status */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} YoniMediCare System Protocol v4.0.0
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Network Secure</span>
            </div>
            <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">PCI COMPLIANT PLATFORM</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
