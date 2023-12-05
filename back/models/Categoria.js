const { DataTypes } = require ('sequelize');

const db = require ('../database/conexion/connection');

const Categoria = db.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    edad_minima: {
        type: DataTypes.INTEGER
    },
    edad_maxima: {
        type: DataTypes.INTEGER
    },
    mensualidad: {
        type: DataTypes.INTEGER
    },
},
{
    tableName: 'categorias'
});

module.exports = Categoria;