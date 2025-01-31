const express = require("express")
const router = express.Router()
const Category = require("../models/Category")

// Create a category
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a category by name or ID
router.get("/:identifier", async (req, res) => {
  try {
    const category = await Category.findOne({
      $or: [{ _id: req.params.identifier }, { name: req.params.identifier }],
    })
    if (!category) return res.status(404).json({ message: "Category not found" })
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Edit a category
router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!category) return res.status(404).json({ message: "Category not found" })
    res.json(category)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

