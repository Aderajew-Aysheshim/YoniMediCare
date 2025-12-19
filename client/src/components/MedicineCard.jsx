import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { MdAddShoppingCart, MdInfoOutline } from "react-icons/md";

const MedicineCard = ({ medicine }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(medicine, 1);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <Link to={`/medicines/${medicine._id}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={medicine.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"}
            alt={medicine.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {medicine.price > 100 && (
              <span className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                Premium
              </span>
            )}
            {medicine.requiresPrescription && (
              <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                Rx Required
              </span>
            )}
            {medicine.stock < 10 && medicine.stock > 0 && (
              <span className="bg-orange-500/90 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                Low Stock
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={(e) => { e.preventDefault(); /* wish list logic */ }}
              className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg hover:bg-white text-gray-700 transition-colors"
            >
              <MdInfoOutline className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              {medicine.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-emerald-600 transition-colors">
            {medicine.name}
          </h3>

          <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">
            {medicine.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
              <span className="text-2xl font-black text-gray-900">
                ${medicine.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={medicine.stock === 0}
              className={`p-4 rounded-2xl transition-all duration-300 ${medicine.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-110 active:scale-95"
                }`}
            >
              <MdAddShoppingCart className="text-2xl" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MedicineCard;
