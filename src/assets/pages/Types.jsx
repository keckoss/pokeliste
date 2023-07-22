import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Types() {
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [pokemonsOfType, setPokemonsOfType] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => {
        setTypesList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching types data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetch(selectedType.url)
        .then((response) => response.json())
        .then((data) => {
          setPokemonsOfType(data.pokemon.map((pokeData) => pokeData.pokemon));
        })
        .catch((error) => {
          console.error(
            "Error fetching pokemon data for selected type:",
            error
          );
        });
    }
  }, [selectedType]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="container">
      {selectedType ? (
        <div>
          <h2>Pokémon du type {selectedType.name}</h2>
          <ul>
            {pokemonsOfType.map((pokemon) => (
              <li key={pokemon.name}>
                {/* Utilise Link pour créer un lien vers la page de détails du Pokémon */}
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
      ) : (
        <div>
          <h2>Liste des types de Pokémon</h2>
          <ul>
            {typesList.map((type) => (
              <li key={type.name}>
                <button onClick={() => handleTypeClick(type)}>
                  {type.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Types;

// Fonction pour extraire l'ID du Pokémon à partir de son URL
function extractPokemonId(url) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}
