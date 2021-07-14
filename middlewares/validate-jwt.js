const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validateJWT = async (req, res=response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'Token required in request'
        });
    }
    try{
        const{uid} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'User does NOT exist'
            });
        }
        if(!user.status){
            return res.status(401).json({
                msg: 'Token is not valid - user with status false'
            });
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            msg: 'Token sent is not valid'
        });
    }
}

module.exports = {
    validateJWT,
}