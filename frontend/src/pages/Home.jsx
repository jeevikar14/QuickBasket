import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import HomeHeroBanner from '../components/HomeHeroBanner';
import FeaturesStrip from '../components/FeaturesStrip';
import FlashDealsBanner from '../components/FlashDealsBanner';
import FeaturedProductsCarousel from '../components/FeaturedProductsCarousel';

/**
 * Home Page
 * Landing page with hero section, featured products, and categories
 */
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await axiosClient.get('/products/featured');
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: 'Electronics',
      icon: (
        <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Electronics (Mobile)" className="w-10 h-10" style={{ display: 'block' }} />
      ),
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Fashion',
      icon: (
        <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="Fashion" className="w-10 h-10" style={{ display: 'block' }} />
      ),
      color: 'from-pink-400 to-pink-600',
    },
    {
      name: 'Home & Garden',
      icon: (
        <img src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png" alt="Home & Garden" className="w-10 h-10" style={{ display: 'block' }} />
      ),
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'Sports',
      icon: (
        <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Sports (Football)" className="w-10 h-10" style={{ display: 'block' }} />
      ),
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <HomeHeroBanner />

      {/* Features Strip */}
      <FeaturesStrip />

      {/* Flash Deals Banner */}
      <FlashDealsBanner />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group"
              >
                <div
                  className={`bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-transform`}
                >
                  <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-inner">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="text-lg text-gray-500 animate-pulse">Loading featured products...</span>
            </div>
          ) : (
            <FeaturedProductsCarousel products={featuredProducts} />
          )}
        </div>
      </section>


    </div>
  );
};

export default Home;