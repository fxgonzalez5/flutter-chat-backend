const {io} = require('../index')
const {verifyJWT} = require('../helpers/jsonwebtoken')
const {userConnected, userDisconnect, recordMessage} = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [valid, id] = verifyJWT(client.handshake.headers['x-token']);
    
    // Verificar autenticación
    if (!valid) { return client.disconnect(); }

    // Cliente autenticado
    userConnected(id);

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, sala privada
    client.join(id);

    // Escuchar del cliente el mensaje-personal
    client.on('personal-message', async (payload) => {
        await recordMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    })

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        userDisconnect(id);
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', {admin: 'Nuevo mensaje'})
    // })
});