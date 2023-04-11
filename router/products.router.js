const express = require('express');
const ProductService = require('../services/product.services');
const validateHandler = require('../middlewares/validator.handler');
const {getProductSchema, createProductsSchema, updateProductsSchema} = require('../schema/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
validateHandler(getProductSchema, 'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.findOne(id);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/',
validateHandler(createProductsSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'Created succefully',
    data: newProduct,
  });
});

router.patch('/:id',
validateHandler(getProductSchema, 'params'),
validateHandler(updateProductsSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.update(id, req.body);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const products = await service.delete(id);
  res.json(products);
});

module.exports = router;
