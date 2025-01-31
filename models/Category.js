const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true },
  tax: {
    type: Number,
    required: function () {
      return this.taxApplicability
    },
  },
  taxType: {
    type: String,
    required: function () {
      return this.taxApplicability
    },
  },
})

module.exports = mongoose.model("Category", CategorySchema)

