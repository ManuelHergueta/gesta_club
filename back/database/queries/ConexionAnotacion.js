const Jugada = require("../../models/Jugada");
const Anotacion = require('../../models/Anotacion');
const ConexionSequelize = require("../conexion/ConexionSequelize");
const { Sequelize } = require("sequelize");



class ConexionAnotacion extends ConexionSequelize {

    constructor() {
        super();
    }

    getPuntosJugada = async(id_jugada) => {
        this.conectar();
        const resultado = await Jugada.findByPk(id_jugada);
        this.desconectar();
        if(!resultado) {
            throw new Error('Jugada no encontrada');
        }
        return resultado.puntos;
    }

    crearAnotacionesPost = async(body) => {
        this.conectar();
        try {
            const { dni_deportistas, id_partido, id_jugada} = body;
        
            const puntos = await this.getPuntosJugada(id_jugada);
            const anotaciones = dni_deportistas.map(dni => ({
                dni_deportista: dni,
                id_partido,
                id_jugada,
                puntos
            }));
            await Anotacion.bulkCreate(anotaciones);

            return anotaciones.length;
        } catch (error) {
            console.error('Fallo al registrar las anotaciones', error);
            throw error;
        } finally {
            this.desconectar();
        }
    }

    obtenerTopJugadores = async() => {
        try {
            const topJugadores = await Anotacion.findAll({
                attributes: [
                    'dni_deportista',
                    [Sequelize.fn('sum', Sequelize.col('puntos')), 'totalPuntos']
                ],
                group: ['dni_deportista'],
                order: [[Sequelize.fn('sum', Sequelize.col('puntos')), 'DESC']],
                limit: 3
            });
            return topJugadores;
        } catch (error) {
            throw error;
        }
    }

    obtenerTopJugadoresPorPartido = async(id_partido) => {
        try {
            const topJugadores = await Anotacion.findAll({
                where: { id_partido: id_partido },
                attributes: [
                    'dni_deportista',
                    [Sequelize.fn('sum', Sequelize.col('puntos')), 'totalPuntos']
                ],
                group: ['dni_deportista'],
                order: [[Sequelize.fn('sum', Sequelize.col('puntos')), 'DESC']],
                
            })
            return topJugadores;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ConexionAnotacion;