import React from 'react';
import './App.css';

import PokeHeader from './components/header/PokeHeader';
import PokeEncounter from './components/encounter/PokeEncounter';
import PokeStats from './components/stats/PokeStats';
import Axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      pokemon: '',
      encounterUrl: '',
      pokeSprite: '',
      pokeSpritePic: 'https://via.placeholder.com/150',
      pokeStats:'',
    };
  
  }
  showSprite = (url) => {
      Axios
      .get(url)
      .then(res => {this.setState({
        pokeSpritePic : res.data.sprites.front_default,
        pokeStats:res.data.stats,
      })})
  }
  
  showEncounters = (url) =>{ 
    this.setState({
      encounterUrl: url
    }, () => {
      console.log(this.state.encounterUrl)
      this.getRandPokemon()
     
    })
  }

  getRandPokemon(){
    Axios
    .get(this.state.encounterUrl)
    .then(res => {
      var randPokemon = Math.floor(Math.random() * Math.floor(res.data.pokemon_encounters.length))
      this.setState({
        pokemon: res.data.pokemon_encounters[randPokemon],
        pokeSprite: res.data.pokemon_encounters[randPokemon].pokemon.url,
       
      },
    () => {
        console.log("GETRANDPOKEMON")
        console.log(this.state.pokemon);
        console.log('yayayayay',this.state.pokeSprite)
        this.showSprite(this.state.pokeSprite)
        
    }
    )
    })

    return this.state.pokemon
}
  render() {
    return (
      <div>
      <PokeHeader showEncounters = {this.showEncounters}/>
      <h1>{this.state.theUrl}</h1>
      <PokeEncounter pokemon = {this.state.pokemon}  pokeSpritePic = {this.state.pokeSpritePic}/>
      <PokeStats pokeStats = {this.state.pokeStats}/>
      </div>
     
      
    
      )
  }
}

export default App;
