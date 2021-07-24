const {Router} = require('express');
const { check } = require('express-validator');
const { loadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads_controller');
const { existCollection } = require('../helpers');
const { validateFile } = require('../middlewares');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', loadFile);

router.put('/:collection/:id' ,[
    validateFile,
    check('id', 'Id must be mongoID').isMongoId(),
    check('collection').custom(c => existCollection(c, ['users', 'products'])),
    validateFields
], updateImageCloudinary );

router.get('/:collection/:id', [
    check('id', 'Id must be mongoID').isMongoId(),
    check('collection').custom(c => existCollection(c, ['users', 'products'])),
    validateFields
], showImage);

module.exports = router;