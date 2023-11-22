const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionUsuario');
const { generarJWT } = require('../helpers/generateJwt');


const login =  (req, res = response) => {
    const { email, password } = req.body;
    try{
        const conx = new Conexion();
        conx.getUsuarioRegistrado(email, password)    
            .then( usu => {
                console.log('Usuario correcto!  ' + usu.email);
                const resp = {
                    success: true,
                    data: {
                        email: usu.email,
                        token: generarJWT(usu.email)
                    },
                    msg: 'Login correcto'
                }
                res.status(200).json(resp);
            })
            .catch( err => {
                console.log('Usuario no encontrado!');
                const resp = {
                    success: false,
                    msg: 'Login incorrecto'
                }
                res.status(203).json(resp);
            });
            
    } catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error en el servidor.'});
    }    
}

module.exports = {
    login
}