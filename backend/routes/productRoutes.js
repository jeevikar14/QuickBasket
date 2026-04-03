const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createProductReview,
  deleteProductReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/products/categories/list:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all product categories
 *     description: Retrieve a list of all unique product categories
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Electronics", "Fashion", "Home & Garden", "Sports"]
 */
router.get('/categories/list', getCategories);

/**
 * @openapi
 * /api/products/featured:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get featured products
 *     description: Retrieve a list of featured products (limited to 8)
 *     responses:
 *       200:
 *         description: Featured products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/featured', getFeaturedProducts);

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products with filters
 *     description: Retrieve products with optional filtering, sorting, and pagination
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *         example: Electronics
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in product name, description, or tags
 *         example: laptop
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *         example: 100
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *         example: 1000
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price-asc, price-desc, rating, newest]
 *         description: Sort products by
 *         example: price-asc
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of items per page
 *         example: 12
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 5
 *                 total:
 *                   type: integer
 *                   example: 52
 */
router.get('/', getProducts);

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product (Admin only)
 *     description: Create a new product in the catalog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - image
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Gaming Laptop"
 *               description:
 *                 type: string
 *                 example: "High-performance gaming laptop with RTX 4060"
 *               price:
 *                 type: number
 *                 example: 1299.99
 *               originalPrice:
 *                 type: number
 *                 example: 1499.99
 *               category:
 *                 type: string
 *                 enum: [Electronics, Fashion, Home & Garden, Sports, Books, Toys, Beauty, Automotive]
 *                 example: Electronics
 *               subcategory:
 *                 type: string
 *                 example: "Laptops"
 *               brand:
 *                 type: string
 *                 example: "TechBrand"
 *               image:
 *                 type: string
 *                 example: "/images/laptop.jpg"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["/images/laptop1.jpg", "/images/laptop2.jpg"]
 *               stock:
 *                 type: integer
 *                 example: 50
 *               discount:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 example: 15
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["gaming", "laptop", "high-performance"]
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid data
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - admin access required
 */
router.post('/', protect, admin, createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get single product by ID
 *     description: Retrieve detailed information about a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/:id', getProductById);

/**
 * @openapi
 * /api/products/{id}/related:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get related products
 *     description: Retrieve products in the same category (limited to 4)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Related products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/:id/related', getRelatedProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product (Admin only)
 *     description: Update an existing product's information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               brand:
 *                 type: string
 *               image:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               stock:
 *                 type: integer
 *               discount:
 *                 type: number
 *               featured:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid data
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Product not found
 */
router.put('/:id', protect, admin, updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product (Admin only)
 *     description: Remove a product from the catalog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Product not found
 */
router.delete('/:id', protect, admin, deleteProduct);

/**
 * @openapi
 * /api/products/{id}/reviews:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product review
 *     description: Add a review and rating for a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excellent product! Highly recommended."
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review added successfully
 *       400:
 *         description: Bad request - already reviewed or invalid data
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       404:
 *         description: Product not found
 */
router.post('/:id/reviews', protect, createProductReview);

/**
 * @openapi
 * /api/products/{id}/reviews/{reviewId}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product review
 *     description: Remove a review from a product (own review or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *         example: 507f1f77bcf86cd799439012
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review deleted successfully
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - not authorized to delete this review
 *       404:
 *         description: Product or review not found
 */
router.delete('/:id/reviews/:reviewId', protect, deleteProductReview);

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           example: "Gaming Laptop"
 *         description:
 *           type: string
 *           example: "High-performance gaming laptop with RTX 4060"
 *         price:
 *           type: number
 *           example: 1299.99
 *         originalPrice:
 *           type: number
 *           example: 1499.99
 *         category:
 *           type: string
 *           example: Electronics
 *         subcategory:
 *           type: string
 *           example: "Laptops"
 *         brand:
 *           type: string
 *           example: "TechBrand"
 *         image:
 *           type: string
 *           example: "/images/laptop.jpg"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["/images/laptop1.jpg", "/images/laptop2.jpg"]
 *         stock:
 *           type: integer
 *           example: 50
 *         rating:
 *           type: number
 *           example: 4.5
 *         numReviews:
 *           type: integer
 *           example: 25
 *         reviews:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               user:
 *                 type: string
 *               name:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         featured:
 *           type: boolean
 *           example: false
 *         discount:
 *           type: number
 *           example: 15
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["gaming", "laptop"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;