const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionAlineacion');

const alineacionesGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getAlineaciones(req.params.id_partido)
        .then( msg => {
            console.log('Listado de alineaciones correcto!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg':'No se han encontrado registros'});
        }); 
}

const alineacionPost = (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarAlineacion(req.body)
        .then( msg => {
            console.log('Insertadas correctamente!');
            const resp = {
                success: true,
                msg: 'Alineaciones actualizadas correctamente!'
            }
            res.status(201).json(resp);
        })
        .catch( err => {
            const resp = {
                success: false,
                msg: 'Error al actualizar las alineaciones'
            }
            res.status(203).json(resp);
        });
}

const alineacionDelete = (req, res = response) => {
    const conx = new Conexion();
    conx.borrarAlineacion(req.params.id_partido,req.params.dni_deportista)
        .then( msg => {
            console.log('Alineacion borrada correctamente!');
            res.status(202).json({ message: `Alineacion eliminada.`});
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

module.exports = {
    alineacionesGet,
    alineacionPost,
    alineacionDelete
}