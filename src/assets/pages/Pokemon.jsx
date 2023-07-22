import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching pokemon data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.url)
        .then((response) => response.json())
        .then((data) => {
          setSelectedPokemon(data);
        })
        .catch((error) => {
          console.error("Error fetching selected pokemon data:", error);
        });
    }
  }, [selectedPokemon]);

  return (
    <div className="container">
      <div className="pokepoke">
        <h2>Liste des Pokémons</h2>
        <ul className="pokelist">
          {pokemonList.map((pokemon) => (
            <li className="poke" key={pokemon.name}>
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

        {selectedPokemon && (
          <div>
            <h2>{selectedPokemon.name}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
              alt={selectedPokemon.name}
            />
            <p>
              Types:{" "}
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokemon;

// Fonction pour extraire l'ID du Pokémon à partir de son URL
function extractPokemonId(url) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}
