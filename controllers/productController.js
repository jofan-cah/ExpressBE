// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { nama, qty } = req.body;

    // Create new product
    const product = new Product({
      user: req.user._id, // From authentication middleware
      nama,
      qty
    });

    // Save product
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all products for the logged-in user
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { nama, qty } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { nama, qty },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product deleted successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};