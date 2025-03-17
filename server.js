// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create a new express application
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI="mongodb+srv://uyendo0203:vpMG3rpRFKL87JjM@cluster0.yflck.mongodb.net/gatsby-node"

if (!MONGO_URI) {
    console.error("❌ MONGO_URI environment variable is not defined.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

const pokemonsRoutes = require('./api/pokemons');
app.use(pokemonsRoutes);

const blogRouter = require('./api/blog');
app.use(blogRouter); // Use the blog router

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});