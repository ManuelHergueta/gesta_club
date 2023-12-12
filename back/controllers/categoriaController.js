const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionCategoria');

const categoriasGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getCategorias()
        .then( msg => {
            console.log('Listado de cuotas correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay categorias!?');
            res.status(203).json({msg: 'No se han encontrado categorias', err});
        });
}

module.exports = {
    categoriasGet
}