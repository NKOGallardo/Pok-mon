# Pokémon Search App ⚡

A fast and simple Pokémon search tool built with **React + Vite**, using the free **PokéAPI**.  
Type any Pokémon’s name and instantly see its sprite in a smooth, minimal interface.
learned a lot from res,req to api calla

---

## the brain

const response = await fetch(
`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
);

const data = await response.json();
setPokemonImage(data.sprites.front_default);

---

## 📸 Preview

![App Screenshot](<./Screenshot%20(25).png>)

<!-- Replace screenshot.png with your own file name -->

---

## 🚀 Features

- 🔍 Search Pokémon by name
- ⚡ Real-time data from PokéAPI
- 🎨 Clean, minimal UI
- 📱 Fully responsive
- ⚙️ Built with React + Vite

---

## 📦 Installation & Setup

```bash
git clone <your-repo-url>
cd pokemon-search
npm install
npm run dev
```
