import React from 'react';

const styles = {
    color: '#235df3',
    fontWeight: 'bold',
    width: '80px',
    height: '30px',
    backgroundColor: '#ffcd04',
    border: '3px solid #235df3',
    borderRadius: '3px',
    cursor: 'pointer',
  }

export default function PokeFound(props){
    const {img, name, stats, types} = props.poke;
    return (
        <div className="pokeFound">
            {
            props.poke.length === 0 ?
            <div></div> :
            <div className="pokemon-encountered">
                <h3>You found...</h3>
                <h2>{name}<br/>
                    <span>( {types.map(type=>type.type.name).join("/")} )</span>
                </h2>
                <img src={img} alt={name}/>
                <br/>
                <button onClick={props.capture} style={styles}>Capture</button>
                <ul>{
                    stats.map(stat=>
                        <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                    )
                }</ul>
            </div>}
            {
            props.captured.length === 6 &&
            <div className="pokemon-encountered">
                <button onClick={props.release} className="release">Release Captured Pokemons</button>
            </div>
            }
        </div>
    );
}