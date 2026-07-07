import { useState } from "react";
import "./Style's/App.css";
import Header from "./header";

function StatBar({ label, value }) {
  return (
    <div className="stat-bar">

      <span>{label}</span>
      <span> {value}</span>
    </div>
  );
}

const handleDeveloperClick = () => {

  trackAnalytics("Developer Link Clicked");

  window.open("https://nkogallardo.link", "_blank", "noopener,noreferrer");

};

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp.Atk",
  "special-defense": "Sp.Def",
  speed: "Speed",
};

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    
    if (!pokemonName.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(

        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`

      );

      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();

      setPokemon(data);
      setError("");
    } catch (err) {

      setError(err.message);
      setPokemon(null);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="App">
      <h1 className="header">Pokémon Search⚡ <Header /></h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
        />
        <button onClick={fetchData}>
          {loading ? "Loading..." : "Search"}
        </button>
        <button onClick={() => { 
          setPokemonName(""); 
          setPokemon(null); 
          setError(""); }}>
            Clear
        </button>
      </div>

      <p className="error">
        {error && <p>{error}</p>}
      </p>

      {pokemon && (
        <div className="pokemon-info">
          <h2>
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} #
            {String(pokemon.id).padStart(3, "0")}
          </h2>

          <img className="image-section" src={pokemon.sprites.front_default} alt={pokemon.name} />

          <p className="type">
            Type: {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          <p className="ability">
            Ability: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>

          <div className="stats-section">
            <h3>Stats</h3>
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                label={STAT_LABELS[s.stat.name] || s.stat.name}
                value={s.base_stat}
              />
            ))}
          </div>

          <p className="height">
            Height: {(pokemon.height / 10).toFixed(1)}m
          </p>
          <p className="weight">
            Weight: {(pokemon.weight / 10).toFixed(1)}kg
          </p>
        </div>
      )}
      <button 
          className="developer-button" 
          onClick={handleDeveloperClick}
      >
        Developer
      </button>
    </div>
  );
}

export default App;