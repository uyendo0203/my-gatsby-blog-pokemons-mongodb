const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Define the Pokémon model
const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    url: String,
    image: String,
    types: [String]
}));


// API endpoint to get all Pokémon
router.get('/api/pokemons', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons); // Ensure this is called only once
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/api/pokemons/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ params
        const pokemon = await Pokemon.findById(id); // Tìm Pokémon theo ID

        if (!pokemon) {
            return res.status(404).send('Pokémon not found'); // Kiểm tra nếu không tìm thấy
        }

        res.json(pokemon); // Trả về thông tin Pokémon
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new Pokémon
router.post('/api/pokemons/', async (req, res) => {
    const newPokemon = new Pokemon(req.body);
    await newPokemon.save();
    res.json(newPokemon);
});

// Update a Pokémon
router.put('/api/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPokemon = await Pokemon.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPokemon);
});

// Delete a Pokémon
router.delete('/api/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    await Pokemon.findByIdAndDelete(id);
    res.sendStatus(204);
});

module.exports = router;
