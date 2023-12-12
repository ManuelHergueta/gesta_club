const Categoria = require('../../models/Categoria');
const ConexionSequelize = require('../conexion/ConexionSequelize');

class ConexionCategoria extends ConexionSequelize {

    constructor() {
        super();
    }

    getCategorias = async() => {
        let resultado = [];
        this.conectar();
        resultado = await Categoria.findAll();
        this.desconectar();
        return resultado;
    }
}

module.exports = ConexionCategoria;
