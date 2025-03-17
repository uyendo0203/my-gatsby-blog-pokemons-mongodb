import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
} from '@mui/material';

const PokemonDetail = ({ params }) => {
    const { id } = params; // Lấy ID từ props.params
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/pokemons/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
                // navigate('/'); // Điều hướng về trang chính nếu có lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (!pokemon) {
        return <Typography variant="h6">Pokémon not found</Typography>;
    }

    return (
        <Container sx={{ bgcolor: '#e0f7fa', padding: 4 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, borderRadius: 2 }}>
                <CardMedia
                    component="img"
                    alt={pokemon.name}
                    image={pokemon.image}
                    sx={{ width: 150, height: 'auto', borderRadius: 1, marginBottom: 2 }}
                />
                <CardContent>
                    <Typography variant="h4" component="div" sx={{ color: '#4a148c', fontWeight: 'bold' }}>
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                        {pokemon.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Types: {pokemon.types.join(', ')}
                    </Typography>
                </CardContent>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" color="primary" sx={{ bgcolor: '#4a148c' }} onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </Box>
            </Card>
        </Container>
    );
};

export default PokemonDetail;