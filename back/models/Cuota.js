const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Cuota = db.define('cuota', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni_deportista: {
        type: DataTypes.STRING
    },
    temporada: {
        type: DataTypes.INTEGER
    },
    mes: {
        type: DataTypes.STRING
    },
    importe: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.STRING
    },
    fecha_pago: {
        type: DataTypes.DATEONLY
    },
    tipo_pago: {
        type: DataTypes.STRING
    },
},
{
    tableName: 'cuotas'
});

module.exports = Cuota;