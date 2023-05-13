const Product = require('./productSchema');

// Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving products' });
  }
};

// Retrieve a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the product' });
  }
};

// Update the price of a product by ID
exports.updateProductPrice = async (req, res) => {
  
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.price = req.body.price;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};


exports.addProduct = async (req, res) => {
    
    try {
        
      const { name, price, description } = req.body;
      
      const product = new Product({ name, price, description });

      await product.save();
    
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the product' });
    }
  };