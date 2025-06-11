import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
console.log("MONGO_URI is:", process.env.MONGO_URI);
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect DB and Cloudinary
await connectDB();
await connectCloudinary();

// ✅ List allowed origins — EXACT, no slash at end
const allowedOrigins = [
  'http://localhost:3000',
  'https://grocery-76nq.vercel.app'
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman/curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(
        new Error(`The CORS policy does not allow origin: ${origin}`),
        false
      );
    }
  },
  credentials: true
}));

// ✅ Handle preflight (OPTIONS) requests globally
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Stripe raw body must come before JSON
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// ✅ Middleware order
app.use(cookieParser());
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => res.send("API is Working"));

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
