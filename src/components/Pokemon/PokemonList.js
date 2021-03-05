import React from 'react'
import ls from 'local-storage'

const PokemonList = () => {
    if(ls.get('pokemonList')!=null){
          var pokemonList = JSON.parse(ls.get('pokemonList'));
          //ls.set('pokemonList', pokemon);
          /*
            for (let index = 0; index < pokemonList.length; index++) {
            return (
                <div>
                    {typeof(pokemonList)}
                    {pokemonList[index]['id']} - {pokemonList[index]['name']}
                </div>
                )
            }
            */
           const listItems = pokemonList.map((pokemon) =>
           <div className="col-md-3">
           <div className="card mb-3 shadow-sm">
               <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon['id']+'.png'} alt={pokemon.name}/>
                   <div className="card-body">
                       <p className="card-text text-center"><strong>{pokemon['name'].toUpperCase()}</strong></p>
                   <br />
                       <div className="d-flex justify-content-between align-items-center">
                           <div className="btn-group">
                           <a className="btn btn-info" href={'/pokemon/' + pokemon['id']}>Detail</a>
                           <a className="btn btn-success" href={'/pokemonRename/' + pokemon['id']}>Rename</a>
                           <a className="btn btn-danger" href={'/pokemonDelete/' + pokemon['id']}>Delete</a>
                           </div>
                       </div>
                   </div>
           </div>
       </div>  
            )
              return(

                    listItems

                  

              )

        }else{
            return (
                <div>
                   Empty
                </div>
            )
        }

}

export default PokemonList;
