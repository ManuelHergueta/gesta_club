const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Alineacion = db.define('alineacion', {
    id_partido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    dni_deportista: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
},
{
    tableName: 'alineaciones'
});

module.exports = Alineacion;