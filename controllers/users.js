const {response} = require('express');
const Users = require('../models/user_model');
 
const getUsers = async (req, res = response) => {
    const from = Number(req.query.from) || 0;

    const users = await Users
        .find({_id: {$ne: req.id}})
        .sort('-online')
        .skip(from)
        .limit(2);

    res.json({
        ok: true,
        users,
        from
    })
}

module.exports = {getUsers}