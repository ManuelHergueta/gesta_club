const RolAsignado = require('../../models/RolAsignado');
const Usuario = require('../../models/Usuario');
const ConexionSequelize = require('../conexion/ConexionSequelize');
const { Op } = require('sequelize');
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

    getUsuarioRegistrado = async (email, password) => {
        this.conectar();
        const usuarioDB = await Usuario.findByPk(email);
        if (!usuarioDB || !bcrypt.compareSync(password, usuarioDB.password)) {
            throw new Error('Usuario o password incorrectos');
        }
        this.desconectar();
        return usuarioDB;
    }

    registrarUsuario = async(body) => {
        let resultado = 0;
        this.conectar();
        const usuarioNuevo = new Usuario(body);
        const passOriginal = usuarioNuevo.password;
        const numAleatorio = bcrypt.genSaltSync();
        usuarioNuevo.password = bcrypt.hashSync(passOriginal, numAleatorio);
        await usuarioNuevo.save();
        const rolAsign = {
            'email_usuario': usuarioNuevo.email,
            'id_rol': 2
        };
        const nuevoRolAsignado = new RolAsignado(rolAsign);
        await nuevoRolAsignado.save();
        this.desconectar();
        return resultado;
    }

    modificarContraUsuario = async(email, password) => {
        this.conectar();
        const numAleatorio = bcrypt.genSaltSync();
        const passEncript = bcrypt.hashSync(password, numAleatorio);
        let resultado = await Usuario.update({password: passEncript},
            { where: {
                email: { [Op.eq]: email } 
                }
            });
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