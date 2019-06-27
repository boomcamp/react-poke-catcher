import React from 'react';

import styles from '../../css/PokeHeader.css';
import Regions from './region';
import Areas from './area';
import Locations from './location';
import { pokeApi } from '../../config/PokeConfig'
import Axios from 'axios';


class PokeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: [],
      locations: [],
      areas: [],
      isLoaded: false,
      regionUrl: '',
      locationUrl: '',
      exploreUrl: '',
    }
    this.regionUrl = this.regionUrl.bind(this);
    this.locationUrl = this.locationUrl.bind(this);
    
  };

  componentDidMount(){
    pokeApi
    .get('region')
    .then(res => {
      console.log(res.data.results)
      this.setState({
        regions: res.data.results
      })
      })
     
  }

  showEncounter = (url) => {
    // Axios
    // .get(url)
    // .then(res => this.setState({
    //   areas: res.data.areas,
    // }))
    console.log(url)
    //PokeHeader.getTheUrl();
  }

  getExploreUrl = () =>{
    if(document.getElementById('dropdownAreas').value) {
      var getAreas = document.getElementById('dropdownAreas').value;
        this.setState({
          exploreUrl: getAreas
        }, () => {
          console.log(this.state.exploreUrl)
        })
    }
  }

  showAreas(url){
    Axios
    .get(url)
    .then(res => this.setState({
      areas: res.data.areas,
    }))
  }

  getAreasUrl = () =>{
    if(document.getElementById('dropdownLocations').value) {
      var getAreas = document.getElementById('dropdownLocations').value;
        this.setState({
          locationUrl: getAreas
        }, () => {
          this.showAreas(this.state.locationUrl)
        })
    }
  }
  
  locationUrl(url){
    Axios
    .get(url)
    .then(res => this.setState({
      locations: res.data.locations,
    }))
  }

  regionUrl(){
    var getLocations = document.getElementById('dropdownRegions').value;
    this.setState({
      regionUrl: getLocations
    }, () => {
      this.locationUrl(this.state.regionUrl)
    })
    
  }

  

  render(props) {
    return <div className='PokeHeader'>
        <h1>Pokomon</h1>
        <Regions region={this.state.regions} regionUrl = {this.regionUrl} value="hoenn" />
        <Locations region={this.state.locations} getAreasUrl = {this.getAreasUrl} />
        <Areas region={this.state.areas} getExploreUrl = {this.getExploreUrl} />
        
        <button onClick={() => { this.props.showEncounters(this.state.exploreUrl) }}>Explore</button>
    </div>;
  }
}

  
  export default PokeHeader;