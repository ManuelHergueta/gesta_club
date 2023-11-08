const { body } = require('express-validator');
const Deportista = require('../../models/Deportista');
const ConexionSequelize = require('../conexion/ConexionSequelize');

class ConexionDeportista extends ConexionSequelize {

    constructor() {
        super();
    }

    //CRUD
    getDeportistas = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Deportista.findAll();
        this.desconectar();
        return resultado;
    }

    getDeportista = async(dni) => {
        let resultado = [];
        this.conectar();
        resultado = await Deportista.findByPk(dni);
        this.desconectar();
        if(!resultado){
            throw error;
        }
        return resultado;
    }

    registrarDeportista = async(body) => {
        let resultado = 0;
        this.conectar();
        const deportistaNuevo = new Deportista(body);
        await deportistaNuevo.save();
        this.desconectar();
        return resultado;
    }

    modificarDeportista = async(dni, body) => {
        let resultado;
        this.conectar();
        resultado = await Deportista.findByPk(dni);
        if(!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
        this.desconectar();
        return resultado;
    }

    borrarDeportista = async(dni) => {
        let resultado;
        this.conectar();
        resultado = await Deportista.findByPk(dni);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.desconectar();
        return resultado;
    }
}

module.exports = ConexionDeportista;