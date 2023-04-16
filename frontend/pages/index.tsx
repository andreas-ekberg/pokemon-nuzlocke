
import react, { useState, useEffect } from 'react'
import axios from 'axios'
import TeamMember from './Components/TeamMember';
import PokemonPicker from './Components/PokemonPicker';

export default function Home() {
  const [pokemonName, setPokemonName] = useState<string>();
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState<any>({
    name: "",
    img: ""
  });

  useEffect(() => {
    (async () => {
      const response = await fetch('api/team', { method: 'GET' });
      const data = await response.json();
      console.log("Team", data);
      setPokemon({ name: data.members.slot1.name, img: data.members.slot1.img });
    })();
  }, []);


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
        width: "50rem",
      }}>
        <h2>My team</h2>
        <input type="text" onChange={(event) => setPokemonName(event.target.value)}></input>



        <div>{pokemon.name}</div>
        <img src={pokemon.img} />

        {/*Pokemon chooser stuff*/}
        <div style={{
          float: "right"
        }}>
          <PokemonPicker></PokemonPicker>
        </div>


        {/*Pokemon team stuff*/}

        <div className="teamContainer" style={{
          display: "flex",
          width: "30rem",
          flexFlow: "row wrap",
          justifyContent: "space-around"
        }}>
          <TeamMember pokemonName=""></TeamMember>

        </div>


      </div>


    </>
  )
}

/*Conditional rendering.
<div>{!pokemonChosen ? (<div>no pokemon</div>) : (<>
          <div>{pokemon.name}</div>
          <img src={pokemon.img} />
        </>
        )}</div>        
*/