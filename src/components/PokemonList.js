// src/components/PokemonList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonForm from './PokemonForm';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [editingPokemon, setEditingPokemon] = useState(null);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pokemons');
            setPokemons(response.data);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/pokemons/${id}`);
            fetchPokemons();
        } catch (error) {
            console.error("Error deleting Pokémon:", error);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div>
            <h1>Pokémon List</h1>
            <PokemonForm onSuccess={fetchPokemons} pokemon={editingPokemon} />
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon._id}>
                        <h2>{pokemon.name}</h2>
                        <p>{pokemon.description}</p>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <button onClick={() => { setEditingPokemon(pokemon); }}>Edit</button>
                        <button onClick={() => handleDelete(pokemon._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;