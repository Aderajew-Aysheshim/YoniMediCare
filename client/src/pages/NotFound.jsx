import { Link } from "react-router-dom";
import { MdErrorOutline, MdArrowBack, MdHome } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-950/40 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-950/30 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl w-full text-center animate-fade-in">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-8">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Clinical Protocol Alert</span>
        </div>

        <h1 className="text-9xl font-black text-white mb-4 tracking-tighter opacity-10">404</h1>
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
          MANIFEST <br />
          <span className="text-emerald-500">NOT FOUND</span>
        </h2>

        <p className="text-emerald-100/60 text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
          The requested clinical coordinate does not exist within our secure health network. Please return to a verified sector.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center space-x-3 px-8 py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-50 transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl"
          >
            <MdHome className="text-lg" />
            <span>Sector Home</span>
          </Link>
          <Link
            to="/medicines"
            className="flex items-center justify-center space-x-3 px-8 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <MdArrowBack className="text-lg" />
            <span>Catalog Hub</span>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
            MediSystem Protocol Error Code: 0x404_LOC_FAILURE
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
