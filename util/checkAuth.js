const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRETKEY } = require("../config");

module.exports = (context) => {
    // context =  { ...headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // Bearer Token
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, SECRETKEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }

        throw new Error('Authentication token must be \'Bearer [token]');
    } 
    throw new Error('Autherization header must be provided');
}