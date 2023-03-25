import axios, { formToJSON } from 'axios'
import { useEffect, useState } from 'react'
import { PokemonClient } from 'pokenode-ts';

export default function PokemonPicker() {
    const [PokemonList, setPokemonList] = useState<any>([{
        name: ""
    }]);
    const [specPokemon, setspecPokemon] = useState<any>({
        name: ""
    })

    useEffect(() => {
        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonById(2)
                .then((data) => setspecPokemon(data)) // will output "Luxray"
                .catch((error) => console.error(error));
        })();

        axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((response) => {
            //console.log(response.data.results);
            setPokemonList(response.data.results);
        });

    }, []);

    console.log(specPokemon.name);
    return (
        <div>{PokemonList.map((pokemon: any, i: number) => (
            <div key={i}>{pokemon.name}</div>
        ))}</div>
    )

}