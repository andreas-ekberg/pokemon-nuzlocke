import axios from 'axios'
import { useEffect, useState } from 'react'

interface teamMemberProp {
    pokemonName: string,

};

export default function TeamMember({ pokemonName }: teamMemberProp) {
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState<any>({
        name: "",
        img: "",
        type: ""
    });

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/squirtle`).then((response) => {
            setPokemon({
                name: response.data.species.name,
                img: response.data.sprites.front_default,
                type: response.data.types[0].type.name
            })

        });
        setPokemonChosen(true);

    }, []);

    return (
        <div style={{
            margin: "1rem",
            backgroundColor: "lightcoral",
            width: "10rem"
        }}>
            <img style={{ float: "left" }} src={pokemon.img} />
            <h3>{pokemon.name}</h3>
            <h3>{pokemon.type}</h3>

        </div>

    )
}