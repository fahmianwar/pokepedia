import React, { useState, useEffect } from 'react';
import Card from './components/Card';

import { getPokemon, getAllPokemon } from './services/pokemon';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PokemonList from './components/Pokemon';
import Pokemon from './components/Pokemon/PokemonDetail';
import PokemonDetail from './components/Pokemon/PokemonDetail';


function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  
  return (
    <>
    <Router>
        <Switch>
        <Route path="/pokemonList" component={PokemonList}>
          </Route>
          <Route path="/pokemon/:pokemonIndex" component={PokemonDetail}>
          </Route>
        <Route path="/">
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
  <div className="col-md-12">
          <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item"><button class="page-link" onClick={prev}>Previous</button></li>
    <li className="page-item"><button class="page-link" onClick={next}>Next</button></li>
  </ul>
</nav>
</div>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
  <div className="col-md-12">
          <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item"><button class="page-link" onClick={prev}>Previous</button></li>
    <li className="page-item"><button class="page-link" onClick={next}>Next</button></li>
  </ul>
</nav>
</div>
          </>
        )}
              </Route>
        </Switch>
      </Router>
      
      
    </>
  );
}

export default App