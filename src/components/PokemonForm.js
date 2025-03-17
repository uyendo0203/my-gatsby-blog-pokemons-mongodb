// src/components/PokemonForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PokemonForm = ({ pokemon, onSuccess }) => {
    const [name, setName] = useState(pokemon ? pokemon.name : '');
    const [description, setDescription] = useState(pokemon ? pokemon.description : '');
    const [image, setImage] = useState(pokemon ? pokemon.image : '');
    const [types, setTypes] = useState(pokemon ? pokemon.types.join(', ') : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, description, image, types: types.split(',').map(type => type.trim()) };

        try {
            if (pokemon) {
                // Update existing Pokémon
                await axios.put(`http://localhost:5000/api/pokemons/${pokemon._id}`, data);
            } else {
                // Create new Pokémon
                await axios.post('http://localhost:5000/api/pokemons', data);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving Pokémon:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
            <input type="text" value={types} onChange={(e) => setTypes(e.target.value)} placeholder="Types (comma separated)" required />
            <button type="submit">{pokemon ? 'Update' : 'Add'} Pokémon</button>
        </form>
    );
};

export default PokemonForm;