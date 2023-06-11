const {response} = require('express');
const Messages = require('../models/message_model');
 
const getMessages = async (req, res = response) => {
    const myId = req.id;
    const messagesFrom = req.params.from;

    const last30 = await Messages
        .find({$or: [{from: myId, to: messagesFrom}, {from: messagesFrom, to: myId}]})
        .sort({createdAt: 'desc'})
        .limit(30);

    res.json({
        ok: true,
        messages: last30
    })
}

module.exports = {getMessages}