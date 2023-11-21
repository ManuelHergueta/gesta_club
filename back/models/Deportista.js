const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Deportista = db.define('deportista', {
    dni: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY
    },
    temporada: {
        type: DataTypes.INTEGER
    },
    categoria_id: {
        type: DataTypes.INTEGER
    },
    dorsal: {
        type: DataTypes.INTEGER
    },
    telefono: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    email_verificado: {
        type: DataTypes.TINYINT
    },
    direccion: {
        type: DataTypes.STRING
    },
    poblacion: {
        type: DataTypes.STRING
    },
    codigo_postal: {
        type: DataTypes.STRING
    },
    provincia: {
        type: DataTypes.STRING
    },
    tutor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telef_tutor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    datos_medicos: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
    tableName: 'deportistas'
});

module.exports = Deportista;