const Categoria = require('../../models/Categoria');
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

    /**
     * Este método es necesario para la generación masiva de cuotas, ya que devuelve
     * los deportistas con la mensualidad que tiene que pagar cada uno dependiendo de la 
     * categoría que tiene. El importe está en la tabla Categorias de la BD. Y este 
     * se ayuda de asociacion belongsTo y Hasmany de Cuotas y Deportistas.
     * @returns 
     */
    getDeportistasConPrecio = async() => {
        this.conectar();
        const deportistas =await Deportista.findAll({
            include:[{
                model: Categoria,
                attributes: ['mensualidad']
            }]
        });
        this.desconectar();
        //Lo siguiente es para dejar todas las propiedades del objeto al mismo nivel.
        const resultado = deportistas.map(deportista => {//mapeamos
            //desestructuramos, con operador propagacion ... copiamos todas las propiedades
            //de deportistaData a el objeto. plain:true quita morralla.
            const { categorium, ...deportistaData } = deportista.get({ plain: true });
            //por ultimo retornamos fuera del map deportistaData añadiendo mensualidad al mismo nivel
            return {
                ...deportistaData,
                mensualidad: categorium.mensualidad
            };
        });
        return resultado;
    }

    getCuotasExistentes = async(temp,m) => {
        let resultados = [];
        this.conectar();
        resultados = await Cuota.findAll({
            where: {
                temporada: temp,
                mes: m
            }
        });
        this.desconectar();
        if(resultados.length === 0){
            throw new Error('No hay cuotas para esa temporada y mes');
        }
        return resultados;
    }

    generarCuotasMasivas = async (temporada,mes) => {
        this.conectar();
        try {
            const deportistas = await this.getDeportistasConPrecio();
            const cuotasExistentes = await Cuota.findAll({
                where: {
                    temporada: temporada,
                    mes: mes
                }
            });
            //Mapea las cuotas existentes:
            const cuotasMap = new Map(cuotasExistentes.map(cuota => [cuota.dni_deportista, cuota]));
            //JSON.stringify() no convierte los objetos Map, para ver lo que tiene cuotasMap se puede hacer:
            //return Object.fromEntries(cuotasMap);

            //Filtramos deportistas que ya tienen cuota
            const deportistasSinCuota = deportistas.filter(deportista => !cuotasMap.has(deportista.dni));
            
            //Generamos las nuevas cuotas
            const cuotasNuevas = deportistasSinCuota.map(deportista => {
                return {
                    dni_deportista: deportista.dni,
                    temporada: temporada,
                    mes: mes,
                    importe: deportista.mensualidad,
                    estado: 'pendiente'
                };
            });

            //Guardamos las cuotas en la BD todas en una sola operacion
            await Cuota.bulkCreate(cuotasNuevas);

            return cuotasNuevas.length;
        } catch (error) {
            console.error("Error al generar cuotas masivas:", error);
            throw error;
        } finally {
            this.desconectar();
        }
    }

    registrarCuota = async(body) => {
        let resultado = 0;
        this.conectar();
        const cuotaNueva = new Cuota(body);
        await cuotaNueva.save();
        this.desconectar();
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

    borrarCuota = async(id) => {
        let resultado;
        this.conectar();
        resultado = await Cuota.destroy({ where: {id}});
        if (resultado === 0) {
            this.desconectar();
            throw error;
        }
        this.desconectar();
        return { affectedRows: resultado };
    }
}

module.exports = ConexionCuota;