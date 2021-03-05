import React from 'react';
import typeColors from '../../helpers/typeColors'
import ls from 'local-storage'
function catchPokemon(pokemon){
    //var dataPokemonList = ls.get('pokemonList');
    if(ls.get('pokemonList')==null){
        var pokemonList = [];
        pokemonList.push({
            id:  pokemon.id,
            name: pokemon.name
          });
          ls.set('pokemonList', JSON.stringify(pokemonList));
          //ls.set('pokemonList', pokemon);
        
    }else{

        var dataPokemonList = JSON.parse(ls.get('pokemonList'));
    dataPokemonList.push({
        id:  pokemon.id,
        name: pokemon.name
      });
      ls.set('pokemonList', JSON.stringify(dataPokemonList));
      //ls.set('pokemonList', pokemon);
    }
}
function Card({ pokemon }) {
    return (
        <div className="col-md-3">
            <div className="card mb-3 shadow-sm">
                <img src={pokemon.sprites.front_default} alt="{pokemon.name}"/>
                    <div className="card-body">
                        <p className="card-text text-center"><strong>{pokemon.name.toUpperCase()}</strong></p>
                        {
                    pokemon.types.map(type => {
                        return (
                            <span class="badge badge-secondary" style={{ backgroundColor: typeColors[type.type.name] }}>{type.type.name}</span>
                            )
                        })
                    }
                    <br />
                        <i class="fa fa-text-height" aria-hidden="true"></i> {pokemon.height}<br />
                            <i class="fa fa-balance-scale" aria-hidden="true"></i> {pokemon.weight}<br />
                            <i class="fa fa-balance-skills" aria-hidden="true"></i> {pokemon.abilities[0].ability.name}

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            <button type="button" className="btn btn-danger" onClick={() => catchPokemon(pokemon)} data-toggle="modal" data-target="#exampleModal">Catch</button>
                            <a className="btn btn-info" href={'/pokemon/' + pokemon.id}>Detail</a>

                            </div>


                        </div>
                    </div>
            </div>
        </div>  
    );
}

export default Card;
