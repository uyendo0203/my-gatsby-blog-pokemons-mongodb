import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
    Pagination,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';
import { Link } from 'gatsby';
import EditPokemonDialog from './EditPokemonDialog';

const ITEMS_PER_PAGE = 10;

const PokemonManager = () => {
    const [pokemons, setPokemons] = useState([]);
    const [editingPokemon, setEditingPokemon] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [pokemonToDelete, setPokemonToDelete] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        const response = await axios.get('http://localhost:5001/api/pokemons');
        setPokemons(response.data);
    };

    const handleEdit = (pokemon) => {
        setEditingPokemon(pokemon);
        setOpenDialog(true);
    };

    const handleDelete = (pokemon) => {
        setPokemonToDelete(pokemon);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (pokemonToDelete) {
            await axios.delete(`http://localhost:5001/api/pokemons/${pokemonToDelete._id}`);
            fetchPokemons();
        }
        handleCloseConfirmDialog();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingPokemon(null);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setPokemonToDelete(null);
    };

    const handleSave = async (formData) => {
        if (editingPokemon) {
            await axios.put(`http://localhost:5001/api/pokemons/${editingPokemon._id}`, {
                ...formData,
                types: formData.types.split(',').map(type => type.trim()),
            });
        }
        fetchPokemons();
        handleCloseDialog();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedPokemons = pokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Container sx={{ bgcolor: '#e0f7fa', padding: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#00695c' }}>
                Pokémon Manager
            </Typography>

            <Link to="/pokemon/add" sx={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ bgcolor: 'green', marginBottom: 2 }}>
                    Add Pokémon
                </Button>
            </Link>

           
            <Grid container spacing={3}>
                {paginatedPokemons.map(pokemon => (
                    <Grid item xs={6} sm={4} md={3} key={pokemon._id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Link to={`/pokemon/${pokemon._id}`} sx={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    alt={pokemon.name}
                                    sx={{ maxWidth: 100, height: 'auto', display: 'flex', justifyContent: 'center', margin: '0 auto', padding: 1 }}
                                    image={pokemon.image}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="div" sx={{ color: '#4a148c', cursor: 'pointer' }}>
                                        {pokemon.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {pokemon.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Types: {pokemon.types.join(', ')}
                                    </Typography>
                                </CardContent>
                            </Link>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                                <Button variant="outlined" color="primary" onClick={() => handleEdit(pokemon)} sx={{ borderColor: 'grey', color: 'black' }}>
                                    Edit
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete(pokemon)} sx={{ borderColor: 'grey', color: 'black' }}>
                                    Delete
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(pokemons.length / ITEMS_PER_PAGE)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>

            {/* Dialog for editing Pokémon */}
            <EditPokemonDialog
                open={openDialog}
                onClose={handleCloseDialog}
                pokemon={editingPokemon}
                onSave={handleSave}
            />

            {/* Confirm Delete Dialog */}
            <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogTitle sx={{ bgcolor: '#e0f7fa', color: '#00695c' }}>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="text.primary">
                        Are you sure you want to delete this Pokémon? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#e0f7fa' }}>
                    <Button onClick={handleCloseConfirmDialog} color="primary" sx={{ color: '#4a148c' }}>
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary" sx={{ bgcolor: '#d32f2f', color: '#fff', '&:hover': { bgcolor: '#c62828' } }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PokemonManager;