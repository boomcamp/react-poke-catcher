import React from 'react';
import './App.css';

import axios from 'axios';
import PokeHeader from './components/PokeHeader';
import PokeEncounter from './components/PokeEncounter';
import { pokeApi } from './config/axiosConfig';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
      encounteredPokemon: {},
      captured: [],
      capture: null,
    };
  }

  componentDidMount() {
    pokeApi
      .get('region')
      .then(res => {
        return {
          regions: res.data.results,
        };
      })
      .then(customRes => {
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
        return pokeApi
          .get(`location-area/${customRes.areas[0].name}`)
          .then(res => {
            customRes.possibleEncounters = res.data.pokemon_encounters;
            return customRes;
          });
      })
      .then(customRes => {
        this.setState({
          regions: customRes.regions,
          locations: customRes.locations,
          areas: customRes.areas,
          possibleEncounters: customRes.possibleEncounters,
        });
      });
  }

  handleRegionChange = (name) => {
    pokeApi
      .get(`region/${name}`)
      .then(res => {
        this.setState({locations: res.data.locations})
        this.handleLocationChange(this.state.locations[0].name)
      })
  }

  handleLocationChange = (name) => {
    pokeApi
      .get(`location/${name}`)
      .then(res => {
        this.setState({areas: res.data.areas})
        if(this.state.areas.length !== 0){
          this.handleAreaChange(this.state.areas[0].name)
        }
      })
  }

  handleAreaChange = (name) => {
    pokeApi
      .get(`location-area/${name}`)
      .then(res => this.setState({ possibleEncounters: res.data.pokemon_encounters}))
  }

  handleExplore = () => {
   
    if(this.state.areas.length !== 0){
      this.setState({ capture: true})
      let i = Math.floor(Math.random() * this.state.possibleEncounters.length)
      var pokemon = {}
      pokemon.name = this.state.possibleEncounters[i].pokemon.name
      axios
        .get(this.state.possibleEncounters[i].pokemon.url)
        .then(res => {
          pokemon.pic = res.data.sprites.front_default
          pokemon.stats = res.data.stats
          this.setState({encounteredPokemon: pokemon})
        })
    }
  }

  handleCapture = () => {  
    if(this.state.captured.length < 6){
      this.setState({ captured: this.state.captured.concat(this.state.encounteredPokemon)})
      this.setState({ capture: false})
    }
  }

  searchPokemon = () => {
    
  }

  render() { 
    return (
      <React.Fragment>
        <PokeHeader
          regions={this.state.regions}
          locations={this.state.locations}
          changeRegion={this.handleRegionChange}
          changeLocation={this.handleLocationChange}
          changeArea={this.handleAreaChange}
          areas={this.state.areas}
          handleExplore={this.handleExplore}
          possibleEncounters={this.state.possibleEncounters}
        />

        <div className="panel">
            <p className="instruction"> Click the "pokeball" to start searching for Pokemon</p>
        </div>

        <PokeEncounter 
        encounteredPokemon={this.state.encounteredPokemon}
        />
        
      </React.Fragment>
    );
  }
}

export default App;