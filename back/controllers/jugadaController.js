const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionJugada');

const jugadasGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getJugadas()
        .then( msg => {
            console.log('Listado de jugadas correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay jugadas!?');
            res.status(203).json({msg: 'No se han encontrado jugadas', err});
        });
}

module.exports = {
    jugadasGet
}