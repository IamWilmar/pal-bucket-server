const validatingFields = require('../middlewares/validate-fields');
const validatingJWT = require('../middlewares/validate-jwt');
const validatingRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validatingFields,
    ...validatingJWT,
    ...validatingRoles,
}