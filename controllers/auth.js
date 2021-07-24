const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const {email, password} = req.body;
    try{
        //Verificar si email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'User / Password are not correct 1'
            });
        }
        //Si el usiario está activo
        if(!user.status){
            return res.status(400).json({
                msg: 'User / Password are not correct 2'
            });
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Password are not correct 3'
            });
        }
        //generar JWT
        const token = await generateJWT(user.id);
        return res.json({
            user,
            token
        });
    }catch(err){
        return res.status(500).json({
            msg: 'Server Error' 
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;
    try{
        const {name, image, email} = await googleVerify(id_token);
        let user = await User.findOne({email});
        if(!user){
            const data = {
                name,
                email,
                image,
                password: '',
                google: true
            };
            user = new User(data);
            await user.save();
        }

        //if already exist
        if(!user.status){
            return res.status(401).json({
                msg: 'User blocked, communicate with admin'
            });
        }

        //generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    }catch(err){
        res.status(400).json({
            msg: 'Google token is not valid'
        })
    }

}

const validateUserToken = async (req, res = response ) => {

    // Generar el JWT
    const token = await generateJWT( req.user._id );
    
    res.json({
        user: req.user,
        token: token,
    })

}


module.exports = {
    login,
    googleSignIn,
    validateUserToken
}