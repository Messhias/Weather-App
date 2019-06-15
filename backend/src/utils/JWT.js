// jwt token
export const jwt = require('jsonwebtoken');

/**
 * Verify JWT.
 *
 * @middleware
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
export function verifyJWT (req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything's is fine save the request and proceed to the next
        req.userId = decoded.id;
        next();
    });
}