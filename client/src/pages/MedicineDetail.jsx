import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchMedicine();
  }, [id]);

  const fetchMedicine = async () => {
    try {
      const response = await api.get(`/medicines/${id}`);
      setMedicine(response.data);
    } catch (error) {
      console.error("Error fetching medicine:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Medicine not found</h2>
          <button
            onClick={() => navigate("/medicines")}
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            ← Back to Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/medicines")}
          className="flex items-center text-emerald-600 hover:text-emerald-700 font-semibold mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Medicines
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="relative">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {medicine.requiresPrescription && (
                <span className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                  Prescription Required
                </span>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{medicine.name}</h1>

              <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {medicine.category}
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{medicine.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-semibold text-gray-700">Manufacturer:</span>
                  <span className="ml-2 text-gray-600">{medicine.manufacturer}</span>
                </div>

                {medicine.dosage && (
                  <div>
                    <span className="font-semibold text-gray-700">Dosage:</span>
                    <span className="ml-2 text-gray-600">{medicine.dosage}</span>
                  </div>
                )}

                {medicine.sideEffects && (
                  <div>
                    <span className="font-semibold text-gray-700">Side Effects:</span>
                    <p className="text-gray-600 mt-1">{medicine.sideEffects}</p>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-gray-700">Stock:</span>
                  <span className={`ml-2 ${medicine.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {medicine.stock > 0 ? `${medicine.stock} available` : "Out of stock"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-emerald-600">
                    ${medicine.price.toFixed(2)}
                  </span>
                </div>

                {medicine.stock > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={medicine.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(medicine.stock, parseInt(e.target.value) || 1)))}
                      className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={medicine.stock === 0}
                  className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${medicine.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg transform hover:scale-[1.02]"
                    }`}
                >
                  <FaShoppingCart />
                  <span>{medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
