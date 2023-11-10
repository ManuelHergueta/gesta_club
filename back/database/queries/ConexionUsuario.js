const Usuario = require('../../models/Usuario');
const ConexionSequelize = require('../conexion/ConexionSequelize');

class ConexionUsuario extends ConexionSequelize {

    constructor() {
        super();
    }

    //CRUD
    getUsuarios = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Usuario.findAll();
        this.desconectar();
        return resultado;
    }

    getUsuario = async(email) => {
        let resultado = [];
        this.conectar();
        resultado = await Usuario.findByPk(email);
        this.desconectar();
        if(!resultado){
            throw error;
        }
        return resultado;
    }

    //Preparar para login ////----->>>>>>>>>>>>>>>>>>>>><
    registrarUsuario = async(body) => {
        let resultado = 0;
        this.conectar();
        const usuarioNuevo = new Usuario(body);
        await usuarioNuevo.save();
        this.desconectar();
        return resultado;
    }

    modificarUsuario = async(email, body) => {
        let resultado;
        this.conectar();
        resultado = await Usuario.findByPk(email);
        if(!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
        this.desconectar();
        return resultado;
    }

    borrarUsuario = async(email) => {
        let resultado;
        this.conectar();
        resultado = await Usuario.findByPk(email);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.desconectar();
        return resultado;
    }
}

module.exports = ConexionUsuario;