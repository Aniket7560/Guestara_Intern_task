const express = require("express")
const router = express.Router()
const SubCategory = require("../models/SubCategory")
const Category = require("../models/Category")

// Create a subcategory
router.post("/", async (req, res) => {
  try {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(404).json({ message: "Category not found" })

    const subCategory = new SubCategory({
      ...req.body,
      taxApplicability: req.body.taxApplicability || category.taxApplicability,
      tax: req.body.tax || category.tax,
    })
    await subCategory.save()
    res.status(201).json(subCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all subcategories
router.get("/", async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category")
    res.json(subCategories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all subcategories under a category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category: req.params.categoryId }).populate("category")
    res.json(subCategories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a subcategory by name or ID
router.get("/:identifier", async (req, res) => {
  try {
    const subCategory = await SubCategory.findOne({
      $or: [{ _id: req.params.identifier }, { name: req.params.identifier }],
    }).populate("category")
    if (!subCategory) return res.status(404).json({ message: "Subcategory not found" })
    res.json(subCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Edit a subcategory
router.patch("/:id", async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!subCategory) return res.status(404).json({ message: "Subcategory not found" })
    res.json(subCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

