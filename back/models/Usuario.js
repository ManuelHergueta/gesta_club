const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Usuario = db.define('usuario', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    activado: {
        type: DataTypes.TINYINT
    },
    password: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
},
{
    tableName: 'usuarios'
});

module.exports = Usuario;