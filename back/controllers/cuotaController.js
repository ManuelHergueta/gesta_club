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

const cuotasGetConNombre = (req, res = response) => {
    const conx = new Conexion();
    conx.getCuotasConNombre()
        .then( msg => {
            console.log('Listado de cuotas correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registros',err);
            res.status(203).json({'msg': 'No se han encontrado registros'});
        });
}

const cuotasPorDniGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getCuotasPorDni(req.params.dni)
        .then( msg => {
            console.log('Listado de cuotas por dni correcto');
            res.status(203).json(msg);
        })
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg':'No se han encontrado registros por dni'});
        });
}

const cuotaGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getCuota(req.params.id)
        .then( msg => {
            console.log('Encontrada la cuota!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No existe el registro');
            res.status(203).json({'msg': 'No se ha encontrado el registro'});
        });
}

const cuotaPut = (req, res = response) => {
    const conx = new Conexion();
    conx.modificarCuota(req.params.id, req.body)
        .then( msg => {
            console.log('Cuota actualizada correctamente!');
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Ha fallado la actualización!');
            res.status(203).json(err);
        });
}

module.exports = {
    cuotasGet,
    cuotasGetConNombre,
    cuotasPorDniGet,
    cuotaGet,
    cuotaPut
}