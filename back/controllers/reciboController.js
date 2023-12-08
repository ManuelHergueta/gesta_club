const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionRecibo');
const envioRecibo = require('../helpers/recibo-email');

const recibosGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getRecibos()
        .then( msg => {
            console.log('Listado de recibos correcto!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No hay recibos');
            res.status(203).json({'msg':'No se han encontrado recibos'});
        }); 
}

const reciboGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getRecibo(req.params.id)
        .then( msg => {
            console.log('Encontrado el recibo!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No existe el recibo');
            res.status(203).json({'msg':'No se ha encontrado el recibo'});
        });
}

const reenviarReciboGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getRecibo(req.params.id)
        .then( msg => {
            envioRecibo.correoReciboDePago(msg);
            console.log('Recibo reenviado por email');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('Fallo en el reenvio del recibo');
            res.status(203).json({'msg':'No se ha reenviado el recibo',err});
        });
}

const recibosPorPeticionGet = async (req, res) => {
    const { peticion, valor } = req.params;
    const conx = new Conexion();
    try {
        const resultados = await conx.getRecibosPorPeticion(peticion, valor);
        console.log(`Listado de recibos por ${peticion} correcto`);
        res.status(200).json(resultados);
    } catch (err) {
        console.log(`No hay registros para ${peticion}`);
        res.status(404).json({ msg: `No se han encontrado registros para ${peticion}`, err });
    }
}

const reciboPost = (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarRecibo(req.body)
        .then ( msg => {
            envioRecibo.correoReciboDePago(msg);
            console.log ('Recibo guardado y enviado por email ');
            const resp = {
                success: true,
                msg: 'Recibo dado de alta'
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

module.exports = {
    recibosGet,
    reciboGet,
    reenviarReciboGet,
    recibosPorPeticionGet,
    reciboPost
}