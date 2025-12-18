import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import MedicineCard from "../components/MedicineCard";
import { MdLocalPharmacy, MdSecurity, MdDeliveryDining, MdVerified } from "react-icons/md";

const Home = () => {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMedicines = async () => {
      try {
        const response = await api.get("/medicines?limit=6");
        setFeaturedMedicines(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMedicines();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-50">
              Quality medicines delivered to your doorstep with care and convenience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/medicines"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all hover:shadow-xl transform hover:scale-105"
              >
                Browse Medicines
              </Link>
              <Link
                to="/register"
                className="bg-emerald-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-900 transition-all hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose YoniMediCare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdLocalPharmacy className="text-3xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of medicines and healthcare products at your fingertips
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdVerified className="text-3xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Verified Products</h3>
              <p className="text-gray-600">
                All medicines are authentic and sourced from licensed manufacturers
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdDeliveryDining className="text-3xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery right to your doorstep
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSecurity className="text-3xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Secure & Private</h3>
              <p className="text-gray-600">
                Your health information is protected with industry-standard security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Featured Medicines
            </h2>
            <Link
              to="/medicines"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMedicines.map((medicine) => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Prescription Medicine?
          </h2>
          <p className="text-xl mb-8 text-emerald-50">
            Upload your prescription and we'll take care of the rest
          </p>
          <Link
            to="/medicines"
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all hover:shadow-xl inline-block transform hover:scale-105"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
