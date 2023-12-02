const Cuota = require('../../models/Cuota');
const ConexionSequelize = require('../conexion/ConexionSequelize');

class ConexionCuota extends ConexionSequelize {

    constructor() {
        super();
    }

    getCuotas = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Cuota.findAll();
        this.desconectar();
        return resultado;
    }

    getCuota = async(id) => {
        let resultado = [];
        this.conectar();
        resultado = await Cuota.findByPk(id);
        this.desconectar();
        if(!resultado){
            throw error;
        } 
        return resultado;
    }

}

module.exports = ConexionCuota;