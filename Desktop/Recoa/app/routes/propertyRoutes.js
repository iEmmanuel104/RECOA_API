const express = require('express');
const router = express.Router();
const permit = require('../middlewares/permissions');
const {
    getAllProperty,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    searchProperty,
} = require('../controller/propertyController.js');

const {
    addpropertyUnit,
    getAllpropertyUnit,
    getpropertyUnitById,
    updatepropertyUnit,
    deletepropertyUnit,
    searchpropertyUnit,
} = require('../controller/unitController.js')


//property routes
router.get('/', getAllProperty);
router.get('/:id', getPropertyById);
router.post('/', permit("admin"), createProperty);
router.patch('/:id', permit("admin"), updateProperty);
router.delete('/:id',permit("admin"), deleteProperty);
router.post('/search',searchProperty);

// property-unit routes
router.post('/unit', permit("admin"), addpropertyUnit);
router.get('/unit/property/:id', getAllpropertyUnit);
router.get('/unit/:id', getpropertyUnitById);
router.patch('/unit/update/:id', permit("admin"), updatepropertyUnit);
router.delete('/unit/delete/:id', permit("admin"), deletepropertyUnit);
router.post('/unit/search/:id', searchpropertyUnit);

module.exports = router;