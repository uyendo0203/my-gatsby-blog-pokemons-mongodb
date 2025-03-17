import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from '@mui/material';

const EditPokemonDialog = ({ open, onClose, pokemon, onSave }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        image: '',
        types: ''
    });

    React.useEffect(() => {
        if (pokemon) {
            setFormData({
                name: pokemon.name,
                description: pokemon.description,
                image: pokemon.image,
                types: pokemon.types.join(', ')
            });
        }
    }, [pokemon]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ bgcolor: '#e0f7fa', color: '#00695c' }}>Edit Pokémon</DialogTitle>
            <DialogContent>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ bgcolor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        sx={{ bgcolor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Image URL"
                        fullWidth
                        margin="normal"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        sx={{ bgcolor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Types (comma separated)"
                        fullWidth
                        margin="normal"
                        name="types"
                        value={formData.types}
                        onChange={handleChange}
                        sx={{ bgcolor: '#fff', borderRadius: 1 }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPokemonDialog;