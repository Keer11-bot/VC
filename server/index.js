import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://vivarancreations.com',
    'https://www.vivarancreations.com'
  ],
  credentials: true
}));
app.use(express.json());

// PayU Configuration
const MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
const MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';
const PAYU_BASE_URL = process.env.PAYU_BASE_URL || 'https://test.payu.in/_payment';

// Get frontend URL based on environment
const getFrontendUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://vivarancreations.com';
  }
  return process.env.FRONTEND_URL || 'http://localhost:5173';
};

// Utility function to generate transaction ID
const generateTransactionId = () => {
  return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Utility function to generate PayU hash
const generatePayUHash = (key, txnid, amount, productinfo, firstname, email, salt) => {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Payment server is running',
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: getFrontendUrl()
  });
});

// Initialize payment endpoint
app.post('/api/payment/initialize', async (req, res) => {
  try {
    console.log('Payment initialization request:', req.body);

    const {
      amount,
      planName,
      planType,
      customerName,
      customerEmail,
      customerMobile,
      userId
    } = req.body;

    // Validate required fields
    if (!amount || !planName || !customerName || !customerEmail || !customerMobile) {
      console.log('Missing required fields:', { amount, planName, customerName, customerEmail, customerMobile });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate mobile number
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    if (!mobileRegex.test(customerMobile.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number format'
      });
    }

    // Generate transaction ID
    const txnId = generateTransactionId();
    const productInfo = `${planType === 'service' ? 'Service' : 'Startup'} Plan - ${planName}`;
    
    // Generate URLs based on environment
    const frontendUrl = getFrontendUrl();
    const successUrl = `${frontendUrl}/payment-success`;
    const failureUrl = `${frontendUrl}/payment-failure`;
    
    // Generate hash
    const hash = generatePayUHash(
      MERCHANT_KEY,
      txnId,
      numericAmount.toString(),
      productInfo,
      customerName,
      customerEmail,
      MERCHANT_SALT
    );

    // Prepare payment data
    const paymentData = {
      key: MERCHANT_KEY,
      txnid: txnId,
      amount: numericAmount.toString(),
      productinfo: productInfo,
      firstname: customerName,
      email: customerEmail,
      phone: customerMobile,
      surl: successUrl,
      furl: failureUrl,
      hash: hash,
      service_provider: 'payu_paisa'
    };

    // Log payment initialization (remove in production)
    console.log('Payment initialized:', {
      txnId,
      amount: numericAmount,
      customer: customerName,
      email: customerEmail,
      successUrl,
      failureUrl
    });

    // Return payment data and PayU URL
    res.json({
      success: true,
      paymentData,
      payuUrl: PAYU_BASE_URL,
      transactionId: txnId,
      message: 'Payment initialized successfully'
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during payment initialization'
    });
  }
});

// Verify payment hash (for webhook/callback verification)
app.post('/api/payment/verify', (req, res) => {
  try {
    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash
    } = req.body;

    // Validate required fields
    if (!key || !txnid || !amount || !hash) {
      return res.status(400).json({
        success: false,
        message: 'Missing required verification fields'
      });
    }

    // Generate expected hash for verification
    const expectedHash = generatePayUHash(
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      MERCHANT_SALT
    );

    const isValid = hash === expectedHash;

    // Log verification attempt
    console.log('Payment verification:', {
      txnid,
      status,
      isValid,
      amount
    });

    res.json({
      success: true,
      isValid,
      status,
      transactionId: txnid,
      message: isValid ? 'Payment verified successfully' : 'Payment verification failed'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during verification'
    });
  }
});

// PayU webhook endpoint (for production use)
app.post('/api/payment/webhook', (req, res) => {
  try {
    console.log('PayU webhook received:', req.body);
    
    // Verify the webhook data
    const verificationResult = req.body;
    
    // Here you would typically:
    // 1. Verify the hash
    // 2. Update payment status in database
    // 3. Send confirmation emails
    // 4. Update user subscriptions
    
    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Payment server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${getFrontendUrl()}`);
  console.log(`💳 PayU URL: ${PAYU_BASE_URL}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Merchant Key: ${MERCHANT_KEY}`);
});