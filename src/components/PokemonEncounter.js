import React from 'react';

import { pokeApi } from '../config/axiosConfig';

var pokeImg = '';
function randomN(numRange) {
	return Math.floor((Math.random() * numRange));
}
function showDetails(obj){
		if(obj){
		var pokemon = (obj['pokemon']['name']);
		pokeApi
			.get('pokemon/'+pokemon)
			.then(res => {pokeImg = res.data.sprites['front_default'];});
	}
}	

function pokemonEncounter(pokemon){
	console.log(pokemon)
	if(pokemon) {
	var random = randomN(pokemon.pokemon.length);
	}
	showDetails(pokemon.pokemon[random]);
	return(
		<div>
		<h1>Pokemon encounters</h1>
		<img className='pokeImg' src={pokeImg} alt='not found'/>
		</div>
	);


}

export default pokemonEncounter;