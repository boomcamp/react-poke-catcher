import React from 'react';

export default function PokeEncounter(props) {
    return (
        <React.Fragment>
        <div className="row">
            <div className="column">
              <div className="encounter-column">
                <div className="title">Encounter</div>
                <div className="pokemon">
                    <p className="subtitle">You found A:</p>
                    <span className="note"></span>
                    <div className="align-center">
                        <p className="name">{props.encounteredPokemon.name}</p>
                        <img src={props.encounteredPokemon.pic} alt="" className="poke-pic" height="185" width="175" />
                        <img src="https://media.giphy.com/media/JgCZ2hksM1abS/giphy.gif" onclick={() => props.handleCapture} alt="" className="capture" heigth="55" width="55" />
                    </div>
                </div>
                    <p className="subtitle ">Details:</p>
                    {props.encounteredPokemon.stats &&
                      <ul className="details hide">
                       <li>speed: {props.encounteredPokemon.stats[0].base_stat}</li>
                        <li>special-defense: {props.encounteredPokemon.stats[1].base_stat}</li>
                        <li>special-attack: {props.encounteredPokemon.stats[2].base_stat}</li>
                        <li>defense: {props.encounteredPokemon.stats[3].base_stat}</li>
                        <li>attack: {props.encounteredPokemon.stats[4].base_stat}</li>
                        <li>hp: {props.encounteredPokemon.stats[5].base_stat}</li>
                      </ul>
                    }
                    
              </div>
            </div>

            <div className="column">
              <div className="capture-column">
                <div className="title-1">Pokemons <span id="counter">0</span>/6</div>
                <div className="catch">
                    
                    
                </div>
              </div>
            </div>
        </div>
        </React.Fragment>
    )
}