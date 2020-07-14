var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var verfyToken = require('../middlewares/authetication');

var app = express();

var Usuario = require('../models/usuario');

// Obtención de usuarios
app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role').exec((err, users) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error en la obtención de usuarios',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            users: users
        });
    });
});

// Creación de usuario
app.post('/', verfyToken.verifyToken, (req, res, next) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en la creación de usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });
});

// Actualización de usuario
app.put('/:id', verfyToken.verifyToken, (req, res, next) => {
    var body = req.body;
    var id = req.params.id;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error en la búsqueda del usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario con el id ' + id + ' no existe.',
                errors: { message: 'No existe un usuario con ese ID.' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            usuario.password = ':)';
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error en la actualización del usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});

// Borrar usuario
app.delete('/:id', verfyToken.verifyToken, (req, res, next) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error en el borrado del usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario con el id ' + id + ' no existe.',
                errors: { message: 'No existe un usuario con ese ID.' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;