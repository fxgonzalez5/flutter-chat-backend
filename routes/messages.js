/*
    path: api/messages
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jsonwebtoken');
const { getMessages } = require('../controllers/messages');

const router = Router();

router.get('/:from', validateJWT, getMessages);

module.exports = router;