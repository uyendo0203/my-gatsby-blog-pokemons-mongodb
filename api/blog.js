const express = require('express');
const router = express.Router();

console.log('route blog page');


const mongoose = require('mongoose');

const Blog = mongoose.model('blogs', new mongoose.Schema({ //ten tren database
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}));


router.get('/api/blog', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs); // Ensure this is called only once
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/api/blog/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ params
        const blog = await Blog.findById(id); // Tìm blog theo ID

        if (!blog) {
            return res.status(404).send('blog not found'); // Kiểm tra nếu không tìm thấy
        }

        res.json(blog); // Trả về thông tin blog
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new blog
router.post('/api/blog/', async (req, res) => {
    const newblog = new Blog(req.body);
    await newBlog.save();
    res.json(newblog);
});

// Update a blog
router.put('/api/blog/:id', async (req, res) => {
    const { id } = req.params;
    const updatedblog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedblog);
});

// Delete a blog
router.delete('/api/blog/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.sendStatus(204);
});

module.exports = router;
