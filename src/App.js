import React from 'react';
import './App.css';

import { pokeApi } from './config/axiosConfig';
import PokeHeader from './components/Header/PokeHeader';
import PokeMsg from './components/Message/PokeMsg';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      pokemon_encounters: [],
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
      });
  }

  handleRegionChange = (name) => {
    this.setState({ 
      loading: true ,
      selectedRegion: name,
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
    })
    .then(customRes => {
      return pokeApi
        .get(`location-area/${customRes.areas[0].name}`)
        .then(res => {
          customRes.pokemon_encounters = res.data.pokemon_encounters;
          return customRes;
        });
    })
    .then(customRes => {
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
    });
    
    pokeApi.get(`location/${name}`)
        .then(res => { return { areas: res.data.areas };
    }).then(customRes => {
      return pokeApi
        .get(`location-area/${customRes.areas[0].name}`)
        .then(res => {
          customRes.pokemon_encounters = res.data.pokemon_encounters;
          return customRes;
        });
    })
    .then(customRes => {
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
    if(this.state.pokemon_encounters.length){
      newMsg = "You found a Pokemon! Please press Capture button to get it.";
    }else{
      newMsg = "No Pokemon can be found in this area!Message/PokeMs Please Select a different location.";
    }
    this.setState({ pokeMsg: newMsg });
  }

  render() {
    return (
      <React.Fragment>
        <PokeHeader
          loading={this.state.loading}
          regions={this.state.regions}
          locations={this.state.locations}
          changeRegion={this.handleRegionChange}
          changeLocation={this.handleLocationChange}
          selectedRegion={this.state.selectedRegion}
          selectedLocation={this.state.selectedLocation}
          areas={this.state.areas}

          exploreFn={this.explorePokemo}
        />
        <PokeMsg msg={this.state.pokeMsg} />
      </React.Fragment>
    );
  }
}

export default App;
