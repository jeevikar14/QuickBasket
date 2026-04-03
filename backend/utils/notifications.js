

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');


/**
 * Email Service using Nodemailer
 * Sends email notifications to users
 */

let transporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}




/**
 * Send Order Confirmation Email
 */
const sendOrderConfirmationEmail = async (toEmail, orderId, totalPrice) => {
  try {
    if (!transporter) {
      console.log('⚠️ Email not configured, skipping email');
      return false;
    }
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: toEmail,
      subject: '🎉 Your Quick Basket Order Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px; border-radius: 12px; max-width: 500px; margin: auto;">
          <h2 style="color: #2d3748;">Thank you for shopping with <span style='color:#2563eb;'>Quick Basket</span>!</h2>
          <p style="font-size: 18px; color: #333;">Your order has been received and is being processed.</p>
          <div style="background: #fff; border-radius: 8px; padding: 16px; margin: 24px 0; box-shadow: 0 2px 8px #eee;">
            <p style="font-size: 16px; color: #2563eb; font-weight: bold;">Order ID: <span style="font-family: monospace;">${orderId.slice(-8)}</span></p>
            <p style="font-size: 16px; color: #111;">Total Amount: <span style="font-weight: bold;">₹ ${totalPrice.toFixed(2)}</span></p>
          </div>
          <p style="font-size: 16px; color: #333;">You can track your order status and view details at any time:</p>
          <a href="${process.env.FRONTEND_URL}/orders" style="display: inline-block; background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 12px;">View My Orders</a>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 14px; color: #888;">If you have any questions, reply to this email or contact our support team.</p>
          <p style="font-size: 14px; color: #888;">Thank you for choosing Quick Basket!</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`✅ Order confirmation email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    return false;
  }
};


/**
 * Send Order Shipped Email
 */
const sendOrderShippedEmail = async (toEmail, orderId, trackingNumber) => {
  try {
    if (!transporter) {
      console.log('⚠️ Email not configured, skipping email');
      return false;
    }
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: toEmail,
      subject: '🚚 Your Quick Basket Order Has Shipped!',
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px; border-radius: 12px; max-width: 500px; margin: auto;">
          <h2 style="color: #2d3748;">Good news! Your order is on its way.</h2>
          <div style="background: #fff; border-radius: 8px; padding: 16px; margin: 24px 0; box-shadow: 0 2px 8px #eee;">
            <p style="font-size: 16px; color: #2563eb; font-weight: bold;">Order ID: <span style="font-family: monospace;">${orderId.slice(-8)}</span></p>
            <p style="font-size: 16px; color: #111;">Tracking Number: <span style="font-weight: bold;">${trackingNumber}</span></p>
          </div>
          <p style="font-size: 16px; color: #333;">Track your order status and delivery:</p>
          <a href="${process.env.FRONTEND_URL}/orders" style="display: inline-block; background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 12px;">Track My Order</a>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 14px; color: #888;">If you have any questions, reply to this email or contact our support team.</p>
          <p style="font-size: 14px; color: #888;">Thank you for shopping with Quick Basket!</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`✅ Shipping email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending shipping email:', error.message);
    return false;
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendOrderShippedEmail,
};
