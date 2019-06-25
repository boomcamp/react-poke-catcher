import React from 'react';

import Capture from './CaptureButton';
import Details from './Details'
// import { pokeApi } from '../config/axiosConfig';



function pokemonEncounter(props){

	if(props) {
	var msg = props.msg;
	var pokeDetails = props.selectedPoke;
	var poke = pokeDetails.name;
	var pokeImg =pokeDetails.sprites;
	pokeImg = pokeImg ? pokeImg.front_default : '';
	console.log(poke);
	}
	return(
		<div className='child'>
		<h1>Encounters</h1>
		<h2>{msg}</h2>
		<h2>{poke}</h2>
		<img src={pokeImg} className='pokeImg' alt=''/>
		<Details pokeDetails={pokeDetails?pokeDetails:{}} />
		<Capture toCapture={props} capture={props.capturePoke}/>
		</div>
	);


}

export default pokemonEncounter;