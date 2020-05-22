function getPokemon(pokeSelect) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeSelect}/`

  fetch(url)  
    .then(res => res.json()) 
    .then(data => {
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        abilities: data.abilities
          .map(ability => ability.ability.name)
          .join(' / '),
        type: data.types
          .map(type =>  type.type.name)
          .join(' / '),
        speed: data.stats[0].base_stat,
        specialDef: data.stats[1].base_stat,
        specialAtk: data.stats[2].base_stat,
        def: data.stats[3].base_stat,
        atk: data.stats[4].base_stat,
        hp: data.stats[5].base_stat,
        baseExp: data.base_experience,
        weight: data.weight,
        height: data.height,
      };
      console.log(pokemon);
    }
  );
}
getPokemon('1');