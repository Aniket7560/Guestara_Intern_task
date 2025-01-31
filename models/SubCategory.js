const mongoose = require("mongoose")

const SubCategorySchema = new mongoose.Schema({
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
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
})

module.exports = mongoose.model("SubCategory", SubCategorySchema)

