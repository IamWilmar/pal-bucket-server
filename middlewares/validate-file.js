const { response } = require("express")

const validateFile = (req, res= response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg: 'Please add files to the request (file validation Middleware)'});
        return;
    }
    next();
}

module.exports = {
    validateFile
}