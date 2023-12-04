const Cuota = require('../../models/Cuota');
const Deportista = require('../../models/Deportista');
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

    getCuotasConNombre = async() => {
        this.conectar();
        const cuotas = await Cuota.findAll({
            include: [{
                model: Deportista,
                attributes: ['nombre', 'apellidos']
            }]
        });
        this.desconectar();
        /* Reestructuramos los objetos para que esten todas sus propiedades al mismo nivel. */
        //cuotas.map pasa cada cuota al bloque dentro de las llaves
        const resultado = cuotas.map(cuota => {
            //desestructuramos las propiedades y además usamos el operador de propagacion '...' para
            //copiar todas las propiedades de cuotaData a ese objeto
            //con cuota.get({plain:true}) "limpia" los objetos y deja solo las propiedades. Quita morralla.
            const { deportistum, ...cuotaData } = cuota.get({ plain: true});
            //retornamos fuera del map cuotaData añadiendo ya al mismo nivel nombre y apellidos
            return {
                ...cuotaData,
                nombre: deportistum.nombre,
                apellidos: deportistum.apellidos
            };
        });
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

    modificarCuota = async(id, body) => {
        let resultado;
        this.conectar();
        [resultado] = await Cuota.update(body, { where: {id} });
        if(resultado === 0){
            this.desconectar();
            throw error;
        }
        this.desconectar();
        return { affectedRows: resultado };
    }
}

module.exports = ConexionCuota;