import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import MedicineCard from "../components/MedicineCard";
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "-createdAt",
  });

  const categories = [
    "All",
    "Pain Relief",
    "Antibiotics",
    "Vitamins",
    "Cold & Flu",
    "Digestive Health",
    "Heart Health",
    "Diabetes",
    "Skin Care",
    "First Aid",
    "Other",
  ];

  useEffect(() => {
    fetchMedicines();
    // Update URL params
    const params = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) params[key] = filters[key];
    });
    setSearchParams(params);
  }, [filters]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await api.get("/medicines", { params: filters });
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "-createdAt",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Institutional Header Area */}
      <div className="bg-[#020617] pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(16,185,129,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Manifest v4.1</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
            CLINICAL <span className="text-emerald-500">CATALOG</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">Institutional resource monitoring and pharmaceutical distribution portal.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-10 bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-900 tracking-[0.2em] uppercase">Parameters</h3>
                <button onClick={clearFilters} className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 tracking-widest uppercase underline">Reset</button>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Classification</label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat === "All" ? "" : cat })}
                      className={`block w-full text-left px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${(cat === "All" && !filters.category) || filters.category === cat
                        ? "bg-slate-900 text-white shadow-xl translate-x-1"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Valuation (ETB)</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="MIN"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-[10px] font-black focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="MAX"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-[10px] font-black focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Relay Priority</label>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                >
                  <option value="-createdAt">NEWEST PROTOCOL</option>
                  <option value="price">PRICE: LOWEST</option>
                  <option value="-price">PRICE: HIGHEST</option>
                  <option value="name">ALPHABETICAL</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Search & Mobile Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-grow group order-2 sm:order-1">
                <div className="absolute left-7 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-all duration-300">
                  <FaSearch className="text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="SEARCH MANIFEST BY NAME OR PROTOCOL..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-20 pr-8 py-5 sm:py-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm font-black uppercase tracking-widest outline-none placeholder:text-slate-300"
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden p-5 sm:p-6 bg-white rounded-3xl shadow-xl shadow-slate-200/50 text-emerald-600 order-1 sm:order-2 self-end sm:self-auto flex items-center space-x-3 border border-slate-100"
              >
                <MdOutlineFilterList className="text-2xl" />
                <span className="sm:hidden font-black uppercase tracking-widest text-[10px]">Filter Manifest</span>
              </button>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-3 mb-8">
              {filters.category && (
                <span className="inline-flex items-center px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {filters.category}
                  <button onClick={() => setFilters({ ...filters, category: "" })} className="ml-3 hover:text-emerald-400"><FaTimes /></button>
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="inline-flex items-center px-5 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {filters.minPrice || 0} - {filters.maxPrice || '∞'} ETB
                  <button onClick={() => setFilters({ ...filters, minPrice: "", maxPrice: "" })} className="ml-3 hover:text-slate-900"><FaTimes /></button>
                </span>
              )}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white p-4 h-96 rounded-3xl animate-pulse shadow-sm border border-gray-100"></div>
                ))}
              </div>
            ) : medicines.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-20 text-center">
                <div className="max-w-xs mx-auto">
                  <img src="https://illustrations.popsy.co/emerald/box.svg" alt="Empty" className="mb-8" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500 mb-8">We couldn't find any medicines matching your filters. Try search something else.</p>
                  <button onClick={clearFilters} className="btn-primary w-full shadow-none">Clear all filters</button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 flex justify-between items-center px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Relaying {medicines.length} Protocols
                  </span>
                  <span className="hidden md:block">Active Grid Manifest</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {medicines.map((medicine) => (
                    <MedicineCard key={medicine._id} medicine={medicine} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
          <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl animate-fade-in shadow-black/20 overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-gray-900">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-xl"><FaTimes /></button>
              </div>

              {/* Reuse Desktop Sidebar Content with adjustments */}
              <div className="space-y-10">
                {/* Sort */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Sort By</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["-createdAt", "price", "-price", "name"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilters({ ...filters, sort: s })}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border ${filters.sort === s ? 'bg-emerald-600 text-white border-emerald-600' : 'text-gray-600 border-gray-100'}`}
                      >
                        {s === "-createdAt" ? "Newest" : s === "price" ? "Price Low" : s === "-price" ? "Price High" : "A-Z"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilters({ ...filters, category: cat === "All" ? "" : cat })}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${(cat === "All" && !filters.category) || filters.category === cat
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "text-gray-600 border-gray-100"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Price Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="btn-primary w-full py-5 rounded-2xl"
                  >
                    Show {medicines.length} Results
                  </button>
                  <button onClick={clearFilters} className="w-full mt-4 text-sm font-bold text-gray-400 underline uppercase tracking-widest">Clear All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicines;
