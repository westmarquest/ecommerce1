const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const sequelize = require("../../config/connection");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!affectedRows) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json({ message: "Tag updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete one tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
