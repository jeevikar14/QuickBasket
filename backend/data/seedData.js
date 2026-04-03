const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

// Sample products data
const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling headphones with 30-hour battery life. Deep bass, crystal clear audio, and comfortable fit for all-day wear.',
    price: 79.99,
    originalPrice: 129.99,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'SoundMax',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    ],
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    featured: true,
    discount: 38,
    tags: ['wireless', 'bluetooth', 'noise-canceling'],
  },
  {
    name: '4K Ultra HD Smart TV 55"',
    description: 'Experience stunning picture quality with HDR10+ support, built-in streaming apps, and voice control. Perfect for your home entertainment.',
    price: 599.99,
    originalPrice: 899.99,
    category: 'Electronics',
    subcategory: 'TV',
    brand: 'VisionPro',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'],
    stock: 25,
    rating: 4.7,
    numReviews: 89,
    featured: true,
    discount: 33,
    tags: ['4k', 'smart-tv', 'hdr'],
  },
  {
    name: 'Gaming Laptop Pro',
    description: 'High-performance gaming laptop with RTX graphics, 16GB RAM, 512GB SSD. Perfect for gaming and content creation.',
    price: 1299.99,
    originalPrice: 1599.99,
    category: 'Electronics',
    subcategory: 'Computers',
    brand: 'TechForce',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'],
    stock: 15,
    rating: 4.8,
    numReviews: 156,
    featured: false,
    discount: 19,
    tags: ['gaming', 'laptop', 'rtx'],
  },
  {
    name: 'Smartphone Pro Max',
    description: 'Latest flagship smartphone with 5G, 128GB storage, triple camera system, and all-day battery life.',
    price: 999.99,
    originalPrice: 1199.99,
    category: 'Electronics',
    subcategory: 'Mobile',
    brand: 'PhoneTech',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
    stock: 40,
    rating: 4.6,
    numReviews: 234,
    featured: true,
    discount: 17,
    tags: ['5g', 'smartphone', 'camera'],
  },

  // Fashion
  {
    name: 'Premium Leather Jacket',
    description: 'Genuine leather jacket with modern fit. Perfect for all seasons with premium quality craftsmanship.',
    price: 189.99,
    originalPrice: 299.99,
    category: 'Fashion',
    subcategory: 'Outerwear',
    brand: 'StyleCo',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'],
    stock: 30,
    rating: 4.4,
    numReviews: 67,
    featured: false,
    discount: 37,
    tags: ['leather', 'jacket', 'fashion'],
  },
  {
    name: 'Designer Sunglasses',
    description: 'UV protection sunglasses with polarized lenses. Stylish and functional for any occasion.',
    price: 149.99,
    originalPrice: 249.99,
    category: 'Fashion',
    subcategory: 'Accessories',
    brand: 'LuxVision',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
    stock: 60,
    rating: 4.3,
    numReviews: 45,
    featured: false,
    discount: 40,
    tags: ['sunglasses', 'uv-protection', 'polarized'],
  },
  {
    name: 'Running Shoes Elite',
    description: 'Professional running shoes with advanced cushioning and breathable mesh. Designed for maximum performance.',
    price: 129.99,
    originalPrice: 179.99,
    category: 'Fashion',
    subcategory: 'Footwear',
    brand: 'SportFit',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    stock: 75,
    rating: 4.7,
    numReviews: 198,
    featured: true,
    discount: 28,
    tags: ['running', 'shoes', 'sports'],
  },
  {
    name: 'Classic Denim Jeans',
    description: 'Comfortable fit jeans with premium denim fabric. Timeless style for everyday wear.',
    price: 59.99,
    originalPrice: 89.99,
    category: 'Fashion',
    subcategory: 'Bottoms',
    brand: 'DenimWorks',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    stock: 100,
    rating: 4.5,
    numReviews: 143,
    featured: false,
    discount: 33,
    tags: ['jeans', 'denim', 'casual'],
  },

  // Home & Garden
  {
    name: 'Modern Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with one touch.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Home & Garden',
    subcategory: 'Kitchen',
    brand: 'BrewMaster',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
    stock: 45,
    rating: 4.6,
    numReviews: 87,
    featured: false,
    discount: 31,
    tags: ['coffee', 'kitchen', 'appliance'],
  },
  {
    name: 'Indoor Plant Collection',
    description: 'Set of 3 easy-care indoor plants with decorative pots. Purify your air and beautify your space.',
    price: 49.99,
    originalPrice: 79.99,
    category: 'Home & Garden',
    subcategory: 'Plants',
    brand: 'GreenLife',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
    images: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500'],
    stock: 35,
    rating: 4.4,
    numReviews: 52,
    featured: true,
    discount: 38,
    tags: ['plants', 'indoor', 'decoration'],
  },
  {
    name: 'Smart Home Security Camera',
    description: '1080p HD camera with night vision, motion detection, and two-way audio. Keep your home safe 24/7.',
    price: 79.99,
    originalPrice: 119.99,
    category: 'Home & Garden',
    subcategory: 'Security',
    brand: 'SecureHome',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=500'],
    stock: 55,
    rating: 4.5,
    numReviews: 112,
    featured: false,
    discount: 33,
    tags: ['security', 'camera', 'smart-home'],
  },
  {
    name: 'Premium Bed Sheets Set',
    description: 'Luxury 1800 thread count bed sheets. Soft, breathable, and wrinkle-resistant for ultimate comfort.',
    price: 69.99,
    originalPrice: 129.99,
    category: 'Home & Garden',
    subcategory: 'Bedding',
    brand: 'ComfortLux',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500',
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500'],
    stock: 80,
    rating: 4.7,
    numReviews: 167,
    featured: false,
    discount: 46,
    tags: ['bedding', 'sheets', 'luxury'],
  },

  // Sports
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and home workouts.',
    price: 39.99,
    originalPrice: 59.99,
    category: 'Sports',
    subcategory: 'Fitness',
    brand: 'YogaPro',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
    stock: 90,
    rating: 4.6,
    numReviews: 234,
    featured: true,
    discount: 33,
    tags: ['yoga', 'fitness', 'exercise'],
  },
  {
    name: 'Professional Tennis Racket',
    description: 'Lightweight carbon fiber tennis racket. Perfect balance of power and control for all skill levels.',
    price: 149.99,
    originalPrice: 229.99,
    category: 'Sports',
    subcategory: 'Tennis',
    brand: 'ProSwing',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500',
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500'],
    stock: 25,
    rating: 4.5,
    numReviews: 78,
    featured: false,
    discount: 35,
    tags: ['tennis', 'racket', 'sports'],
  },
  {
    name: 'Mountain Bike 27.5"',
    description: 'All-terrain mountain bike with 21-speed gears and dual suspension. Ready for any adventure.',
    price: 499.99,
    originalPrice: 799.99,
    category: 'Sports',
    subcategory: 'Cycling',
    brand: 'TrailBlazer',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500',
    images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500'],
    stock: 15,
    rating: 4.8,
    numReviews: 156,
    featured: true,
    discount: 38,
    tags: ['bike', 'mountain', 'cycling'],
  },
  {
    name: 'Adjustable Dumbbells Set',
    description: 'Space-saving adjustable dumbbells from 5-52.5 lbs. Complete home gym in compact design.',
    price: 299.99,
    originalPrice: 449.99,
    category: 'Sports',
    subcategory: 'Fitness',
    brand: 'PowerFit',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
    images: ['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500'],
    stock: 30,
    rating: 4.7,
    numReviews: 189,
    featured: false,
    discount: 33,
    tags: ['dumbbells', 'weights', 'fitness'],
  },
];

// Admin user data
const adminUser = {
  name: 'Admin User',
  email: 'admin@ecommerce.com',
  password: 'admin123',
  role: 'admin',
};

// Function to seed database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Product.deleteMany();

    // Create admin user
    console.log('👤 Creating admin user...');
    await User.create(adminUser);

    // Create products
    console.log('📦 Creating products...');
    await Product.insertMany(products);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${products.length} products`);
    console.log(`👤 Admin credentials: ${adminUser.email} / ${adminUser.password}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();