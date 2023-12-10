const ConexionSequelize = require('../conexion/ConexionSequelize');
const Reclamacion = require('../../models/Reclamacion');

class ConexionReclamacion extends ConexionSequelize {

    constructor() {
        super();
    }

    getReclamaciones = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Reclamacion.findAll();
        this.desconectar();
        return resultado;
    }

    registrarReclamacion = async(body) => {
        this.conectar();
        const nuevaReclamacion = new Reclamacion(body);
        const resultado = await nuevaReclamacion.save();
        this.desconectar();
        return resultado;
    }

}

module.exports = ConexionReclamacion;