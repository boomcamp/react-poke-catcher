import React from 'react';
import './App.css';

import { pokeApi } from './config/axiosConfig';
import PokeHeader from './components/PokeHeader';
import PokemonEncounter from './components/PokemonEncounter';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
    };
    this.display = this.display.bind(this);
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
  display() {
    console.log(this.state);
  }
  handleLocationChange = (elem) => {
     const category = elem.className;
     const value = elem.value;
     if(category === 'region') {
           pokeApi
          .get('region')
          .then(res => {
            return {
              regions: res.data.results,
            };
          })
          .then(customRes => {
            return pokeApi.get(`region/${value}`).then(res => {
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
            if(customRes.areas.length>0) {
            return pokeApi
              .get(`location-area/${customRes.areas[0].name}`)
              .then(res => {
                customRes.possibleEncounters = (res.data.pokemon_encounters)?res.data.pokemon_encounters:[];
                return customRes;
              }); 
            } else {
           
              return customRes; }
          })
          .then(customRes => {
  
            this.setState({
              loading: false,
              regions: customRes.regions,
              locations: customRes.locations,
              possibleEncounters:customRes.possibleEncounters,
              areas: customRes.areas,
            });
          });

     }
     else if(category === 'location') {
      pokeApi
        .get('location/'+value)
        .then(customRes => {
          customRes.areas = customRes.data.areas;
          return customRes;
        })
        .then(customRes => {
          if(customRes.areas.length > 0) {
          return pokeApi
          .get('location-area/'+customRes.areas[0].name)
          .then(res => { 
            customRes.possibleEncounters = (res.data.pokemon_encounters)?res.data.pokemon_encounters:[];
            return customRes;
            });
        } else {
          return customRes;
        } 

        }).then(customRes => {
  
            this.setState({
              loading: false,
              possibleEncounters:customRes.possibleEncounters,
              areas: customRes.areas,
            });
          });
     }
     else if(category === 'areas') {
      pokeApi
        .get('location-area'+value)
        .then(customRes => {
          this.setState({
            possibleEncounters:customRes.data.pokemon_encounters

          });
          return customRes;
        })
     }

  }

  render() {
    return (
      <div>
      <PokeHeader
        loading={this.state.loading}
        regions={this.state.regions}
        locations={this.state.locations}
        changeLocation={this.handleLocationChange}
        areas={this.state.areas}
        showPokemons={this.display}
      />
      <PokemonEncounter pokemon={this.state.possibleEncounters}/>
      </div>
    );
  }
}

export default App;
