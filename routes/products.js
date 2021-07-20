const {Router, response} = require('express');
const { check } = require('express-validator');
const { createProduct, obtainProducts, obtainProduct, updateProduct, deleteProduct } = require('../controllers/products_controller');
const { validateFields, validateJWT, isRoleAdmin} = require('../middlewares');
const { existCategory, existProduct} = require('../helpers/db_validators');


const router = Router();

/**
 * {{url}}/api/products
 */

//Obtain all products = public
router.get('/', obtainProducts);

//Obtain a product
router.get('/:id',[
    check('id', 'It is not a valid id').isMongoId(),  
    check('id').custom(existProduct), 
    validateFields
], obtainProduct);

//Create product (private) users with valid token
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'category id is not a mongo Id').isMongoId(),
    check('category').custom(existCategory), 
    validateFields
], createProduct);

//Update a product (private) users with valid token
router.put('/:id',[
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(existProduct), 
    validateFields
], updateProduct);

//Delete (just when ADMIN)
router.delete('/:id',[
    validateJWT,
    isRoleAdmin,
    check('id', 'It is not a valid id').isMongoId(),  
    check('id').custom(existProduct), 
    validateFields,
], deleteProduct);



module.exports = router;