import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="header container">
        <div>logo</div>
        <div>
          <Link to="/">Accueil + logo</Link>
          <Link to="/pokemon">Pokémon</Link>
          <Link to="/types">Types</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
