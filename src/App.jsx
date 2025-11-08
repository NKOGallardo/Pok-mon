import { useEffect, useState } from "react";

function Header({ title }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <p>Search for your favorite Pokémon!</p>
    </div>
  );
}

function App() {
  const [userName, setUserName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [error, setError] = useState("");
  const [isAppear, setIsAppear] = useState(false);

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
      setIsAppear(true);
      setTimeout(() => setIsAppear(false), 600);
    } catch (err) {
      setError(err.message);
      setPokemonSprite("");
    }
  }

  return (
    <>
      <style>{`
        /* Global styles */
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background: #f8f9fa;
          font-family: "Poppins", sans-serif;
        }

        /* App container */
        .App {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          color: #333;
          padding: 2rem 1rem 3rem;
        }

        /* Search area */
        .search-section {
          margin-top: 2rem;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .search-section input {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 2px solid #3b4cca;
          outline: none;
          width: 250px;
          max-width: 80vw;
          font-size: 1rem;
          transition: 0.3s;
        }

        .search-section input:focus {
          border-color: #ffcb05;
          box-shadow: 0 0 10px rgba(255, 203, 5, 0.5);
          animation: glow 1.5s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 203, 5, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 203, 5, 0.8); }
        }

        .search-section button {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          background-color: #3b4cca;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          font-size: 1rem;
        }

        .search-section button:hover:not(:disabled) {
          background-color: #2a2a2a;
          animation: pulse 0.6s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .search-section button:disabled {
          background-color: #999;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .search-section a {
          text-decoration: none;
          padding: 1.2rem;
          border: none;
          border-radius: 8px;
          background-color: #000000;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          font-size: 1rem;
        }

        .search-section a:hover {
          background-color: #2a2a2a;
        }

        .App .mobile {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          background-color: #3b4cca;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          font-size: 1rem;
          display: none;
        }

        .App .mobile:hover:not(:disabled) {
          background-color: #2a2a2a;
          animation: pulse 0.6s ease-in-out;
        }

        .App .mobile:disabled {
          background-color: #999;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .App .mobile-link {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          background-color: #000000;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          font-size: 1rem;
          display: none;
        }

        .App .mobile-link:hover {
          background-color: #2a2a2a;
        }

        /* Error message */
        .error {
          color: red;
          margin-top: 1rem;
          text-align: center;
          font-size: 0.95rem;
        }

        .error.shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        /* Image section */
        .image-section {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          padding: 1.5rem;
          width: 90%;
          max-width: 400px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-height: 250px;
        }

        .image-section img {
          width: 200px;
          height: 200px;
          object-fit: contain;
          transition: transform 0.3s ease-in-out;
          animation: float 3s ease-in-out infinite;
        }

        .image-section img:hover {
          transform: scale(1.1);
        }

        /* Float animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Pokémon appear animation */
        .image-section.pokemon-appear img {
          animation: pokemonAppear 0.6s ease-out, float 3s ease-in-out infinite 0.6s;
        }

        @keyframes pokemonAppear {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
          }
          60% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* Pokéball loader */
        .pokeball-loader {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          position: relative;
          animation: spin 1s linear infinite;
          background: linear-gradient(to bottom, #ff0000 50%, #ffffff 50%);
          border: 4px solid #333;
        }

        .pokeball-loader::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: white;
          border: 4px solid #333;
          border-radius: 50%;
          z-index: 2;
        }

        .pokeball-loader::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: #333;
          transform: translateY(-50%);
          z-index: 1;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Header styling */
        .header {
          text-align: center;
          padding: 10px;
          color: #000000;
          border-bottom: 3px solid #2a2a2a;
          width: 100%;
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header h1 {
          font-size: 2rem;
          margin: 0;
          letter-spacing: 1px;
        }

        .header p {
          margin-top: 0.5rem;
          font-size: 1rem;
          opacity: 0.9;
        }

        /* RESPONSIVE DESIGN */

        /* 📱 Small screens (phones) */
        @media (max-width: 600px) {
          .header h1 {
            font-size: 1.6rem;
          }

          .search-section input {
            width: 100%;
            font-size: 0.95rem;
          }

          .search-section button {
            width: 100%;
            font-size: 0.95rem;
          }

          .image-section {
            max-width: 300px;
            padding: 1rem;
          }

          .image-section img {
            width: 150px;
            height: 150px;
          }
          
          .App .mobile,
          .App .mobile-link {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 350px;
            text-align: center;
            z-index: 1000;
            opacity: 0;
            animation: slideUp 0.8s ease forwards;
            display: block;
          }

          .App .mobile {
            bottom: 75px;
            background-color: #3b4cca;
            color: #fff;
            font-weight: bold;
            border: none;
            border-radius: 10px;
            padding: 0.8rem;
            font-size: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation-delay: 0.2s;
          }

          .App .mobile:hover:not(:disabled) {
            background-color: #2a2a2a;
            transform: translateX(-50%) scale(1.05);
          }

          .App .mobile-link {
            bottom: 15px;
            background-color: #000;
            color: #fff;
            font-weight: bold;
            border-radius: 10px;
            padding: 0.8rem;
            font-size: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation-delay: 0.4s;
          }

          .App .mobile-link:hover {
            background-color: #2a2a2a;
            transform: translateX(-50%) scale(1.05);
          }

          /* Hide desktop buttons */
          .search-section button,
          .search-section a {
            display: none;
          }
        }

        /* Slide-up animation for mobile buttons */
        @keyframes slideUp {
          from {
            transform: translate(-50%, 100px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        /* 💻 Medium screens (tablets) */
        @media (min-width: 601px) and (max-width: 900px) {
          .header h1 {
            font-size: 1.8rem;
          }

          .search-section input {
            width: 70%;
          }

          .image-section {
            max-width: 350px;
          }
        }

        /* 🖥️ Large screens (desktops) */
        @media (min-width: 901px) {
          .header h1 {
            font-size: 2.5rem;
          }

          .search-section input {
            width: 300px;
          }

          .image-section img {
            width: 220px;
            height: 220px;
          }
        }
      `}</style>

      <div className="App">
        <Header title={`${userName}'s Pokémon Search ⚡`} />

        <div className="search-section">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchData()}
          />
          <button onClick={fetchData}>Fetch Pokémon</button>
          <a href="https://nkogallardo.link" target="_blank" rel="noopener noreferrer">Developer</a>
        </div>

        {error && <p className="error shake">{error}</p>}

        <div className={`image-section ${isAppear ? 'pokemon-appear' : ''}`}>
          {pokemonSprite && <img src={pokemonSprite} alt={pokemonName} />}
        </div>

        <button onClick={fetchData} className="mobile">Fetch Pokémon</button>
        <a href="https://nkogallardo.link" target="_blank" rel="noopener noreferrer" className="mobile-link">Developer</a>
      </div>
    </>
  );
}

export default App;