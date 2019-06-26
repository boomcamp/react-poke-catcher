import React from 'react';



export default function Details(props) {

	if(props.pokeDetails.stats) {
	return (
		<div>
			<h3>Details</h3>
			{props.pokeDetails.stats.map((poke,i)=> (<p key={i}>{poke.stat.name} {poke.base_stat}</p>))}
		</div>
	);
	}
	return <div></div>

}