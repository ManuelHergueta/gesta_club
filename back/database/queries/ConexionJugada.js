const ConexionSequelize = require("../conexion/ConexionSequelize");
const { Sequelize } = require("sequelize");
const Jugada = require('../../models/Jugada');

class ConexionJugada extends ConexionSequelize {

    constructor() {
        super();
    }

    getJugadas = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Jugada.findAll();
        this.desconectar();
        return resultado;
    }

}

module.exports = ConexionJugada;