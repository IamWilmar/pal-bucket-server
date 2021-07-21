const validatingFields = require('../middlewares/validate-fields');
const validatingJWT = require('../middlewares/validate-jwt');
const validatingRoles = require('../middlewares/validate-roles');
const validateFile = require('../middlewares/validate-file');
module.exports = {
    ...validatingFields,
    ...validatingJWT,
    ...validatingRoles,
    ...validateFile,
}