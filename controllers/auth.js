const {response} = require('express');
const bycrypt = require('bcryptjs');
const Users = require('../models/user_model');
const {generateJWT} = require('../helpers/jsonwebtoken');

const createUser = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        // Evaluar si el correo que esta creado el usuario existe
        const existEmail = await Users.findOne({email});
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new Users(req.body);

        // Encriptar contraseña
        const salt = bycrypt.genSaltSync();
        user.password = bycrypt.hashSync(password, salt);

        await user.save();

        // Generar JsonWebToken
        const token = await generateJWT(user.id);
        
        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        // Buscar al usuario por el correo electrónico
        const userDB = await Users.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar la contraseña
        const validPassword = bycrypt.compareSync( password, userDB.password );
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no coincide'
            });
        }

        // Generar JsonWebToken
        const token = await generateJWT(userDB.id);
        
        res.json({
            ok: true,
            user: userDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    try {
        // ID del usuario
        const id = req.id;

        // Generar JsonWebToken
        const token = await generateJWT(id);

        // Obtener el usuario desde la base de datos
        const user = await Users.findById(id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    createUser,
    login,
    renewToken
}