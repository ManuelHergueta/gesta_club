const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Recibo = db.define('recibo', {
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
    nombre_completo: {
        type: DataTypes.STRING
    },
    fecha_pago: {
        type: DataTypes.DATEONLY
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
    tipo_pago: {
        type: DataTypes.STRING
    },
    codigo_verificacion: {
        type: DataTypes.STRING
    },
},
{
    tableName: 'recibos'
});

module.exports = Recibo;