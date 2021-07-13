const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

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

module.exports = {
    login
}