import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EditPost = ({ pageContext }) => {
  const { index } = pageContext;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/posts/${index}`); // Thay đổi đường dẫn API theo cần thiết
        const { title, content, _id } = response.data;
        setTitle(title);
        setContent(content);
        setPostId(_id);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [index]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5001/api/posts/${postId}`, { title, content }); // Cập nhật bài viết
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ width: '80%', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update Post
      </Button>
    </Container>
  );
};

export default EditPost;