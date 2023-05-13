const express = require('express');
const router = express.Router();
const productController = require('./productController');

// Retrieve all products
router.get('/', productController.getAllProducts);

// Retrieve a single product by ID
router.get('/:id', productController.getProductById);

// Update the price of a product by ID
router.patch('/:id', productController.updateProductPrice);

router.post('/', productController.addProduct);
module.exports = router;
