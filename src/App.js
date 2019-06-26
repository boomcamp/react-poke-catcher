import React from 'react';
import './App.css';

import PokeHeader from './components/header/PokeHeader';
import PokeEncounter from './components/encounter/PokeEncounter';
// import { pokeApi } from './config/PokeConfig'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
      theUrl: ''
    };
  
  }

  showEncounters(url){
    console.log('yeys' , url)
  }

  render() {
    return (
      <div>
      <PokeHeader showEncounters = {this.showEncounters}/>
      <h1>{this.state.theUrl}</h1>
      <PokeEncounter />
      </div>
      
    
      )
  }
}

export default App;
