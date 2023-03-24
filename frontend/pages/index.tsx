
import react, { useState, FunctionComponent } from 'react'
import axios from 'axios'
import TeamMember from './Components/TeamMember';

export default function Home() {
  const [pokemonName, setPokemonName] = useState<string>();
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState<any>({
    name: "",
    img: ""
  });


  //Pokemon request
  const requestPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({ name: response.data.species.name, img: response.data.sprites.front_default })

    });
    setPokemonChosen(true);
  }


  return (
    <>

      <div style={
        {
          display: "flex",
          alignItems: "center",
          justifyContent: 'center'
        }}>
        <h1>Nuzlocke Helper!</h1>
      </div>
      <div style={{
        float: "left"
      }}>
        <h2>My team</h2>
        <input type="text" onChange={(event) => setPokemonName(event.target.value)}></input>
        <button onClick={requestPokemon} />
        <div>{!pokemonChosen ? (<div>no pokemon</div>) : (<>
          <div>{pokemon.name}</div>
          <img src={pokemon.img} />
        </>
        )}</div>
        <TeamMember name="GNU"></TeamMember>
      </div>

    </>
  )
}
