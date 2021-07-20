const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT, isRoleAdmin, hasRole } = require('../middlewares');
const { getUser, putUser, postUser, deleteUser, patchUser } = require('../controllers/user_controller');
const { isRoleValid, existEmail, existUserById } = require('../helpers/db_validators');

const router = Router();

router.get('/', getUser);
router.put('/:id',[
    check('id', 'id requested is not valid').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom( isRoleValid ),
    validateFields,
], putUser);

router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'Password must be atleast 6 characters').isLength({min: 6}),
    check('email', 'Error in email Field').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isRoleValid ),
    validateFields,
],postUser);

router.delete('/:id',[
    validateJWT,
    isRoleAdmin,
    // hasRole('ADMIN_ROLE', 'NOSE_ROLE'),
    check('id', 'id requested is not valid').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
], deleteUser);
router.patch('/', patchUser);


module.exports = router;