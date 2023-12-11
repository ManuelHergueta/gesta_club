const ConexionSequelize = require("../conexion/ConexionSequelize");
const Partido = require('../../models/Partido');

class ConexionPartido extends ConexionSequelize {
    
    constructor() {
        super();
    }

    getPartidos = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Partido.findAll();
        this.desconectar();
        return resultado;
    }

    getPartido = async(id) => {
        let resultado = [];
        this.conectar();
        resultado = await Partido.findByPk(id);
        this.desconectar();
        if(!resultado){
            throw error;
        } 
        return resultado;
    }

    registrarPartido = async(body) => {
        this.conectar();
        const nuevoPartido = new Partido(body);
        const resultado = await nuevoPartido.save();
        this.desconectar();
        return resultado;
    }

    modificarPartido = async(id, body) => {
        let resultado;
        this.conectar();
        [resultado] = await Partido.update(body, { where: {id} });
        if(resultado === 0){
            this.desconectar();
            throw error;
        }
        this.desconectar();
        return { affectedRows: resultado };
    }

    borrarPartido = async(id) => {
        let resultado;
        this.conectar();
        resultado = await Partido.destroy({ where: {id}});
        if (resultado === 0) {
            this.desconectar();
            throw error;
        }
        this.desconectar();
        return { affectedRows: resultado };
    }

}

module.exports = ConexionPartido;
