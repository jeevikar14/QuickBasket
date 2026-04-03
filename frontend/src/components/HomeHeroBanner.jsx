
import React from "react";
import ProductCard from '../components/ProductCard';

const HomeHeroBanner = () => {
  return (
    <section className="w-full bg-primary-600 py-10 md:py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 px-4 md:px-8">
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-slide-up leading-tight">
            Welcome to Quick Basket
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white animate-fade-in max-w-xl">
            Discover amazing products at unbeatable prices. Shop from thousands of items across multiple categories.
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors animate-fade-in shadow-md"
          >
            Shop Now
          </a>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center animate-slide-in-right">
          <img
            src={"/hero-banner.jpg"}
            alt="Quick Basket Homepage Banner"
            className="w-full max-w-md md:max-w-lg h-auto rounded-xl shadow-lg object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroBanner;
