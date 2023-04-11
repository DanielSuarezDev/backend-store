const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().max(100);
const price = joi.number().integer().min(1);

const createProductsSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: joi.string().uri().required(),
});

const updateProductsSchema = joi.object({
  name: name,
  price: price,
  image: joi.string().uri(),
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = {
  getProductSchema,
  createProductsSchema,
  updateProductsSchema,
};
