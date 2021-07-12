const{ response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



//Create User
const postUser = async (req, res = response ) => {
    const {name, email, password, role} = req.body;
    const user = new User({ name, email, password, role });
    //Verify fi email exists
    // const existEmail = await User.findOne({email});
    // if(existEmail){
    //     return res.status(400).json({
    //         msg: "Email already used"
    //     });
    // }
    //Encrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    return res.json({
        ok:true,
        user
    });
}


const putUser =  async (req, res= response ) => {
    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto, {new: true});
    return res.json({
        ok:true,
        user
    });
}

const getUser = (req, res= response) => {
    res.json({
        ok:true,
        msg: 'get Users Controller'
    });
}



const deleteUser = (req, res) => {
    res.json({
        ok:true,
        msg: 'delete done controller'
    });
}

const patchUser = (req, res) => {
    res.json({
        ok:true,
        msg: 'patch done controller'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser
}