import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Grid, Card, CardContent, Typography, Button, TextField, Container, Modal } from '@mui/material';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:5001/api/blog');
    console.log({ response });
    setBlogs(response.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpen = (index) => {
    if (index !== null) {
      setTitle(blogs[index].title);
      setContent(blogs[index].content);
      setEditIndex(index);
    } else {
      setTitle('');
      setContent('');
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setContent('');
    setEditIndex(null);
  };

  const handleAddBlog = async () => {
    const newBlog = { title, content };
    if (editIndex !== null) {
      await axios.put(`http://localhost:5001/api/blog/${blogs[editIndex]._id}`, newBlog);
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? { ...blog, ...newBlog } : blog
      );
      setBlogs(updatedBlogs);
    } else {
      const response = await axios.post('http://localhost:5001/api/blog', newBlog);
      setBlogs([...blogs, response.data]);
    }
    handleClose();
  };

  const handleDeleteBlog = async (index) => {
    await axios.delete(`http://localhost:5001/api/blog/${blogs[index]._id}`);
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(updatedBlogs);
  };

  return (
    <Container style={{ maxWidth: '80%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Blog
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add Blog
      </Button>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {blogs.length > 0 && blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id} style={{ display: 'flex' }}>
            <Card style={{ flex: 1, margin: '10px' }}>
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto' }} />}
                <Typography variant="body2">{blog.content}</Typography>
                <div style={{ marginTop: '10px' }}>
                  <Button variant="outlined" color="primary" style={{ marginRight: '5px' }} onClick={() => handleOpen(index)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteBlog(index)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Container style={{ padding: '20px', maxWidth: '500px', marginTop: '100px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>{editIndex !== null ? 'Edit Blog' : 'Add Blog'}</Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddBlog} style={{ marginTop: '10px' }}>
            {editIndex !== null ? 'Update Blog' : 'Add Blog'}
          </Button>
        </Container>
      </Modal>
    </Container>
  );
};

export default BlogList;