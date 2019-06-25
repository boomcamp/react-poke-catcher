import React from 'react';
import './App.css';

import { pokeApi } from './config/axiosConfig';
import PokeHeader from './components/Header/PokeHeader';
import PokeMsg from './components/Message/PokeMsg';
import PokeFound from './components/FoundPokemon/PokeFound';
import PokeCaptured from './components/CapturedPokemon/PokeCaptured';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      hideExplore: false,
      regions: [],
      locations: [],
      areas: [],
      pokemon_encounters: [],
      pokemon_encounter: [],
      pokemonCaptured: [],
      pokeMsg: "Please press Explore button to search a Pokemon!",
    };
  }

  componentDidMount() {
    pokeApi
      .get('region')
      .then(res => { return { regions: res.data.results, }; })
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
            customRes.pokemon_encounters = res.data.pokemon_encounters;
            return customRes;
          }).catch(() => {
            customRes.pokemon_encounters = {};
            return customRes;
          });
      })
      .then(customRes => {
        this.setState({
          loading: false,
          regions: customRes.regions,
          locations: customRes.locations,
          areas: customRes.areas,
          pokemon_encounters: customRes.pokemon_encounters,
          selectedRegion: customRes.regions[0].name,
          selectedLocation: customRes.locations[0].name,
        });
      })
      .catch();
  }

  handleRegionChange = (name) => {
    this.setState({ 
      loading: true ,
      selectedRegion: name,
      pokemon_encounter: [],
    });

    pokeApi.get(`region/${name}`).then(res => {
      return { locations: res.data.locations };
    }).then(customRes => {
      return pokeApi
        .get(`location/${customRes.locations[0].name}`)
        .then(res => {
          customRes.areas = res.data.areas;
          return customRes;
        });
    }).then(customRes => {
      if(customRes.areas.length) return  pokeApi
        .get(`location-area/${customRes.areas[0].name}`)
        .then(res => {
          customRes.pokemon_encounters = res.data.pokemon_encounters;
          return customRes;
        })
      else{
        customRes.pokemon_encounters = {};
        return customRes;
      }
    }).then(customRes => {
      this.setState({
        loading: false,
        locations: customRes.locations,
        areas: customRes.areas,
        pokemon_encounters: customRes.pokemon_encounters,
        selectedLocation: customRes.locations[0].name,
        pokeMsg: "Please press Explore button to search a Pokemon!",
      });
    });
  }

  handleLocationChange = (name) => {
    this.setState({ 
      loading: true,
      selectedLocation: name,
      pokemon_encounter: [],
    });
    
    pokeApi.get(`location/${name}`)
        .then(res => { return { areas: res.data.areas };
    }).then(customRes => {
      if(customRes.areas.length) return  pokeApi
        .get(`location-area/${customRes.areas[0].name}`)
        .then(res => {
          customRes.pokemon_encounters = res.data.pokemon_encounters;
          return customRes;
        })
      else{
        customRes.pokemon_encounters = {};
        return customRes;
      }
    }).then(customRes => {
      this.setState({
        loading: false,
        areas: customRes.areas,
        pokemon_encounters: customRes.pokemon_encounters,
        pokeMsg: "Please press Explore button to search a Pokemon!",
      });
    });
  }

  explorePokemo = () => {
    let newMsg = "";
    const { pokemon_encounters } = this.state;
    if(pokemon_encounters.length){
      newMsg = "You found a Pokemon! Please press Capture button to get it.";
      const rand = Math.floor(Math.random() * (pokemon_encounters.length-1));
      pokeApi.get(`pokemon/${pokemon_encounters[rand].pokemon.name}`)
        .then(res => {
          this.setState({ pokemon_encounter: {
            name: res.data.species.name,
            img: res.data.sprites.front_default,
            stats: res.data.stats,
            types: res.data.types
          }});
        });
    }else{
      newMsg = "No Pokemon can be found in this area! Please Select a different location.";
    }
    this.setState({ pokeMsg: newMsg });
  }

  capturePokemon = () => {
    this.setState({
      pokemonCaptured: [...this.state.pokemonCaptured,this.state.pokemon_encounter],
      pokemon_encounter: [],
      pokeMsg: "Please press Explore button to search a Pokemon!",
    })

    if(this.state.pokemonCaptured.length === 5){
      this.setState({ 
        pokeMsg: "You Already have 6 Pokemons!",
        hideExplore: true,
      });
    }
  }

  releasePoke = () => {
    this.setState({ 
      pokemonCaptured: [], 
      hideExplore: false,
      pokeMsg: "Please press Explore button to search a Pokemon!",
    });
  }

  render() {
    return (
      <React.Fragment>
        <PokeHeader
          loading={this.state.loading}
          regions={this.state.regions}
          locations={this.state.locations}
          areas={this.state.areas}
          hideExplore={ this.state.hideExplore }
          selectedRegion={this.state.selectedRegion}
          selectedLocation={this.state.selectedLocation}

          changeRegion={this.handleRegionChange}
          changeLocation={this.handleLocationChange}
          exploreFn={this.explorePokemo}
        />
        <PokeMsg msg={this.state.pokeMsg}/>
        <PokeFound 
          poke={this.state.pokemon_encounter} 
          capture={this.capturePokemon}
          captured={ this.state.pokemonCaptured }
          release={this.releasePoke}
        />
        <PokeCaptured captured={ this.state.pokemonCaptured }/>
      </React.Fragment>
    );
  }
}

export default App;
