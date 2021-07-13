const{ response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



//Create User
const postUser = async (req, res = response ) => {
    const {name, email, password, role} = req.body;
    const user = new User({ name, email, password, role });
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

const getUser = async (req, res= response) => {
    const{ limit = 5, desde =  0 } = req.query;
    const query = {status: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limit)),
    ]);

    return res.json({
        total,
        users
    });
}



const deleteUser = async (req, res) => {
    const{id} = req.params;
    const user = await User.findByIdAndUpdate(id, {status: false}, {new:true});
    return res.json({
        user
    });
}

const patchUser = (req, res) => {
    const{id} = req.params;
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