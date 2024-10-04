import jwt from 'jsonwebtoken';
import { CustomError } from '../Error/customError.js';

const jwtAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify token and extract the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;

        next();
    } catch (error) {
        throw new CustomError('Invalid token', 401);
    }
};

export default jwtAuth;
