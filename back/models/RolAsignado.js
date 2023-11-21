const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const RolAsignado = db.define('rol_asignado', {
    email_usuario: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
},
{
    tableName: 'roles_asignados'
});


module.exports = RolAsignado;