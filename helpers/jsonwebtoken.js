const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h',
        }, (error, token) => {
            if (error) {
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = generateJWT;