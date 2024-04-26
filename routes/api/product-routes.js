const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");
const sequelize = require("../../config/connection");

// Then use sequelize in your route file as needed

// The `/api/products` endpoint

// Get all products
router.get("/", async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one product
router.get("/:id", async (req, res) => {
  try {
    // Find a single product by its `id` and include associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create new product
router.post("/", async (req, res) => {
  try {
    // Create a new product
    const newProduct = await Product.create(req.body);

    // If there are product tags, create pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    // Update product data
    const [affectedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    // If there are product tags, update pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      // Delete existing product tags
      await ProductTag.destroy({ where: { product_id: req.params.id } });

      // Create new product tags
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    // Delete one product by its `id` value
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
