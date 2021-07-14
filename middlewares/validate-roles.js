const { response } = require("express");

const isRoleAdmin = async (req, res = response, next) => {
    if(!req.user){
        return res.status(500).json({
            msg: 'Validate token first'
        });
    }
    const {role, name} = req.user;
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} is not an admin - can't delete a user`
        });
    }
    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) =>{
        if(!req.user){
            return res.status(500).json({
                msg: 'Validate token first'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Service require one of these roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    isRoleAdmin,
    hasRole
}