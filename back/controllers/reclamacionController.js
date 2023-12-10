const { response, request } = require('express');
const Conexion = require('../database/queries/ConexionReclamacion');
const envioReclamacion = require('../helpers/reclamacion-email');

const reclamacionesGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getReclamaciones()
        .then( msg => {
            console.log('Listado de reclamaciones correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg':'No se han encontrado registros'});
        });
}

const reclamacionPost = (req, res = response) => {
    const conx = new Conexion();
    conx.registrarReclamacion(req.body)
        .then( msg => {
            envioReclamacion.correoReclamacionDeCuota(msg);
            console.log('Registrada reclamación y enviada por email');
            const resp = {
                success: true,
                msg: 'Reclamacion dada de alta'
            }
            res.status(201).json(resp);
        })
        .catch( err => {
            console.log('Error en el registro y envio de la reclamacion', err);
            const resp = {
                success: false,
                msg: 'Fallo en el registro'
            }
            res.status(203).json(resp);
        })
}

module.exports = {
    reclamacionesGet,
    reclamacionPost
}