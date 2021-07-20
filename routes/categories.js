const {Router, response} = require('express');
const { check } = require('express-validator');
const { createCategory, obtainCategories, obtainCategory, updateCategory, deleteCategory } = require('../controllers/categories_controller');
const { validateFields, validateJWT, isRoleAdmin} = require('../middlewares');
const { existCategory} = require('../helpers/db_validators');


const router = Router();

/**
 * {{url}}/api/categories
 */

//Obtain all categories = public
router.get('/', obtainCategories);

//Obtain a category
router.get('/:id',[
    check('id', 'It is not a valid id').isMongoId(),  
    check('id').custom(existCategory), 
    validateFields
], obtainCategory);

//Create category (private) users with valid token
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory);

//Update a category (private) users with valid token
router.put('/:id',[
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),  
    check('name', "name is required"),
    check('id').custom(existCategory), 
    validateFields
], updateCategory);

//Delete (just when ADMIN)
router.delete('/:id',[
    validateJWT,
    isRoleAdmin,
    check('id', 'It is not a valid id').isMongoId(),  
    check('id').custom(existCategory), 
    validateFields,
],deleteCategory);



module.exports = router;