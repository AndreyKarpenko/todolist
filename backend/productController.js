import Product from './productModel.js';

export const getAllProductsController = async (req, res) => {
  const products = await Product.getAllItems();
  res.status(200).json(products);
};

export const createProductController = async (req, res) => {
  const product = await Product.addItem(req.body);
  return res.status(200).json(product);
};

export const updateProductController = async (req, res) => {
  const product = await Product.updateItem(req.body, req.params.id);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).send('Product not found');
};

export const deleteProductController = async (req, res) => {
  const product = await Product.deleteItem(req.params.id);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).send('Product not found');
};

export const deleteAllProductsController = async (req, res) => {
  await Product.deleteAllItems();
  return res.status(200).json({ success: true });
};
