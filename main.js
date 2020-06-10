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



//  EVENT LISTENERS

leftSelect.addEventListener('change', displayLeftPokemon);
rightSelect.addEventListener('change', displayRightPokemon);
document.addEventListener('DOMContentLoaded', displayDefault);


// FUNCTIONS

function displayLeftPokemon(e) {
  const iChooseYou = e.target.value;
  paintPokemon(iChooseYou, 'left'); 
}

function displayRightPokemon(e) {
  const iChooseYou = e.target.value;
  paintPokemon(iChooseYou, 'right');
}

function displayDefault() {
  paintPokemon(1, 'left');
  paintPokemon(1, 'right');
}


// FETCH ALL POKEMON
async function getAllPokemon() {
  // start with empty array
  const promices = [];

  // fetch all promices from each ajax call
  for(let i=1; i<= 807; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`
  
    // put all promices in the array
    promices.push(
      fetch(url).then(res => res.json())
    );
  };

  const pokemonDataArray = await Promise.all(promices);

  // map array of results into array of usable pokemon objects
  const pokemonForList = pokemonDataArray.map( data => ({
    id: data.id,
    name: data.name,
  }));

  // Add each pokemon to the select lists
  pokemonForList.forEach(onePokemon => {
    const leftOption = document.createElement('option');
    const rightOption = document.createElement('option');

    leftOption.value = onePokemon.id;
    rightOption.value = onePokemon.id;

    leftOption.appendChild( document.createTextNode(`${onePokemon.id}. ${onePokemon.name}`) );
    rightOption.appendChild( document.createTextNode(`${onePokemon.id}. ${onePokemon.name}`) );

    leftSelect.appendChild(leftOption);
    rightSelect.appendChild(rightOption);
  })
};
getAllPokemon(); 



// GET SINGLE POKEMON - Paint to DOM
async function paintPokemon(index, side) {
  const url = `https://pokeapi.co/api/v2/pokemon/${index}/`
  
  const data = await fetch(url)
    .then(res => res.json());

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
  }

  if(side === 'left') {
    leftName.textContent = pokemon.name.toUpperCase();
    leftSprite.src = pokemon.image;
    leftSprite.alt = `${pokemon.name} image`;
    leftStatName.textContent = pokemon.name.toUpperCase();
    leftStatType.textContent = pokemon.type;
    leftStatAbilities.textContent = pokemon.abilities;
    leftStatHp.textContent = pokemon.hp;
    leftStatAtk.textContent = pokemon.atk;
    leftStatDef.textContent = pokemon.def;
    leftStatSpecialAtk.textContent = pokemon.specialAtk;
    leftStatSpecialDef.textContent = pokemon.specialDef;
    leftStatSpeed.textContent = pokemon.speed;
    leftStatExp.textContent = pokemon.baseExp;
    leftStatWeight.textContent = pokemon.weight;
    leftStatHeight.textContent = pokemon.height;
  } else if(side === 'right') {
    rightName.textContent = pokemon.name.toUpperCase();
    rightSprite.src = pokemon.image;
    rightSprite.alt = `${pokemon.name} image`;
    rightStatName.textContent = pokemon.name.toUpperCase();
    rightStatType.textContent = pokemon.type;
    rightStatAbilities.textContent = pokemon.abilities;
    rightStatHp.textContent = pokemon.hp;
    rightStatAtk.textContent = pokemon.atk;
    rightStatDef.textContent = pokemon.def;
    rightStatSpecialAtk.textContent = pokemon.specialAtk;
    rightStatSpecialDef.textContent = pokemon.specialDef;
    rightStatSpeed.textContent = pokemon.speed;
    rightStatExp.textContent = pokemon.baseExp;
    rightStatWeight.textContent = pokemon.weight;
    rightStatHeight.textContent = pokemon.height;
  }
};

