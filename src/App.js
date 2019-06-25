import React from 'react';
import './App.css';

import { pokeApi } from './config/axiosConfig';
import PokeHeader from './components/PokeHeader';
// import PokemonEncounter from './components/PokemonEncounter';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
      specificPoke:{},
      capturedPoke:[],
      capMsg:''
    };
    this.display = this.display.bind(this);
    this.capture = this.capture.bind(this);
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

  genRandom(nth){
    return  Math.floor((Math.random() * nth));
  }

  showDetails(obj){
    if(obj){
    var pokemon = (obj['pokemon']['name']);
    pokeApi
      .get('pokemon/'+pokemon)
      .then(res => res.data )
      .then(data => {this.setState({specificPoke:data,captureMsg:''})
      });
    console.log(this.state);
    }

  } 



  display() {
    var posPoke = this.state.possibleEncounters;
    if(posPoke) {
    var rand = this.genRandom(posPoke.length); 
    this.showDetails(posPoke[rand])
    }

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
        console.log(this.state);
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

  capture() {
    var current = this.state.capturedPoke.length;
    if(current<6) {
    this.setState({
      capturedPoke:this.state.capturedPoke.concat(this.state.specificPoke),
      captureMsg:'You captured '+this.state.specificPoke.name,
      specificPoke:[],

    })
    } else {
      alert('Storage is full');
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
        specificPoke={this.state.specificPoke}
        capturePoke={this.capture}
        captured={this.state.capturedPoke}
        captureMsg={this.state.captureMsg}
      />
      </div>
    );
  }
}

export default App;
