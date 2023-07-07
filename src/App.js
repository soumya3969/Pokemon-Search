import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchPokemon = () => {
    if (searchTerm.trim() === '') {
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then((data) => {
        const pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((type) => type.type.name),
          abilities: data.abilities.map((ability) => ability.ability.name),
        };
        setPokemonData(pokemon);
        setError(null);
      })
      .catch((error) => {
        setPokemonData(null);
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <h1>Search Your Pokemon</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon by Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        pokemonData && (
          <div className="pokemon-container">
            <div className="pokemon">
              <img src={pokemonData.image} alt={pokemonData.name} />
              <h3>{pokemonData.name}</h3>
              <p>ID: {pokemonData.id}</p>
              <p>Types: {pokemonData.types.join(', ')}</p>
              <p>Abilities: {pokemonData.abilities.join(', ')}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
