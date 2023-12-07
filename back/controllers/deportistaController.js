const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionDeportista');

const deportistasGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getDeportistas()
        .then( msg => {
            console.log('Listado de deportistas correcto!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg':'No se han encontrado registros'});
        }); 
}

const deportistaGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getDeportista(req.params.dni)
        .then( msg => {
            console.log('Encontrado el deportista!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No existe el registro');
            res.status(203).json({'msg':'No se ha encontrado el registro'});
        });
}

const deportistaConPrecioGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getDeportistaConPrecio(req.params.dni)
        .then( msg => {
            console.log('Encontrado el deportista!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No existe el registro');
            res.status(203).json({'msg':'No se ha encontrado el registro'});
        });
}

const deportistaPost = (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarDeportista(req.body)
        .then( msg => {
            console.log('Insertado correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('Falló el registro!!');
            res.status(203).json(err);
        });
}

const deportistaPut = (req, res = response) => {
    const conx = new Conexion();
    conx.modificarDeportista(req.params.dni, req.body)
        .then( msg => {
            console.log('Deportista modificado correctamente!');
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Ha fallado la modificación');
            res.status(203).json(err);
        });
}

const deportistaDelete = (req, res = response) => {
    const conx = new Conexion();
    conx.borrarDeportista(req.params.dni)
        .then( msg => {
            console.log('Deportista borrado correctamente!');
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

module.exports = {
    deportistasGet,
    deportistaGet,
    deportistaConPrecioGet,
    deportistaPost,
    deportistaPut,
    deportistaDelete
} 