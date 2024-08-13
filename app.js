const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const usersRouter = require('./routes/userRouter');
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key', // Consider using an environment variable for this
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
