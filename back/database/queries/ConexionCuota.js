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

    getCuotasPorDni = async(dni) => {
        let resultados = [];
        this.conectar();
        resultados = await Cuota.findAll({
            where: {
                dni_deportista: dni
            }
        });
        this.desconectar();
        console.log('Hola');
        if(resultados.length === 0){
            throw new Error('No se encontraron cuotas para el DNI proporcionado');
        }
        
        return resultados;
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