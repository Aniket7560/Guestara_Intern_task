const express = require("express")
const router = express.Router()
const Item = require("../models/Item")

// Create an item
router.post("/", async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      totalAmount: req.body.baseAmount - req.body.discount,
    })
    await item.save()
    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("category subCategory")
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all items under a category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.categoryId }).populate("category subCategory")
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all items under a subcategory
router.get("/subcategory/:subCategoryId", async (req, res) => {
  try {
    const items = await Item.find({ subCategory: req.params.subCategoryId }).populate("category subCategory")
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get an item by name or ID
router.get("/:identifier", async (req, res) => {
  try {
    const item = await Item.findOne({
      $or: [{ _id: req.params.identifier }, { name: req.params.identifier }],
    }).populate("category subCategory")
    if (!item) return res.status(404).json({ message: "Item not found" })
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Edit an item
router.patch("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        totalAmount: (req.body.baseAmount || item.baseAmount) - (req.body.discount || item.discount),
      },
      { new: true },
    )
    if (!item) return res.status(404).json({ message: "Item not found" })
    res.json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Search item by name
router.get("/search/:name", async (req, res) => {
  try {
    const items = await Item.find({ name: { $regex: req.params.name, $options: "i" } }).populate("category subCategory")
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router

