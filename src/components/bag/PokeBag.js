import React from 'react';
import styles from '../../css/PokeBag.css';
import Axios from 'axios';



class PokeBag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          
          }
    }
  
    render(props){
        return(
            <div className='PokeBag'>
            <h1>Bag</h1>
            {console.log(this.props.capturedPokemon)}
            {this.props.capturedPokemon ? this.props.capturedPokemon.map(name =>  <img src={name} height="100" width="100"></img> ): console.log('none')}
           
            
            </div>
        )
    
    }
}

export default PokeBag;