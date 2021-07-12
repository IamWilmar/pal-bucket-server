const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Conectar a DB
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Parseo y lectura del body
        this.app.use(express.json());
        //Directio publico
        this.app.use(express.static('public'))
    }

    routes(){
       this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;