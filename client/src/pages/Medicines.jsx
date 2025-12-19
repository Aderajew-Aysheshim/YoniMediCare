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
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Discover <span className="text-emerald-600">Health</span>
          </h1>
          <p className="text-gray-500 text-lg">Find the right treatment with our advanced search</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button onClick={clearFilters} className="text-xs font-bold text-emerald-600 hover:text-emerald-700">RESET</button>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Category</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat === "All" ? "" : cat })}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${(cat === "All" && !filters.category) || filters.category === cat
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                          : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Price Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 appearance-none"
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Search & Mobile Filter Toggle */}
            <div className="flex gap-4 mb-8">
              <div className="relative flex-grow group">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search medicines, ailments, or brands..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent rounded-[2.5rem] shadow-sm focus:border-emerald-500 focus:shadow-xl transition-all text-lg font-medium outline-none"
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden p-5 bg-white rounded-full shadow-sm text-emerald-600"
              >
                <MdOutlineFilterList className="text-2xl" />
              </button>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.category && (
                <span className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                  {filters.category}
                  <button onClick={() => setFilters({ ...filters, category: "" })} className="ml-2"><FaTimes /></button>
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                  ${filters.minPrice || 0} - ${filters.maxPrice || '∞'}
                  <button onClick={() => setFilters({ ...filters, minPrice: "", maxPrice: "" })} className="ml-2"><FaTimes /></button>
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
                <div className="mb-6 flex justify-between items-center px-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <span>Found {medicines.length} items</span>
                  <span className="hidden md:block">Grid View</span>
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
