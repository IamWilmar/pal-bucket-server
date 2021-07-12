const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Conectado a la base de datos");
    }catch(err){
        console.log(err);
        throw new Error('Error en conexion a la base de datos')
    }
}

module.exports = {
    dbConnection
}