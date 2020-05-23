// DOM ELEMENT SELECTORS 

const leftName = document.querySelector('.leftName');
const rightName = document.querySelector('.rightName');

const leftSprite = document.querySelector('.leftSprite');
const rightSprite = document.querySelector('.rightSprite');

const leftSelect = document.getElementById('leftSelect');
const rightSelect = document.getElementById('rightSelect');

const leftStatName = document.querySelector('.leftDataHead');
const rightStatName = document.querySelector('.rightDataHead');

const leftStatType = document.querySelector('.statRow__type-left');
const rightStatType = document.querySelector('.statRow__type-right');

const leftStatAbilities = document.querySelector('.statRow__abilities-left');
const rightStatAbilities = document.querySelector('.statRow__abilities-right');

const leftStatHp = document.querySelector('.statRow__hp-left');
const rightStatHp = document.querySelector('.statRow__hp-right');

const leftStatAtk = document.querySelector('.statRow__atk-left');
const rightStatAtk = document.querySelector('.statRow__atk-right');

const leftStatDef = document.querySelector('.statRow__def-left');
const rightStatDef = document.querySelector('.statRow__def-right');

const leftStatSpecialAtk = document.querySelector('.statRow__special-atk-left');
const rightStatSpecialAtk = document.querySelector('.statRow__special-atk-right');

const leftStatSpecialDef = document.querySelector('.statRow__special-def-left');
const rightStatSpecialDef = document.querySelector('.statRow__special-def-right');

const leftStatSpeed = document.querySelector('.statRow__speed-left');
const rightStatSpeed = document.querySelector('.statRow__speed-right');

const leftStatExp = document.querySelector('.statRow__exp-left');
const rightStatExp = document.querySelector('.statRow__exp-right');

const leftStatWeight = document.querySelector('.statRow__weight-left');
const rightStatWeight = document.querySelector('.statRow__weight-right');

const leftStatHeight = document.querySelector('.statRow__height-left');
const rightStatHeight = document.querySelector('.statRow__height-right');


// FETCH POKEMON FROM API => OBJECTS

function getPokemon(index) {
  for(let i=1; i<= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`
    
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

          const leftSelect = document.getElementById('leftSelect');
          const rightSelect = document.getElementById('rightSelect');

          const leftOption = document.createElement('option');
          const rightOption = document.createElement('option');

          leftOption.value = pokemon.id;
          rightOption.value = pokemon.id;

          leftOption.appendChild( document.createTextNode(`${pokemon.id}. ${pokemon.name}`) );
          rightOption.appendChild( document.createTextNode(`${pokemon.id}. ${pokemon.name}`) );

          leftSelect.appendChild(leftOption);
          rightSelect.appendChild(rightOption);
      }
    );
  }
}



getPokemon(1);

//When pokemon is selected, use the value to display the stats by the id.