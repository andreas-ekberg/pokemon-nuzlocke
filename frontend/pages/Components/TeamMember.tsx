import axios from 'axios'
import { useEffect, useState } from 'react'

interface teamMemberProp {
    name: string
};

export default function TeamMember({ name }: teamMemberProp) {
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState<any>({
        name: "",
        img: ""
    });

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/squirtle`).then((response) => {
            setPokemon({ name: response.data.species.name, img: response.data.sprites.front_default })

        });
        setPokemonChosen(true);

    }, []);

    return (
        <div style={{
            margin: "5rem"
        }}>
            <h3>{name}</h3>
            <img src={pokemon.img} />
        </div>

    )
}