const jwt = require('jsonwebtoken')
import { env } from "../env";

export function getToken(req) {
    const authHeader = req.header('Authorization');

    if(!authHeader) throw new Error('No token provided');
    try {
        return jwt.verify(authHeader, env.JWT_SECRET)
    } catch (error) {
        throw new Error('invalid token')
    }
}

