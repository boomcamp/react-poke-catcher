import React from 'react';
import styles from '../../css/PokeStats.css';
import Axios from 'axios';



class PokeStats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           pokemonName: '',
           pokeSprite: '',
          }
    }
    showStats(){
       
    }
    render(props){
        return(
            <div className='PokeStats'>
            <h1>Stats</h1>
            {/* {props.pokeStats ? 
            
            : console.log('s')
          ))} */}
           {this.props.pokeStats ? this.props.pokeStats.map(name => <h2>{name.stat.name} : {name.base_stat}</h2>): console.log('none')}
            
            </div>
        )
    
    }
}

export default PokeStats;