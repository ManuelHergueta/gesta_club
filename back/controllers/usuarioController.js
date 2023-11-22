const { response,request } = require('express');
const Conexion = require('../database/queries/ConexionUsuario');

const cambioContra = require('../helpers/cambio_contra');

const usuariosGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getUsuarios()
        .then( msg => {
            console.log('Listado de usuarios correcto!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No hay registros');
            res.status(203).json({'msg':'No se han encontrado registros'});
        }); 
}

const usuarioGet = (req, res = response) => {
    const conx = new Conexion();
    conx.getUsuario(req.params.email)
        .then( msg => {
            console.log('Encontrado el usuario!');
            res.status(200).json(msg);
        }) 
        .catch( err => {
            console.log('No existe el registro');
            res.status(203).json({'msg':'No se ha encontrado el registro'});
        });
}

const usuarioPost = (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarUsuario(req.body)
        .then( msg => {
            console.log('Insertado correctamente!');
            const resp = {
                success: true,
                msg: 'Usuario dado de alta'
            }
            res.status(201).json(resp);
        })
        .catch( err => {
            console.log(err);
            const resp = {
                success: false,
                msg: 'Fallo en el registro'
            }
            res.status(203).json(resp);
        });
}

const existeEmail = ( req, res = response ) => {
    const conx = new Conexion();
    conx.getUsuario(req.params.email)
    .then( msg => {

        console.log("msg: " + msg);
        
        const resp = {
            success: true,
            email: msg.email
        }
        cambioContra.cambioContrasenia(req.params.email);
        res.status(201).json(resp);
    })
    .catch( err => {
        const resp = {
            success: false,
            email: 0
        }
        res.status(203).json(resp);
    })
}

const modificarContra = (req, res = response ) => {
    const conx = new Conexion();
    conx.modificarContraUsuario(req.body.email,req.body.password)
        .then( msg => {
            console.log('Contraseña modificada!');
            const resp = {
                success: true,
                msg: 'Contraseña modificada!'
            }
            res.status(201).json(resp);
        })
        .catch( err => {
            console.log(err);
            const resp = {
                success: false,
                msg: 'Fallo en la modificación.'
            }
            res.status(203).json(resp);
        });
}

const usuarioPut = (req, res = response) => {
    const conx = new Conexion();
    conx.modificarUsuario(req.params.email, req.body)
        .then( msg => {
            console.log('Usuario modificado correctamente!');
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Ha fallado la modificación');
            res.status(203).json(err);
        });
}

const usuarioDelete = (req, res = response) => {
    const conx = new Conexion();
    conx.borrarUsuario(req.params.email)
        .then( msg => {
            console.log('Usuario borrado correctamente!');
            res.status(202).json({ message: `Usuario ${req.params.email} eliminado.`});
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuarioPost,
    existeEmail,
    modificarContra,
    usuarioPut,
    usuarioDelete
} 