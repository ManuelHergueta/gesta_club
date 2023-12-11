const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Partido = db.define('partido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria_id: {
        type: DataTypes.INTEGER
    },
    contrincante: {
        type: DataTypes.STRING
    },
    competicion: {
        type: DataTypes.STRING
    },
    fecha_partido: {
        type: DataTypes.DATEONLY
    },
},
{
    tableName: 'partidos'
});

module.exports = Partido;