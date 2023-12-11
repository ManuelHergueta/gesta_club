const Deportista = require('./Deportista');
const Cuota = require('./Cuota');
const Categoria = require('./Categoria');

const setupAssociations = () => {

    Deportista.hasMany(Cuota, {foreignKey: 'dni_deportista'});
    Cuota.belongsTo(Deportista, { foreignKey: 'dni_deportista'});

    Categoria.hasMany(Deportista, {foreignKey: 'categoria_id'});
    Deportista.belongsTo(Categoria, { foreignKey: 'categoria_id'});

    Partido.hasMany(Alineacion, { foreignKey: 'id_partido' });
    Alineacion.belongsTo(Partido, { foreignKey: 'id_partido' });

    Deportista.hasMany(Alineacion, { foreignKey: 'dni_deportista' });
    Alineacion.belongsTo(Deportista, { foreignKey: 'dni_deportista' });

    Partido.hasMany(Anotacion, { foreignKey: 'id_partido' });
    Anotacion.belongsTo(Partido, { foreignKey: 'id_partido' });

    Deportista.hasMany(Anotacion, { foreignKey: 'dni_deportista' });
    Anotacion.belongsTo(Deportista, { foreignKey: 'dni_deportista' });

    Jugada.hasMany(Anotacion, { foreignKey: 'id_jugada' });
    Anotacion.belongsTo(Jugada, { foreignKey: 'id_jugada' });
    
}

module.exports = setupAssociations;

/* Archivo que contendra las relacciones entre los modelos, ya que
al ponerlas dentro de los modelos en algunas ocasiones habia importaciones
ciclicas (en cuota importabamos deportista, y en deportista importabamos cuota)
De esta manera se soluciona. Hay que importar associations preferiblemente una
sola vez, en vez de importarlo en los queries que las necesitemos, las importo en
conexionSequelize (por herencia ya está en todas las queries)para que solo sea una vez.  */
