const jwt = require('jsonwebtoken')

const generarJWT = (uemail = '') => {
    
    let token = jwt.sign({ uemail }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '24h' //Si no se pone h son milisegundos
      });
    return token;
}

module.exports ={
    generarJWT
}