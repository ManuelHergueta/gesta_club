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

    /**Cambio este código, porque no me gusta que devuelva todos los datos del deportista borrado
    puede pensarse que no está siendo borrado. De esta manera devuelve nº de lineas afectadas
    no recuperamos datos innecesarios (los datos que se estan eliminando), además hacemos una
    sola consulta a la BD en vez de dos consultas.*/

    modificarDeportista = async(dni, body) => {
        let resultado;
        this.conectar();
        //resultado = await Deportista.findByPk(dni);
        [resultado] = await Deportista.update(body, { where: {dni} });
        if(resultado === 0){
            this.desconectar();
            throw error;
        }
        //await resultado.update(body);
        this.desconectar();
        return { affectedRows: resultado };
    }

    borrarDeportista = async(dni) => {
        let resultado;
        this.conectar();
//        resultado = await Deportista.findByPk(dni);
        resultado = await Deportista.destroy({ where: {dni}});
        if (resultado === 0) {
            this.desconectar();
            throw error;
        }
        //await resultado.destroy();
        this.desconectar();
        return { affectedRows: resultado };
    }
}

module.exports = ConexionDeportista;