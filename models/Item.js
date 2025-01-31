const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true },
  tax: {
    type: Number,
    required: function () {
      return this.taxApplicability
    },
  },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
})

module.exports = mongoose.model("Item", ItemSchema)

