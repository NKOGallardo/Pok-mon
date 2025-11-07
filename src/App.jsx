import { useEffect, useState } from "react";
import Header from "./header";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const name = prompt("Enter your name:");
    if (name && name.trim() !== "") {
      setUserName(name.trim());
    }
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();
      setPokemonSprite(data.sprites.front_default);
      setError("");
    } catch (err) {
      setError(err.message);
      setPokemonSprite("");
    }
  }

  return (
    <div className="App">
      <Header title={`${userName}'s Pokémon Search ⚡`} />

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={fetchData}>Fetch Pokémon</button>
        <a href="https://nkogallardo.link">Developer</a>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="image-section">
        {pokemonSprite && <img src={pokemonSprite} alt={pokemonName} />}
      </div>

      
      <button onClick={fetchData} className="mobile">Fetch Pokémon</button>
      <a href="https://nkogallardo.link" className="mobile-link">Developer</a>

    </div>
  );
}

export default App;
