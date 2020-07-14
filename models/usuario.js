var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'El rol {VALUE} no es un rol permitido.'
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo "nombre" es obligatorio.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El campo "email" es obligatorio.']
    },
    password: {
        type: String,
        required: [true, 'El campo "password" es obligatorio.']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: validRoles
    }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El campo {PATH} debe de ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);