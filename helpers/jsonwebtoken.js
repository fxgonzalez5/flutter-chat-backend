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

const verifyJWT = (token = '') => {
    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        return [true, id];
    } catch (error) {
        return [false, null];
    }
};

module.exports = {generateJWT, verifyJWT};