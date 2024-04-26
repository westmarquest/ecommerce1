const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");
const sequelize = require("../../config/connection");

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

// Create new category
router.post("/", async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    // Update category data
    const [affectedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    // Delete one category by its `id` value
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
