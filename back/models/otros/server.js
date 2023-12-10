const express = require('express');

const cors = require('cors');

class Server {
    constructor () {
        this.app = express();
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios'
        this.deportistasPath = '/api/deportistas';
        this.cuotasPath = '/api/cuotas';
        this.recibosPath = '/api/recibos';
        this.reclamacionPath= '/api/reclama';

        //Middlewares
        this.middlewares();

        this.routes();
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.authPath, require('../../routes/authRoutes'));
        this.app.use(this.usuariosPath, require('../../routes/usuarioRoutes'));
        this.app.use(this.deportistasPath, require('../../routes/deportistaRoutes'));
        this.app.use(this.cuotasPath, require('../../routes/cuotaRoutes'));
        this.app.use(this.recibosPath, require('../../routes/reciboRoutes'));
        this.app.use(this.reclamacionPath, require('../../routes/reclamacionRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }

}

module.exports = Server;