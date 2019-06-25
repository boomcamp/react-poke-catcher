import React from 'react';

export default function PokeCaptured(props){
  return (
    <div className="pokeCaptured">
      { props.captured.length > 0 ?
      (<div className="pokemons">{
        props.captured.map(poke=>{
          const {name, img} = poke;
          return (<div key={props.captured.indexOf(poke)}>
            <h4>{name}</h4>
            <img src={img} alt={name}/>
          </div>)
        })
      }</div>)
      : <div></div>}
    </div>
  );
}