const { Sequelize } = require("sequelize");
require("dotenv").config();

const setupAsociations = require('../../models/associations');

class ConexionSequelize {

    constructor() {
        this.db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect:'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
             },
          });

          setupAsociations();
    }

  conectar = () => {
    this.db
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database: ", error);
      });
  };

  //Cambio metodo cerrar, por que hay veces que se queja del numero de listener activos y a veces falla.
  //Se cambia process.on por process.once para que el listener se añada solo una vez
  desconectar = () => {
    process.once("SIGINT", () => {
        this.db.close().then(() => {
            console.log("Database connection closed.");
            process.exit(0);
        }).catch((error) => {
            console.error("Error closing the database connection: ", error);
            process.exit(1);
        });
    });
};

}

module.exports = ConexionSequelize;