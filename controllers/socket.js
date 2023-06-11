const User = require('../models/user_model');
const Message = require('../models/message_model');

const userConnected = async (id = '') => {
    const user = await User.findById(id);
    user.online = true;
    await user.save();
    return user;
}

const userDisconnect = async (id = '') => {
    const user = await User.findById(id);
    user.online = false;
    await user.save();
    return user;
}

const recordMessage = async (payload) => {
    /* 
        payload: {
            from: '',
            to: '',
            message: ''
        }
    */

    try {
        const message = new Message(payload);
        await message.save();
        return true;
    }  catch (error) { return false; }
}

module.exports = {userConnected, userDisconnect, recordMessage}