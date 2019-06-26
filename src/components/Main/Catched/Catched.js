import React, { Component } from 'react';

import '../Main.css';

export default class Catched extends Component{
    constructor(){
        super();

        this.state = {

        }
    }
    render() {
        const { catched } = this.props;
        return(
            <div className="divider-pokemons bordered">
                <div className="divider-header white-bold">
                    pokemons ({catched.length}/6)
                </div>
                <div className="catched">
                    {catched.map((pokemon, counter) => (
                        <div className="pokemon bordered empty" key={counter}>
                            <div className="pokeRelease">
                                <img src={require('../../img/owned-pokeball.gif')} className="image-catched release"/>
                            </div>
                            <div className="pokeImg">
                                <img src={pokemon.pic} className="image pokemon-catched" />
                            </div>
                            <div className="pokeName">
                                {pokemon.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}