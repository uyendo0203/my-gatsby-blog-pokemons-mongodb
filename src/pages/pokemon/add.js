import React, { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
} from '@mui/material';

const AddPokemon = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('grass');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPokemon = {
            name,
            description,
            image,
            type,
        };

        try {
            const response = await fetch('/api/pokemons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPokemon),
            });

            if (!response.ok) {
                throw new Error('Failed to add Pokémon');
            }

            const result = await response.json();
            console.log('New Pokémon added:', result);

            // Reset form
            setName('');
            setDescription('');
            setImage('');
            setType('grass');
        } catch (error) {
            console.error('Error adding Pokémon:', error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 2,
                bgcolor: '#ffe082',  // Màu nền nhũ vàng
                padding: 3,
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ bgcolor: '#fff' }} // Màu nền trắng cho TextField
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{ bgcolor: '#fff' }} // Màu nền trắng cho TextField
            />
            <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                sx={{ bgcolor: '#fff' }} // Màu nền trắng cho TextField
            />
            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: '#4a148c' }}>Type</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Type"
                    sx={{ bgcolor: '#fff', borderRadius: 1 }} // Màu nền trắng cho Select
                >
                    <MenuItem value="grass">Grass</MenuItem>
                    <MenuItem value="fire">Fire</MenuItem>
                    <MenuItem value="water">Water</MenuItem>
                    <MenuItem value="electric">Electric</MenuItem>
                    <MenuItem value="psychic">Psychic</MenuItem>
                    {/* Thêm các loại khác nếu cần */}
                </Select>
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    mt: 2,
                    bgcolor: '#4a148c', // Màu tím đậm cho nút
                    '&:hover': {
                        bgcolor: '#3e272b', // Màu tối hơn khi hover
                    },
                }}
            >
                Add Pokémon
            </Button>
        </Box>
    );
};

export default AddPokemon;