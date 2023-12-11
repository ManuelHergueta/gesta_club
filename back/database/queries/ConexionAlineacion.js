const ConexionSequelize = require("../conexion/ConexionSequelize");
const Alineacion = require('../../models/Alineacion');

class ConexionAlineacion extends ConexionSequelize {
    
    constructor() {
        super();
    }

    getAlineaciones = async(id_partido) => {
        let resultado = [];
        this.conectar();
        resultado = await Alineacion.findAll({
            where: {
                id_partido: id_partido
            }
        });
        this.desconectar();
        return resultado;
    }

    registrarAlineacion = async(body) => {
        this.conectar();
        const nuevaAlineacion = new Alineacion(body);
        const resultado = await nuevaAlineacion.save();
        this.desconectar();
        return resultado;
    }

    borrarAlineacion = async(id_partido,dni_deportista) => {
        let resultado;
        this.conectar();
        resultado = await Alineacion.destroy({ 
                where: {
                    id_partido: id_partido,
                    dni_deportista: dni_deportista}
            });
        if (resultado === 0) {
            this.desconectar();
            throw new Error('No se encontró la alineación para borrar');
        }
        this.desconectar();
        return { affectedRows: resultado };
    }

}

module.exports = ConexionAlineacion;
