const { response, request } = require('express');
const Conexion = require('../database/queries/ConexionCuota');

const cuotasGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getCuotas()
        .then( msg => {
            console.log('Listado de cuotas correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg': 'No se han encontrado registros'});
        });
}

module.exports = {
    cuotasGet
}