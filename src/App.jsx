import { useState } from "react";
import "./App";

function StatBar({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <span> {value}</span>
    </div>
  );
}

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
    <div>
      <h1>Pokémon Search</h1>

      <div>
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
      </div>

      {error && <p>{error}</p>}

      {pokemon && (
        <div>
          <h2>
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} #
            {String(pokemon.id).padStart(3, "0")}
          </h2>

          <img src={pokemon.sprites.front_default} alt={pokemon.name} />

          <p>
            Type: {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          <p>
            Ability: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>

          <div>
            <h3>Stats</h3>
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                label={STAT_LABELS[s.stat.name] || s.stat.name}
                value={s.base_stat}
              />
            ))}
          </div>

          <p>Height: {(pokemon.height / 10).toFixed(1)}m</p>
          <p>Weight: {(pokemon.weight / 10).toFixed(1)}kg</p>
        </div>
      )}
    </div>
  );
}

export default App;