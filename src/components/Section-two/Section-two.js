import React, { Component } from 'react';

import './Section-two.css';

export default class SectionTwo extends Component {
  render() {
    const { capturedPokemon } = this.props;

    return(
      <div className="col-12 section-two">
        <div className="row">
          <ul className="col-11 capture-list">
            {capturedPokemon.map((pokemon, i) => 
              (<li className="pokemon-item" key={i}><img className="pokemon-item-img" src={pokemon.img} alt="pokemon" /><p>{pokemon.name}</p></li>)
            )}
          </ul>
          <p className="col-1 max-capture">{capturedPokemon.length}/6</p>
        </div>
      </div>
    );
  }
}