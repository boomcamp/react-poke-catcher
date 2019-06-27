import React, { Component } from 'react';
import { pokeApi } from './config/axiosConfig';
import axios from 'axios';

import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

class App extends Component {
  constructor(){
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

  componentDidMount(){
    pokeApi
      .get('region')
      .then(results => {
        return {
          regions: results.data.results
        };
      })
      .then(customResult => {
        return pokeApi.get(`region/${customResult.regions[0].name}`)
        .then(results => {
          customResult.locations = results.data.locations;
          return customResult;
        });
      })
      .then(customResult => {
        return pokeApi
        .get(`location/${customResult.locations[0].name}`)
        .then(results => {
          customResult.areas = results.data.areas;
          return customResult;
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
      .then(customResult => {
        this.setState({
          loading: false,
          regions: customResult.regions,
          locations: customResult.locations,
          areas: customResult.areas,
          possibleEncounters: customResult.possibleEncounters
        });
      });
  }

  handleRegionChange = (name) => {
    pokeApi
      .get(`region/${name}`)
      .then(results => {
        this.setState({
          locations: results.data.locations
        })
        this.handleLocationChange(this.state.locations[0].name)
      })
  }

  handleLocationChange = (name) => {
    pokeApi
      .get(`location/${name}`)
      .then(results => {
        this.setState({
          areas: results.data.areas
        })
        this.handleAreaChange(this.state.areas[0].name)
      })
  }

  handleAreaChange = (name) => {
    pokeApi
      .get(`location-area/${name}`)
      .then(results => {
        this.setState({
          possibleEncounters: results.data.pokemon_encounters
        })
      })
  }

  handleExplore = () => {
    if(this.state.areas.length !== 0){
      this.setState({ capture: true})
      let i = Math.floor(Math.random() * this.state.possibleEncounters.length)
      var pokemon = {}
      pokemon.name = this.state.possibleEncounters[i].pokemon.name
      axios
        .get(this.state.possibleEncounters[i].pokemon.url)
        .then(results => {
          pokemon.pic = results.data.sprites.front_default
          pokemon.stats = results.data.stats
          this.setState({encounteredPokemon: pokemon})
        })
    }
  }

  handleCapture = () => {  
    if(this.state.captured.length < 6){
      this.setState({ captured: this.state.captured.concat(this.state.encounteredPokemon) })
      this.setState({ capture: false })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header 
          loading={this.state.loading}
          regions={this.state.regions}
          locations={this.state.locations}
          changeRegion={this.handleRegionChange}
          changeLocation={this.handleLocationChange}
          changeArea={this.handleAreaChange}
          areas={this.state.areas}
          handleExplore={this.handleExplore}
          possibleEncounters = {this.state.possibleEncounters}
        />
        <div className="info">
          <div className="info-content white-bold">
            Click the sprite to Explore
          </div>
        </div>
        <Main 
          encountered={this.state.encounteredPokemon}
          handleCapture={this.handleCapture}
          capture={this.state.capture}
          captured={this.state.captured}
        />
      </React.Fragment>
    )
  }
}

export default App;