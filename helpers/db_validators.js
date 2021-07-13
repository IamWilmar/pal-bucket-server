const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`Role ${role} is not part of the database`);
    }
}

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if(existEmail){
        throw new Error(`The Email ${email}, already exist`);
    };
}

const existUserById = async (id) => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The user id ${id}, does NOT exist`);
    };
}


module.exports = {
    isRoleValid,
    existEmail,
    existUserById
}