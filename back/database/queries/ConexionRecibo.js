const Recibo = require('../../models/Recibo');
const ConexionSequelize = require('../conexion/ConexionSequelize');
const bcrypt = require('bcryptjs');

class ConexionRecibo extends ConexionSequelize {

    constructor() {
        super();
    }

    getRecibos = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Recibo.findAll();
        this.desconectar();
        return resultado;
    }

    getRecibo = async(id) => {
        let resultado = [];
        this.conectar();
        resultado = await Recibo.findByPk(id);
        this.desconectar();
        if(!resultado){
            throw error;
        }
        return resultado;
    }

    registrarRecibo = async(body) => {
        let resultado = 0;
        this.conectar();
        const reciboNuevo = new Recibo(body);
        const claveRecibo = 
            `${reciboNuevo.dni_deportista}${reciboNuevo.mes}${reciboNuevo.temporada}`;
        const numAleatorio = bcrypt.genSaltSync();
        reciboNuevo.codigo_verificacion = bcrypt.hashSync(claveRecibo, numAleatorio);
        resultado = await reciboNuevo.save();
        this.desconectar();
        return resultado;      
    }
}

module.exports = ConexionRecibo;