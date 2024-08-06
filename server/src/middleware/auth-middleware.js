// middleware/auth-middleware.js
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/asynchandler.js';
import { User } from '../models/users.js';

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization||req.query.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError(401, 'Unauthorized'));
    }
    // const token=
    const token = authHeader.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select('-password -refreshToken');
    
    if (!user) {
      return next(new ApiError(401, 'Invalid Access Token'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    next(new ApiError(401, error.message || 'Invalid Access Token'));
  }
});
// export {verifyJwt,};