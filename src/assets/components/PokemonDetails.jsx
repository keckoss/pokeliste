import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function PokemonDetails() {
  const { pokemonName } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonsOfType, setPokemonsOfType] = useState([]);
  const [showPokemonsOfType, setShowPokemonsOfType] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon(data);
        setShowPokemonsOfType(false);
      })
      .catch((error) => {
        console.error("Error fetching selected pokemon data:", error);
      });
  }, [pokemonName]);

  const handleTypeClick = () => {
    if (selectedPokemon) {
      const typeUrls = selectedPokemon.types.map((type) => type.type.url);
      Promise.all(
        typeUrls.map((url) => fetch(url).then((response) => response.json()))
      )
        .then((data) => {
          const pokemons = data.map((typeData) =>
            typeData.pokemon.map((pokemonData) => pokemonData.pokemon)
          );
          const mergedPokemons = [].concat(...pokemons);
          setPokemonsOfType(mergedPokemons);
          setShowPokemonsOfType(true);
        })
        .catch((error) => {
          console.error(
            "Error fetching pokemon data for selected type:",
            error
          );
        });
    }
  };

  return (
    <div className="container">
      {showPokemonsOfType ? (
        <div>
          <h2>Pokémon du type {selectedPokemon.types[0].type.name}</h2>
          <ul>
            {pokemonsOfType.map((pokemon) => (
              <li key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.name}`}>
                  {pokemon.name}
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(
                      pokemon.url
                    )}.png`}
                    alt={pokemon.name}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : selectedPokemon ? (
        <div>
          <h2>{selectedPokemon.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
            alt={selectedPokemon.name}
          />
          <p>
            Types:{" "}
            {selectedPokemon.types.map((type) => (
              <Link key={type.type.name} to="#" onClick={handleTypeClick}>
                {type.type.name}
              </Link>
            ))}
          </p>
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;

function extractPokemonId(url) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}
