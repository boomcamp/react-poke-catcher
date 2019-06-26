import React, { Component } from 'react';
import { pokeApi } from './config/axiosConfig';

import Header from './components/Header/Header';
import SectionOne from './components/Section-one/Section-one';
import SectionTwo from './components/Section-two/Section-two';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
      explore: false,
      exploredPokemon: {},
      capturedPokemon: [],
      capture: false,
      maxCapture: false,
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
          loading: false,
          regions: customRes.regions,
          locations: customRes.locations,
          areas: customRes.areas,
          possibleEncounters: customRes.possibleEncounters,
        });
      });
  }

  handleChangeRegion = (value) => {
    console.log(value);
    pokeApi.get(`region/${value}`).then(res => {
      this.setState({
        locations : res.data.locations
      })
     this.handleChangeLocation(res.data.locations[0].name);
    });
  }

  handleChangeLocation = (value) => {
    console.log(value);
    pokeApi.get(`location/${value}`).then(res => {
      this.setState({
        areas : res.data.areas
      })
      this.handleChangeArea(res.data.areas[0].name);
    });
  }

  handleChangeArea = (value) => {
    pokeApi.get(`location-area/${value}`)
      .then(res => {
        this.setState({
          possibleEncounters : res.data.pokemon_encounters
        })
    });
  }

  explorePokemon = () => {
    const pokemonEncountered = this.state.possibleEncounters;
    let randomNum = Math.floor(Math.random() * pokemonEncountered.length);
    pokeApi.get(pokemonEncountered[randomNum].pokemon.url)
      .then(res => {
        let exploredPokemon = {};
        exploredPokemon.type = res.data.types[0].type.name;
        exploredPokemon.name = res.data.species.name;
        exploredPokemon.img = res.data.sprites.front_default;
        exploredPokemon.stats = res.data.stats;
        this.setState({
          exploredPokemon : exploredPokemon
        })
    });
    this.setState({
      explore : true,
      capture: false,
    })
  }

  capturePokemon = (name, img) => {
    let capturedPokemon = {
      name: name,
      img: img,
    }

    if (this.state.capturedPokemon.length < 6) {
      this.setState({
        capturedPokemon : [...this.state.capturedPokemon, capturedPokemon],
      })
    } else{
      this.setState({
        maxCapture : true
      })
    }

    this.setState({
      explore: false,
      capture: !this.state.capture,
    })
  }

  render() {
    return (
    <React.Fragment>
      <Header
        regions = {this.state.regions}
        locations = {this.state.locations}
        areas = {this.state.areas}
        possibleEncounters = {this.state.possibleEncounters}
        handleChangeRegionFn = {this.handleChangeRegion}
        handleChangeLocationFn = {this.handleChangeLocation}
        handleChangeAreaFn = {this.handleChangeArea}
        explorePokemonFn = {this.explorePokemon}
      />
      <div className="container">
        <div className="row">
          <SectionOne 
            explore = {this.state.explore}
            exploredPokemon = {this.state.exploredPokemon}
            capture = {this.state.capture}
            capturePokemonFn = {this.capturePokemon}
            maxCapture = {this.state.maxCapture}
          />
        </div>
        <div className="row">
          <SectionTwo 
            capturedPokemon = {this.state.capturedPokemon}
          />
        </div>
      </div>
    </React.Fragment>
    );
  }
}