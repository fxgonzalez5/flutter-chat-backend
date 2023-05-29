/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jsonwebtoken');

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña no cuenta con la cantidad de caracteres necesarios').isLength(8),
    validateFields
], createUser);


router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña no cuenta con la cantidad de caracteres necesarios').isLength(8),
    validateFields
], login);


router.get('/renew', validateJWT, renewToken);

module.exports = router;