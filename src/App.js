import React from 'react';

import './App.css';
import './Btn-Explore.css';
import './Selectors.css';

import { pokeApi } from './config/config';
import Header from './components/Header';
import Context from './components/context';
import PokeEncounter from './components/PokeEncounter';
import Capturedpokemon from './components/Capturedpokemon';


class App extends React.Component {
  constructor (){
    super();

    this.state = {
      mainView: true,
      counter: 0,
      regions: [],
      locations: [],
      areas: [],
      possibleEncounter: [],
      encounter_pokemon: [],
      pokemon_img: [],
      capturedPokemons: [],
      pokemon_stats_speed: [],
      pokemon_stats_speed_basestats: [],
      pokemon_stats_Sdef: [],
      pokemon_stats_Sdef_basestats: [],
      pokemon_stats_SAttk: [],
      pokemon_stats_SAttk_basestats: [],
      pokemon_stats_def: [],
      pokemon_stats_def_basestats: [],
      pokemon_stats_attk: [],
      pokemon_stats_attk_basestats: [],
      pokemon_stats_hp: [],
      pokemon_stats_hp_basestats: [],
    }
  }

  componentDidMount(){
    pokeApi.get('region')
    .then(Response =>{
        //console.log(Response)
        return {
          regions: Response.data.results,
        }
    }).then (customResponse =>{
      //console.log(customResponse)
      return pokeApi.get(`region/${customResponse.regions[0].name}`).then( Response =>{
        customResponse.locations =Response.data.locations;
        return customResponse;
      })
    }).then (customResponse =>{
      //console.log(customResponse)
      return pokeApi.get(`location/${customResponse.locations[0].name}`).then (Response =>{
        customResponse.areas = Response.data.areas;
        return customResponse;
      })
    }).then (customResponse =>{
      //console.log(customResponse)
      return pokeApi.get(`location-area/${customResponse.areas[0].name}`).then(Response =>{
        customResponse.possibleEncounter = Response.data.pokemon_encounters;
        
        return customResponse;
      })
    }).then (customResponse =>{
      //console.log(customResponse)
      this.setState({
        regions: customResponse.regions,
        locations: customResponse.locations,
        areas: customResponse.areas,
        possibleEncounter: customResponse.possibleEncounter,
      })
    })
  }

  handleLocationChangeReg = (event)=>{
    this.setState({ mainView: true})

    //console.log(event)
    pokeApi.get(`region/${event}`).then(Response =>{
      //console.log(Response)
      this.setState({
        locations: Response.data.locations
      })

        //console.log(this.state.locations[0].name)
        pokeApi.get(`location/${this.state.locations[0].name}`).then(Response =>{
          //console.log(Response)
          this.setState({
            areas: Response.data.areas
          })

            if(!this.state.areas){
              pokeApi.get(`location-area/${this.state.areas[0].name}`).then(Response =>{
                this.setState({
                  possibleEncounter: Response.data.pokemon_encounters
                })
                //console.log(this.state.possibleEncounter)
                //console.log(this.state.areas[0].name)
              })
            }
        }); 
    });
    
  }

  handleLocationChangeLoc = (event)=>{
    this.setState({ mainView: true})

    pokeApi.get(`location/${event}`).then(Response =>{
      //console.log(Response)
      this.setState({
        areas: Response.data.areas
      })

       //console.log(this.state.areas)
      pokeApi.get(`location-area/${this.state.areas[0].name}`).then(Response =>{
        this.setState({
          possibleEncounter: Response.data.pokemon_encounters
        })
        //console.log(this.state.possibleEncounter)
        //console.log(this.state.areas[0].name)
      })
     
    }); 
  }

  handleLocationChangeArea = (event)=>{
    this.setState({ mainView: true})

    //console.log(event)
    pokeApi.get(`location-area/${event}`).then(Response =>{
      this.setState({
        possibleEncounter: Response.data.pokemon_encounters
      })
       //console.log(this.state.possibleEncounter)
       // console.log(this.state.areas[0].name)
    })
  }

  explore =()=> {
    //console.log(this.state.possibleEncounter)
    this.setState({ mainView: false})

    let random = Math.floor(Math.random()*this.state.possibleEncounter.length);
    let pokemon= this.state.possibleEncounter[random].pokemon.name;
    pokeApi.get(`pokemon/${pokemon}`).then(Response =>{
      this.setState({
        encounter_pokemon: Response.data,
        pokemon_img: Response.data.sprites.front_default,
        
        pokemon_stats_speed: Response.data.stats[0].stat.name,
        pokemon_stats_speed_basestats: Response.data.stats[0].base_stat,

        pokemon_stats_Sdef: Response.data.stats[1].stat.name,
        pokemon_stats_Sdef_basestats: Response.data.stats[1].base_stat,

        pokemon_stats_SAttk: Response.data.stats[2].stat.name,
        pokemon_stats_SAttk_basestats: Response.data.stats[2].base_stat,

        pokemon_stats_def: Response.data.stats[3].stat.name,
        pokemon_stats_def_basestats: Response.data.stats[3].base_stat,

        pokemon_stats_attk: Response.data.stats[4].stat.name,
        pokemon_stats_attk_basestats: Response.data.stats[4].base_stat,

        pokemon_stats_hp: Response.data.stats[5].stat.name,
        pokemon_stats_hp_basestats: Response.data.stats[5].base_stat,

      })
      //console.log(this.state.encounter_pokemon)
      //console.log(this.state.pokemon_stats_speed)
     // console.log(this.state.pokemon_stats_speed_basestats)
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
        <Header regions={this.state.regions}
        locations={this.state.locations}
        areas={this.state.areas} 
        changeLocationReg={this.handleLocationChangeReg}
        changeLocationLoc={this.handleLocationChangeLoc}
        changeLocationArea={this.handleLocationChangeArea}
        //possibleEncounter={this.state.possibleEncounter} 
        handleExplore={this.explore}
        
        />
        <Context />
        <div className="body-container">
          <PokeEncounter encounter_pokemon={this.state.encounter_pokemon}
                         pokemon_img={this.state.pokemon_img}

                         pokemon_stats_speed={this.state.pokemon_stats_speed}
                         pokemon_stats_speed_basestats={this.state.pokemon_stats_speed_basestats}
                         
                         pokemon_stats_Sdef={this.state.pokemon_stats_Sdef}
                         pokemon_stats_Sdef_basestats={this.state.pokemon_stats_Sdef_basestats}

                         pokemon_stats_SAttk={this.state.pokemon_stats_SAttk}
                         pokemon_stats_SAttk_basestats={this.state.pokemon_stats_SAttk_basestats}

                         pokemon_stats_def={this.state.pokemon_stats_def}
                         pokemon_stats_def_basestats={this.state.pokemon_stats_def_basestats}

                         pokemon_stats_attk={this.state.pokemon_stats_attk}
                         pokemon_stats_attk_basestats={this.state.pokemon_stats_attk_basestats}

                         pokemon_stats_hp={this.state.pokemon_stats_hp}
                         pokemon_stats_hp_basestats={this.state.pokemon_stats_hp_basestats}
              Capture={this.handleCapturePokemon}
              view={this.state.mainView}
          />
          <Capturedpokemon  
                  capturedPokemons={this.state.capturedPokemons}
          />
        </div>
        
        </React.Fragment>
        
    );
  }
    
  
}

export default App;
