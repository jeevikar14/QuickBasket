import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
    checkWishlist();
  }, [id, user]);

  const checkWishlist = async () => {
    if (!user) return;
    try {
      const { data } = await axiosClient.get('/auth/profile');
      setInWishlist(data.wishlist && data.wishlist.includes(id));
    } catch (err) {
      setInWishlist(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      alert('Please login to use wishlist');
      navigate('/login');
      return;
    }
    setWishlistLoading(true);
    try {
      await axiosClient.post(`/auth/wishlist/${id}`);
      setInWishlist((prev) => !prev);
      alert(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err) {
      alert('Error updating wishlist');
    }
    setWishlistLoading(false);
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axiosClient.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error('Error:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await axiosClient.get(`/products/${id}/related`);
      setRelatedProducts(data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <button onClick={() => navigate('/')} className="text-gray-600 hover:text-primary-600">
          Home
        </button>
        <span className="mx-2 text-gray-400">/</span>
        <button onClick={() => navigate('/products')} className="text-gray-600 hover:text-primary-600">
          Products
        </button>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-primary-600 font-semibold mb-2 uppercase">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-3 text-gray-600">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-4 mb-6">
            <span className="text-5xl font-bold text-gray-900">
              ₹ {product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-3xl text-gray-500 line-through">
                  ₹ {product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm font-semibold">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold text-lg">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-semibold text-lg">✗ Out of Stock</p>
            )}
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Quantity:
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 btn-primary text-lg py-4"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, quantity);
                navigate('/checkout');
              }}
              disabled={product.stock === 0}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className={`flex-1 py-4 rounded-lg font-medium transition-colors ${inWishlist ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-200 text-gray-700 hover:bg-pink-100'}`}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <div key={prod._id} className="bg-white rounded-xl shadow-md overflow-hidden hover-card">
                <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{prod.name}</h3>
                  <p className="text-2xl font-bold text-primary-600">₹ {prod.price}</p>
                  <button
                    onClick={() => navigate(`/products/${prod._id}`)}
                    className="w-full mt-4 btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;