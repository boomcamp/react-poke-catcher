import React from 'react';
import styles from '../../css/PokeEncounter.css';
import Axios from 'axios';



class PokeEncounter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           pokemonName: '',
           pokeSprite: '',
          }
    }
    render(){
        return(
            <div className='PokeEncounter'>
            <h1>ENCOUNTER</h1>
    
            {this.props.pokemon.pokemon 
            ? document.getElementById("p1").text = `${this.props.pokemon.pokemon.name}`
                : console.log('no')}
            
  
            <p id='p1'></p>
            
            <img src={this.props.pokeSpritePic} height="100" width="100"></img>
            </div>
        )
    }
}

export default PokeEncounter;