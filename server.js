const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// to Suppress warning
mongoose.set("strictQuery", false); 

dotenv.config()

const app = express()
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/categories", require("./routes/categoryRoutes"))
app.use("/api/subcategories", require("./routes/subcategoryRoutes"))
app.use("/api/items", require("./routes/itemRoutes"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

