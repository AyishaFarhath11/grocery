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

// List allowed origins exactly — update this to your frontend URL(s)
const allowedOrigins = ['http://localhost:3000','https://grocery-76nq.vercel.app'];
//dsfxcgvbhjnk

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like Postman or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // IMPORTANT for cookies/auth
}));

// Handle preflight requests globally
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Stripe webhook needs raw body before JSON parser
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Middleware order: cookieParser then express.json
app.use(cookieParser());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API is Working"));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
