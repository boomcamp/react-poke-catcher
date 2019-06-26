import React, { Component } from 'react';

import ash from '../../assets/images/ash.png';
import pokeball from '../../assets/images/pokeball.png';
import shadow from '../../assets/images/shadow.png';

import './Section-one.css';

export default class SectionOne extends Component {
  capture = (capturePokemonFn, name, img, ) => {
    capturePokemonFn(name, img);
  }

  render() {
    let { explore, exploredPokemon, capture, capturePokemonFn, maxCapture} = this.props;
    return (
      <div className="col-12 section-one battlefield">
        <div className="row">
          {explore ? 
            (<div className="col-8 pokemon">
              <img className="pokemon-img" src={exploredPokemon.img} alt="pokemon" />
              <img className="shadow" src={shadow} alt="shadow" />

              <div className="lifebar">
                <label className="pokemon-label pokemon-name">{exploredPokemon.name}</label>
                <label className="pokemon-label pokemon-hp">{exploredPokemon.stats !== undefined ? exploredPokemon.stats[5].base_stat : ''}</label>
              </div>
              </div>)
            : ""
          }
        </div>

        <div className="row ash">
          <div className="col-5" id="ash">
            <img className="ash-img" src={ash} alt="ash"></img>
            <img className={explore ? "capture-ball show" : "capture-ball hide"} src={pokeball} alt="pokeball" onClick={() => this.capture(capturePokemonFn, exploredPokemon.name, exploredPokemon.img)}></img>

            <div className={capture ? "hide" : "box intro-box show"}>
                <label className="details">Catch Pokemon Now!</label>
            </div>

            <div className={capture ? "box intro-box captured show" : "box intro-box captured hide"}>
                <label className="details">{maxCapture ? "Ohh noo, no more space!" : "Yeah, you captured it!"}</label>
            </div>
        </div>

        <div className="col-7">
          <div className={explore ? "box show" : "box hide"}>
            <label className="details">STATS</label><br></br>
            <ul className="statsList">
              {exploredPokemon.stats !== undefined ? 
                exploredPokemon.stats.map((stat, i) => 
                  (stat.stat.name !== 'hp' ? (<li key={i}>{stat.stat.name} : {stat.base_stat}</li>) : '')
                )
              : ''}
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
  }
}