import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Pokemon from "./assets/pages/Pokemon";
import Types from "./assets/pages/Types";
import Header from "./assets/components/Header";
import PokemonDetails from "./assets/components/PokemonDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/types" element={<Types />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
