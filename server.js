import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import authMiddleware from './middleware/authmiddleware.js';
import routeNotFound from './middleware/errorMiddleware.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

config();
connectDB();

const app = express();

// Allowed origins
const allowedOrigins = ['http://localhost']; // Add other allowed origins here if necessary

// Configure CORS
app.use(
    cors({
        origin: allowedOrigins, // Set allowed origins
        credentials: true, // Allow cookies and credentials
    })
);

// Middleware
app.use(json());
app.use(cookieParser());

// Routes
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/users', userRoutes);
app.post('/api/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged out successfully' });
  });
  

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Mongoose!');
});

// Error handling
app.use(routeNotFound);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
