import { useEffect, useState } from 'react'
import { PokemonClient } from 'pokenode-ts';

export default function PokemonPicker() {
    const api = new PokemonClient();



    const [ListOfPokemon, setListOfPokemon] = useState<any>([])


    //Hämta från PokeAPI
    const promises: any = [];
    for (let i = 1; i <= 2; i++) {
        const promise = api.getPokemonById(i);
        promises.push(promise);
    }

    useEffect(() => {


        Promise.all(promises).then((data) => {
            const pokemonData = data.map((pokemon) => ({
                name: pokemon.species.name,
                img: pokemon.sprites.front_default
            }))
            console.log(pokemonData);
            setListOfPokemon(pokemonData);
        }).catch((error) => {
            console.log("error loading from api");
        });
    }, []);

    //SKICKA TILL JSON
    const addPokemon = async (pokemon: any) => {
        console.log("sending");
        const response = await fetch('api/team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: pokemon.name, slot: 1, img: pokemon.img })
        });
        if (!response.ok) {
            throw new Error('Failed to add Pokemon');
        }

        const data = await response.json();
        console.log('Pokemon added:', data);
    }


    return (
        <>

            <div>{ListOfPokemon.map((pokemon: any, i: number) => (
                <div key={i} onClick={(event) => addPokemon(pokemon)}>
                    <div >{pokemon.name}</div>
                    <img src={pokemon.img} />
                </div>
            ))}</div>

        </>
    )

}

/* Skriv ut en list med map
<div>{PokemonList.map((pokemon: any, i: number) => (
            <div key={i}>{pokemon.name}</div>
        ))}</div>
*/