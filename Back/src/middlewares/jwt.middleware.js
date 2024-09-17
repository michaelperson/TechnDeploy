import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const jwtMiddleware = (req, res, next) => {
    // regarde si dans les hearders, il y a une authorization
    const { authorization } = req.headers;

    if(authorization) {
        // Authorization = 'Bearer {token}'
        const token = authorization.replace('Bearer ', '');
        try {
            // decode le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // modifie la requete pour connecter un utilisateur
            req.user = { id: decoded.id, role: decoded.role, email: decoded.email }
        } catch(error) {         
        }
    }
    next();
}