const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionPartido');

const partidosGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getPartidos()
        .then( msg => {
            console.log('Listado de partidos correcto!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg':'No se han encontrado registros'});
        }); 
}

const partidosGetConCategoria = (req, res = response) => {
    const conx = new Conexion();
    conx.getPartidosConCategoria()
        .then( msg => {
            console.log('Listado de partidos correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registros',err);
            res.status(203).json({'msg': 'No se han encontrado registros'});
        });
}

const partidoGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getPartido(req.params.id)
        .then( msg => {
            console.log('Encontrado el partido!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No existe el registro');
            res.status(203).json({'msg':'No se ha encontrado el registro'});
        });
}

const partidoPost = (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarPartido(req.body)
        .then( msg => {
            console.log('Insertado correctamente!');
            const resp = {
                success: true,
                msg: 'Partido dado de alta'
            }
            res.status(201).json(resp);
        })
        .catch( err => {
            console.log(err);
            const resp = {
                success: false,
                msg: 'Fallo en el registro'
            }
            res.status(203).json(resp);
        });
}

const partidoPut = (req, res = response) => {
    const conx = new Conexion();
    conx.modificarPartido(req.params.id, req.body)
        .then( msg => {
            console.log('Partido modificado correctamente!');
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Ha fallado la modificación');
            res.status(203).json(err);
        });
}

const partidoDelete = (req, res = response) => {
    const conx = new Conexion();
    conx.borrarPartido(req.params.id)
        .then( msg => {
            console.log('Partido borrado correctamente!');
            res.status(202).json({ message: `Partido ${req.params.id} eliminado.`});
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

module.exports = {
    partidosGet,
    partidosGetConCategoria,
    partidoGet,
    partidoPost,
    partidoPut,
    partidoDelete
}