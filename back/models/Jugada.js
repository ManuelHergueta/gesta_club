const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Jugada = db.define('jugada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    puntos: {
        type: DataTypes.INTEGER
    },
},
{
    tableName: 'jugadas'
});

module.exports = Jugada;