const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Anotacion = db.define('anotacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni_deportista: {
        type: DataTypes.STRING
    },
    id_partido: {
        type: DataTypes.INTEGER
    },
    id_jugada: {
        type: DataTypes.INTEGER
    },
},
{
    tableName: 'anotaciones'
});

module.exports = Anotacion;