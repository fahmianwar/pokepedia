import React, { useState, useEffect }  from 'react'
import { getPokemon } from '../../services/pokemon';




const PokemonDetail = () => {
    const initialURL = 'https://pokeapi.co/api/v2/pokemon/1'
const [pokemonData, setPokemonData] = useState([])
useEffect(() => {
  async function fetchData() {
    let response = await getPokemon(initialURL)
    await loadPokemon(response.results);
  }
  fetchData();
}, [])

const loadPokemon = async (data) => {
  let _pokemonData = await Promise.all(data.map(async pokemon => {
    let pokemonRecord = await getPokemon(pokemon)
    return pokemonRecord
  }))
  setPokemonData(_pokemonData);
}
    //var pokemonList = JSON.parse('https://pokeapi.co/api/v2/pokemon/1');
    return (
        <div>
            {JSON.stringify(pokemonData)}
        </div>
    )
}

export default PokemonDetail
