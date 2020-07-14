// Requires (importación de librerías)
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Conexión BBDD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos \x1b[32m%s\x1b[0m en el puerto 27017', 'inicializada correctamente')
    }
});

// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        msg: 'Petición realizada correctamente'
    });
});

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Servidor \x1b[32m%s\x1b[0m en el puerto 3000 ', 'inicializado correctamente');
});