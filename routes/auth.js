const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'Error in email Field').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], login);

router.post('/google',[
    check('id_token', 'Id token is neccesary').not().isEmpty(),
    validateFields,
], googleSignIn);



module.exports = router;