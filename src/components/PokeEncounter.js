import React from 'react';
import pokeball2 from '../pokeball2.gif';
import '../App.css';

const containerStyle = {
	position: 'relative',
	top: '30px',
	margin: 'auto',
	height: '850px',
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	width: '98%',
	backgroundColor: 'rgba(0,50,50,0.7)',
	borderRadius: '5px',
	boxShadow: '2px 2px 4px #888',
}
const encounter = {
  backgroundColor: '#ccc',
  width: '48%',
  height: '750px',
  borderRadius: '6px',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  listStyle: 'none',
};
const img_style = {
	height: '200px',
}


const catched = {
  backgroundColor: '#ccc',
  width: '48%',
  height: '750px',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  
};

const wrapper = {
  	width: '31%',
	height: '250px',
	backgroundColor: '#888',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	textTransform: 'uppercase',
	borderRadius: '5px',
}
const btn_capture = {
  width: '90px',
  height: '30px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#555',
  color: '#fff',
  marginTop: '20px',
}

const header = {
	height: '50px',
	backgroundColor: '#555',
	width: '100%',
	borderRadius: '5px 5px 0px 0px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#fff',
	textShadow: '1.5px 1.5px 3px #999',
}

const captured ={
	backgroundColor: '#f7ca0e',
	padding: '10px',
	borderRadius: '5px',
	boxShadow: '2px 2px 4px #ccc',
}
const poke_name = {
	textTransform: 'uppercase',	
	backgroundColor: '#f7ca0e',
	padding: '8px 20px',
	borderRadius: '6px',
	boxShadow: '2px 2px 4px #666',
}

const wrapper_1 = {
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '10px',
	marginBottom: '20px',
}
const items = {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	textTransform: 'capitalize',
	fontWeight: 'bold',
	marginTop: '10px',
}

const item_fr = {
	width: '100%',
	margin: '20px 0',
	backgroundColor: 'rgba(20,80,60,0.3)',
	padding: '15px 30px',
	color: '#111',
	borderRadius: '6px',
	boxShadow: '2px 2px 4px #666',
}

const pokeball = {
	width: '35%',
	marginBottom: '15px',
}

function PokeEncounter(x) {
	if(x.captured.length){
		var lengths = x.captured.length-1;
		if(x.captured){
		console.log(x.captured[lengths]);
		}else{
		}	
	}

	
	var stats = x.enc.stats;

	var poke = x.enc;
	var pokeName = poke.name;
	var pokeImg = poke.sprites?poke.sprites.front_default:'';
	var capturedPoke = x.captured;

	if(stats && pokeName){
		return(
		<div style={containerStyle} className='containerStyle'>		
			<div style={encounter}>
				<section style={header}><h2>Pokemon Encounters</h2></section>
				<div style={wrapper_1}>
					<img src={pokeImg} style={img_style} />
					<h4 style={poke_name}>{pokeName}</h4>
					<div style={item_fr}>
					{stats.map((item,i) => 
						<div style={items}><span>{item.stat.name}</span><span>{item.base_stat}</span></div>
					)}</div>					
					<img src={pokeball2} onClick={x.capture} className='pokeball' />
					<b><i>Click this pokeball to capture!</i></b>
				</div>
			</div>
			<div style={catched}>
				<section style={header}><h2>Captured Pokemon {capturedPoke.length}/6</h2></section>				
				{capturedPoke?(capturedPoke.map((poke,i) => 
					<div style={wrapper}>
						<h4 key={i} style={captured}>{poke.name}</h4>
						<img src={poke.sprites.front_default} style={img_style} />
					</div>
				)):('')}
		
			</div>

		</div>
	)

	}
	return (<div style={containerStyle}><div style={encounter}>
				<section style={header}><h2>Pokemon Encounters</h2></section>
				<div style={wrapper_1}>
										
				</div>
			</div><div style={catched}>
				<section style={header}><h2>Captured Pokemon {capturedPoke.length}/6</h2></section>				
				{capturedPoke?(capturedPoke.map((poke,i) => 
					<div style={wrapper}>
						<h4 key={i} style={captured}>{poke.name}</h4>
						<img src={poke.sprites.front_default} style={img_style} />
					</div>
				)):('')}
		
			</div></div>);

	// console.log(x.enc);
	
	
}


export default PokeEncounter;