// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data','pokemonTeam.json')

interface Pokemon{
  name: string;
  img: string;
}

interface PokemonTeam{
  members: {
    slot1: Pokemon;
    slot2: Pokemon;
    slot3: Pokemon;
    slot4: Pokemon;
    slot5: Pokemon;
    slot6: Pokemon;
  };
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
 
  
  if(req.method === 'GET'){
    try{
      console.log("GETTING");
      const jsonData = await fsPromises.readFile(dataFilePath);
      const PokemonTeamData = JSON.parse(jsonData.toString());

    res.status(200).json(PokemonTeamData);

    } catch(error){
    }
  }
  else if(req.method === 'POST'){
    console.log("SENDING");
    const jsonData = await fsPromises.readFile(dataFilePath);
    const pokemonTeamData: PokemonTeam = JSON.parse(jsonData.toString());

  const newMember: Pokemon = { name: req.body.name, img: req.body.img };
  
  pokemonTeamData.members[`slot${req.body.slot}`as keyof PokemonTeam['members']] = newMember;

  await fsPromises.writeFile(dataFilePath, JSON.stringify(pokemonTeamData));
  res.status(200).json({ message: 'Pokemon added!' });

  }
  else {
    res.status(405).send('Method Not Allowed');
  }
}
