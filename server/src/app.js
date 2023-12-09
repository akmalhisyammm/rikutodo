// Internal imports
const path = require('path');

// Third-party imports
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// Routes imports
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// Utilities imports
const AppError = require('./utils/AppError');

// Middleware imports
const errorMiddleware = require('./middlewares/errorMiddleware');

// Application setup
const app = express();

// Enable CORS (Access-Control-Allow-Origin: only from the client URL)
app.use(cors({ origin: process.env.CLIENT_URL }));

// Preflight CORS requests
app.options('*', cors({ origin: process.env.CLIENT_URL }));

// Trust proxy
app.enable('trust proxy');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Security HTTP headers
app.use(helmet());

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Prevent XSS attacks
app.use(xss());

// Rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});

// Development logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Compress response body
app.use(compression());

// Routes
app.use('/api', limiter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Define undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server.`, 404));
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
