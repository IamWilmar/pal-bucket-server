const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                reject('JWT couldn\'t be created');
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}