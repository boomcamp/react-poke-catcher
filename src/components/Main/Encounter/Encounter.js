import React, { Component } from 'react';

import '../Main.css';

import Encountered from './Encountered/Encountered';
import Blank from './Blank/Blank';

export default class Encounter extends Component{
    constructor(){
        super();

        this.state = {
            catch: require('./../../img/catch-static.gif'),
            encountered: {}
        }

        this.catchMouseEnter = this.catchMouseEnter.bind(this);
        this.catchMouseLeave = this.catchMouseLeave.bind(this);
    }

    catchMouseEnter(){
        this.setState({
            catch: require('./../../img/catch-pokeball.gif')
        });
    }

    catchMouseLeave(){
        this.setState({
            catch: require('./../../img/catch-static.gif')
        });
    }

    render() {
        const { pokemon, handleCapture, capture} = this.props;
        return (
            <div className="divider-encounter bordered">
                <div className="divider-header white-bold">
                    encounter
                </div>  
                
                { capture === true ?
                <Encountered 
                    pokemon = {pokemon}
                    handleCapture = {handleCapture}
                    catchMouseEnter = {this.catchMouseEnter}
                    catchMouseLeave = {this.catchMouseLeave}
                    catched = {this.state.catch}
                    stats = {pokemon.stats}
                    captured = 'You Found a: '
                />
                : capture === false? 
                <Blank  
                    captured = {'Captured '+pokemon.name+', explore to find more'}
                />
                :
                <Blank 
                    captured = ''
                />    
                }
            </div>
        )
    }
}