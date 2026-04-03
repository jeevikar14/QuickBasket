import React from 'react';

/**
 * CategoryFilter Component
 * Sidebar filter for categories and price range
 */
const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-100 text-primary-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Min Price: ₹{priceRange.min}
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange.min}
              onChange={(e) =>
                onPriceRangeChange({
                  ...priceRange,
                  min: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Max Price: ₹{priceRange.max}
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange.max}
              onChange={(e) =>
                onPriceRangeChange({
                  ...priceRange,
                  max: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
          <button
            onClick={() => onPriceRangeChange({ min: 0, max: 2000 })}
            className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Reset Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;