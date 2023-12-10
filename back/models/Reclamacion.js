const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Reclamacion = db.define('reclamacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cuota: {
        type: DataTypes.INTEGER
    },
    dni_deportista: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    mes: {
        type: DataTypes.STRING
    },
    temporada: {
        type: DataTypes.INTEGER
    },
},
{
    tableName: 'reclamaciones'
});

module.exports = Reclamacion;