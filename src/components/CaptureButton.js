import React from 'react';

export default function Capture(props) {
		console.log(props.toCapture.selectedPoke);
		var name = props.toCapture.selectedPoke.name ? 'Capture' : '';
		return(
			<button className='pokeBtn' style={{display: name?'block':'none'}} onClick={props.capture}>{name}</button>
		)

}