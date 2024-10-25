const Campaign = require('../models/Campaign');
const axios = require('axios');

// Get products and store them in the database
exports.getProducts = async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    await Campaign.insertMany(products);
    res.json({ message: 'Products (Campaigns) stored in MongoDB', products });
  } catch (error) {
    res.status(500).send('Error fetching product data');
  }
};

// Add a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Campaign(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send('Error adding product');
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).send('Error updating product');
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    res.status(400).send('Error deleting product');
  }
};
