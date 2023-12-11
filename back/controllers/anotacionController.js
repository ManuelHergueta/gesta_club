const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionAnotacion');


const crearAnotaciones = (req, res = response) => {
    const conx = new Conexion();
    conx.crearAnotacionesPost(req.body)
        .then ( msg => {
            console.log('Anotaciones registradas con éxito');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No se han registrado las anotaciones');
            res.status(203).json({ 'msg': 'Error en el registo de anotaciones', err });
        })
}

const mostrarTopJugadores = (req, res = response) => {
    const conx = new Conexion();
    conx.obtenerTopJugadores()
        .then ( msg => {
            console.log('Obtenido TOP jugadores');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No se ha podido obtener la estadística');
            res.status(203).json({'msg': 'Error en la estadistica', err});
        })
}

const mostrarTopJugadoresXPartido = (req, res = response) => {
    const conx = new Conexion();
    conx.obtenerTopJugadoresPorPartido(req.params.id_partido)
        .then ( msg => {
            console.log('Obtenido TOP jugadores del partido');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No se ha podido obtener la estadística');
            res.status(203).json({'msg': 'Error en la estadistica', err});
        })
}

module.exports = {
    crearAnotaciones,
    mostrarTopJugadores,
    mostrarTopJugadoresXPartido
}