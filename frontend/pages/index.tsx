
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState<any>({
    name: "",
    img: ""
  });

  const requestPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/charmander`).then((response) => {
      setPokemon({ name: response.data.species.name, img: response.data.sprites.front_default })

    });
    setPokemonChosen(true);
    console.log(pokemon);
  }
  return (
    <>
      <h1>Nuzlocke Helper!</h1>
      <button onClick={requestPokemon} />
      <div>{!pokemonChosen ? (<div>no pokemon</div>) : (<>
        <div>{pokemon.name}</div>
        <img src={pokemon.img} />
      </>
      )}</div>
    </>
  )
}
