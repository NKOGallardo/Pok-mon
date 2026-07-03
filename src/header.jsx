import React from "react";

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <p>Find your favorite Pokémon by name</p>
    </header>
  );
}

export default Header;
