import React from 'react';
import './App.css';

import { pokeApi } from './config/axiosConfig';
import PokeHeader from './components/PokeHeader';
import PokeEncounters from './components/PokeEncounters';
import Captured from './components/Captured';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
      encounter:[],
      capturedPokemons: [],
    };
  }

  componentDidMount(){
    pokeApi
      .get('region')
      .then(res => {
       
        return {
          regions: res.data.results,
        };
      })
      .then(customRes =>{
        return pokeApi.get(`region/${customRes.regions[0].name}`).then(res => {
          customRes.locations = res.data.locations;
          return customRes;
        });
      })
      .then(customRes => {
        return pokeApi
          .get(`location/${customRes.locations[0].name}`)
          .then(res => {
            customRes.areas = res.data.areas;
            return customRes;
          });
      })
      .then(customRes => {
        //console.log(customRes)
        return pokeApi
          .get(`location-area/${customRes.areas[0].name}`)
          .then(res => {
            customRes.possibleEncounters = res.data.pokemon_encounters;
            return customRes;
          });
      })
      .then(customRes => {
        this.setState({
          loading: false,
          regions: customRes.regions,
          locations: customRes.locations,
          areas: customRes.areas,
          possibleEncounters: customRes.possibleEncounters,
        });
      });
  }

  handleLocationChange = (name) => {console.log(name)
    pokeApi.get(`region/${name}`).then (res =>{//console.log(res)
      this.setState({
        locations:res.data.locations
      })
      pokeApi.get(`location/${this.state.locations[0].name}`).then(res=>{//console.log(this.state.locations[0].name)
        this.setState({
          areas:res.data.areas
        })
      })
    })
    
  }

  handleAreaChange=(name)=>{
    pokeApi.get(`location/${name}`).then (res =>{console.log(res)
      this.setState({
        areas:res.data.areas
      })
      
    })
  }

handleAreaLocChange=(name)=>{
  pokeApi.get(`location-area/${name}`).then (res =>{console.log(res)
    this.setState({
      possibleEncounters:res.data.pokemon_encounters
    })
    
  })
  
}

explorebutton=()=>{
  var ran_pokemon = Math.floor(Math.random()*this.state.possibleEncounters.length);
  let pokemon_name=this.state.possibleEncounters[ran_pokemon].pokemon.name;
  pokeApi.get(`pokemon/${pokemon_name}`).then (res=>{
    this.setState({
      encounter:res.data,
      pokemon_img:res.data.sprites.front_default,
      
    })
   console.log(this.state.encounter)
  })
}



handleCapturePokemon =(event) =>{

  this.setState({ mainView: !this.state.mainView})
  //console.log(event)
  
  if(this.state.capturedPokemons.length <6){
    this.setState({
      capturedPokemons: [...this.state.capturedPokemons,event],
    })
    console.log(this.state.capturedPokemons.length)
  } else{
    console.log("no more")
  }
  

}

  render() {
    return (
      <React.Fragment>
      <PokeHeader
        loading={this.state.loading}
        regions={this.state.regions}
        locations={this.state.locations}
        areas={this.state.areas}
        changeLocation={this.handleLocationChange}
        changeArea={this.handleAreaChange}
        changeAreaLoc={this.handleAreaLocChange}
        //possibleEncounters={this.handleAreaChange}
        explore={this.explorebutton}
        
      />
      <PokeEncounters 
      encounter={this.state.encounter}
      pokemon_img={this.state.pokemon_img}
      Capture={this.handleCapturePokemon}
      view={this.state.mainView}
      />

    <Captured 
     capturedPokemons={this.state.capturedPokemons}
          

      />
    </React.Fragment> 
    );
    
  }
  
}


export default App;
