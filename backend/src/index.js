const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dbConnect();

const app = express();

// CORS Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://rbac-frontend.vercel.app',  // Add your Vercel frontend URL
        /\.vercel\.app$/  // Allow all subdomains on vercel.app
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Vercel serverless function handler
if (process.env.VERCEL) {
    module.exports = app;
} else {
    // Start the Server (for local development)
    const PORT = process.env.PORT || 7001;
    app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
    });
}
