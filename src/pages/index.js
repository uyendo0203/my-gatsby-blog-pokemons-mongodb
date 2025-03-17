import React from 'react';
import { Link } from 'gatsby';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Tạo một theme tối
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1a1a', // Màu nền tối
    },
    text: {
      primary: '#f0f0f0', // Màu chữ sáng
    },
  },
});

const IndexPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ maxWidth: '80%', padding: '20px' }}>
        <Typography variant="h2" gutterBottom>
          Welcome to My Blog
        </Typography>
        <List>
          <ListItem button component={Link} to="/blog">
            <ListItemText primary="Blog list" />
          </ListItem>
          <ListItem button component={Link} to="/pokemon">
            <ListItemText primary="Pokemon list" />
          </ListItem>
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default IndexPage;