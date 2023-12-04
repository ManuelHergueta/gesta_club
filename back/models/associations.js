const Deportista = require('./Deportista');
const Cuota = require('./Cuota');

const setupAssociations = () => {
    Cuota.belongsTo(Deportista, { foreignKey: 'dni_deportista'});
    Deportista.hasMany(Cuota, {foreignKey: 'dni_deportista'});
}

module.exports = setupAssociations;

/* Archivo que contendra las relacciones entre los modelos, ya que
al ponerlas dentro de los modelos en algunas ocasiones habia importaciones
ciclicas (en cuota importabamos deportista, y en deportista importabamos cuota)
De esta manera se soluciona. Hay que importar associations preferiblemente una
sola vez, en vez de importarlo en los queries que las necesitemos, las importo en
conexionSequelize para que solo sea una vez.  */
