const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dbConnect();

const app = express();

// Updated CORS configuration
app.use(cors({
    origin: ['https://rbac-ruddy.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
    ],
    exposedHeaders: ['Set-Cookie']
}));

// Additional headers for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Vercel serverless function handler
if (process.env.VERCEL) {
    module.exports = app;
} else {
    const PORT = process.env.PORT || 7001;
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
    });
}
