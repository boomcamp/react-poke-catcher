import React from 'react';

export default function PokemonCaptured(props) {
	console.log(props.items)
	return (
		<div className='child'>
			<h2>Captured</h2>
			<div className='captured'>
			{props.items.map((poke,index) => (
				<div key={index} className='capPoke'>
				<h3>{poke.name}</h3>
				<img src={poke.sprites.front_default} alt='Null'/>
				</div>
			))}
			</div>
		</div>
	)

}