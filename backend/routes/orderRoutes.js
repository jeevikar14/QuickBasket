const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderStatus,
  cancelOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Create a new order with order items and shipping information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderItems
 *               - shippingAddress
 *               - paymentMethod
 *               - itemsPrice
 *               - taxPrice
 *               - shippingPrice
 *               - totalPrice
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *                     name:
 *                       type: string
 *                       example: "Gaming Laptop"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 2
 *                     image:
 *                       type: string
 *                       example: "/images/laptop.jpg"
 *                     price:
 *                       type: number
 *                       example: 1299.99
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - name
 *                   - phone
 *                   - street
 *                   - city
 *                   - state
 *                   - zipCode
 *                   - country
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "New York"
 *                   state:
 *                     type: string
 *                     example: "NY"
 *                   zipCode:
 *                     type: string
 *                     example: "10001"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *               paymentMethod:
 *                 type: string
 *                 enum: [Credit Card, Debit Card, PayPal, Cash on Delivery]
 *                 example: "Credit Card"
 *               itemsPrice:
 *                 type: number
 *                 example: 2599.98
 *               taxPrice:
 *                 type: number
 *                 example: 259.99
 *               shippingPrice:
 *                 type: number
 *                 example: 10.00
 *               totalPrice:
 *                 type: number
 *                 example: 2869.97
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - no order items or insufficient stock
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       404:
 *         description: Product not found
 */
router.post('/', protect, createOrder);

/**
 * @openapi
 * /api/orders/myorders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get logged-in user's orders
 *     description: Retrieve all orders for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
router.get('/myorders', protect, getMyOrders);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders (Admin only)
 *     description: Retrieve all orders with user information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - admin access required
 */
router.get('/', protect, admin, getAllOrders);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID (own order or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - not authorized to view this order
 *       404:
 *         description: Order not found
 */
router.get('/:id', protect, getOrderById);

/**
 * @openapi
 * /api/orders/{id}/pay:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update order to paid
 *     description: Mark an order as paid with payment details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "PAYPAL_TXN_ID"
 *               status:
 *                 type: string
 *                 example: "COMPLETED"
 *               update_time:
 *                 type: string
 *                 format: date-time
 *               email_address:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Order marked as paid successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       404:
 *         description: Order not found
 */
router.put('/:id/pay', protect, updateOrderToPaid);

/**
 * @openapi
 * /api/orders/{id}/status:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update order status (Admin only)
 *     description: Update the status of an order (Pending, Processing, Shipped, Delivered, Cancelled)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Processing, Shipped, Delivered, Cancelled]
 *                 example: "Shipped"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Order not found
 */
router.put('/:id/status', protect, admin, updateOrderStatus);

/**
 * @openapi
 * /api/orders/{id}/cancel:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Cancel an order
 *     description: Cancel an order and restore product stock (own order or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - cannot cancel delivered order
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - not authorized to cancel this order
 *       404:
 *         description: Order not found
 */
router.put('/:id/cancel', protect, cancelOrder);

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *         shippingAddress:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             phone:
 *               type: string
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zipCode:
 *               type: string
 *             country:
 *               type: string
 *         paymentMethod:
 *           type: string
 *           enum: [Credit Card, Debit Card, PayPal, Cash on Delivery]
 *         paymentResult:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             status:
 *               type: string
 *             update_time:
 *               type: string
 *             email_address:
 *               type: string
 *         itemsPrice:
 *           type: number
 *         taxPrice:
 *           type: number
 *         shippingPrice:
 *           type: number
 *         totalPrice:
 *           type: number
 *         isPaid:
 *           type: boolean
 *         paidAt:
 *           type: string
 *           format: date-time
 *         isDelivered:
 *           type: boolean
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *         orderStatus:
 *           type: string
 *           enum: [Pending, Processing, Shipped, Delivered, Cancelled]
 *           example: "Processing"
 *         trackingNumber:
 *           type: string
 *           example: "TRK1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

module.exports = router;