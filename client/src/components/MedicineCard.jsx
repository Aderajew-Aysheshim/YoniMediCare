import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const MedicineCard = ({ medicine }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(medicine, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/medicines/${medicine._id}`}>
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {medicine.requiresPrescription && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Rx Required
            </span>
          )}
          {medicine.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/medicines/${medicine._id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-emerald-600 transition-colors">
            {medicine.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-2">{medicine.category}</p>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {medicine.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-emerald-600">
              ${medicine.price.toFixed(2)}
            </span>
            <p className="text-xs text-gray-500">
              {medicine.stock > 0 ? `${medicine.stock} in stock` : "Out of stock"}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={medicine.stock === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${medicine.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:scale-105"
              }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
