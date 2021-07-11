const{ Response } = require('express');

const getUser = (req, res= Response) => {
    res.json({
        ok:true,
        msg: 'get Users Controller'
    });
}

const putUser =  (req, res= Response ) => {
    const { id } = req.params;
    const { query } = req.query;
    res.json({
        ok:true,
        id: id,
        query
    });
}


const postUser = (req, res) => {
    const {name, age} = req.body;
    res.json({
        ok:true,
        msg: 'post done controller',
        name,
        age,
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