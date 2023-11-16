const Usuario = require('../../models/Usuario');
const ConexionSequelize = require('../conexion/ConexionSequelize');

const bcrypt = require('bcryptjs');

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

/*     getUsuarioRegistrado = async (email,password) => {
        let resultado = [];
        this.conectar();
        const usuarioDB = await Usuario.findByPk(email);
        const passwordCorrecto = bcrypt.compareSync(password,usuarioDB.password);
        if (!usuarioDB || !passwordCorrecto) {
            this.desconectar();
            throw new Error('Usuario o password incorrectos');
        } else {
            resultado = usuarioDB;
        }
        this.desconectar();
        if (!resultado) {
            throw new Error('Fallo autenticación');
        }
        return resultado;
    } */

    getUsuarioRegistrado = async (email, password) => {
        this.conectar();
        const usuarioDB = await Usuario.findByPk(email);
        if (!usuarioDB || !bcrypt.compareSync(password, usuarioDB.password)) {
            throw new Error('Usuario o password incorrectos');
        }
        this.desconectar();
        return usuarioDB;
    }

    
    //Preparar para login ////----->>>>>>>>>>>>>>>>>>>>><
    registrarUsuario = async(body) => {
        let resultado = 0;
        this.conectar();
        const usuarioNuevo = new Usuario(body);
        const passOriginal = usuarioNuevo.password;
        const numAleatorio = bcrypt.genSaltSync();
        usuarioNuevo.password = bcrypt.hashSync(passOriginal, numAleatorio);
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