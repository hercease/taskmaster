import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;

        //console.log('Auth Middleware:', { token: req.cookies.token });


        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Token not found.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object

        next(); // Proceed to the next middleware or route handler
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        }

        return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
};

export default authMiddleware;
