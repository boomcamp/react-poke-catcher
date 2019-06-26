import React from 'react';
import './App.css';

import { pokeApi } from './config/axiosConfig';
import PokeHeader from './components/PokeHeader';
import PokeEncounter from './components/PokeEncounter';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounters: [],
      specificPoke: {},
      capturePoke: [],
    };
    this.ShowPoke = this.ShowPoke.bind(this);
    this.Capture = this.Capture.bind(this);
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

  handleLocationChange = (obj) => {
    console.log(this.state.specificPoke);
    this.setState({specificPoke: {}})
    var name = obj.value;
    var type = obj.id;
    if (type=='reg') {
      pokeApi
      .get('region')
      .then(res => {
        return {
          regions: res.data.results,
        };
      })
      .then(customRes => {
        return pokeApi.get('region/'+name).then(res => {
          customRes.locations = res.data.locations;
          return customRes;
        });
      })
      .then(customRes => {
        return pokeApi
          .get('location/'+customRes.locations[0].name)
          .then(res => {
            customRes.areas = res.data.areas;
            return customRes;
          });
      })
      .then(customRes => {
        if(customRes.areas.length){
        return pokeApi
          .get('location-area/'+customRes.areas[0].name)
          .then(res => {
            customRes.possibleEncounters = res.data.pokemon_encounters;
            return customRes;
          });
        }else{
          return pokeApi
          .get('location-area/')
          .then(res => {
            customRes.possibleEncounters = res.data.pokemon_encounters;
            return customRes;
          });
        }
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
    }else if(type=='loc'){
      pokeApi.get('location').then(res => {
        return { locations: res.data.results, };
      }).then(customRes => {
        return pokeApi.get('location/'+obj.value).then(res => {
          customRes.areas = res.data.areas;
          return customRes;
        })

      }).then(customRes => {
        if(customRes.areas.length){
           return pokeApi
          .get('location-area/'+customRes.areas[0].name)
          .then(res => {
            customRes.possibleEncounters = res.data.pokemon_encounters;
            return customRes;
          });
        }else{
           return pokeApi
          .get('location-area/')
          .then(res => {
            customRes.possibleEncounters = res.data.pokemon_encounters;
            return customRes;
          });
        }       
      })
      .then(customRes => {
        this.setState({
          loading: false,          
          areas: customRes.areas,
          possibleEncounters: customRes.possibleEncounters,
        });        
      }); 
    }else{

    } 
         
  }
  ShowPoke() {
    
  if(this.state.possibleEncounters != undefined){
    var x = this.state.possibleEncounters.length;
    var y = Math.floor((Math.random() * x));

    x = this.state.possibleEncounters[y];

    pokeApi.get('pokemon/'+x.pokemon.name).then(res => this.setState({specificPoke:res.data}))
    }else{
     alert('No possible encounter, try searching other locations');
    } 
}

 Capture() {
   if(this.state.capturePoke.length<6){
     this.setState({capturePoke:this.state.capturePoke.concat(this.state.specificPoke)});
      // this.setState({specificPoke: {}})
      // console.log(this.state.specificPoke);
   }else{alert('Inventory Full!')}
    // console.log(this.state.capturePoke);  
 }


  render() {
   
    return (
      <PokeHeader
        loading={this.state.loading}
        regions={this.state.regions}
        locations={this.state.locations}
        specificPoke={this.state.specificPoke}
        changeLocation={this.handleLocationChange}
        areas={this.state.areas}
        ShowPoke = {this.ShowPoke}
        capturePok = {this.Capture}
        captured = {this.state.capturePoke}
      />
    );
  }
}

export default App;
