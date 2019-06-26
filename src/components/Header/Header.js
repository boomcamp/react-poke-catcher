import React, { Component } from 'react';

import mainLogo from '../../assets/images/logo-2.png';
import logo from '../../assets/images/logo.png';
import pokeball from '../../assets/images/pokeball.png';

import './Header.css';

export default class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      region : '',
      location : '',
      area : '',
    }
  }

  changeRegion = (value, handleChangeRegionFn) => {
    this.setState({
      region : value,
    })
    handleChangeRegionFn(value);
  }

  changeLocation = (value, area, handleChangeLocationFn, handleChangeAreaFn) => {
    this.setState({
      location : value,
    })
    handleChangeLocationFn(value);
    if (area.length > 1) {
      handleChangeAreaFn(area[0].name);
    }
  }

  changeArea = (value, handleChangeAreaFn) => {
    this.setState({
      area : value,
    })
    handleChangeAreaFn(value);
  }

  searchPokemon = (explorePokemonFn) => {
    explorePokemonFn();
  }

  render() {
    const { regions, locations, areas, handleChangeRegionFn, handleChangeLocationFn, handleChangeAreaFn, explorePokemonFn} = this.props;

    return (
      <header className="container">
      <div className="row">
          <div className="col-12 header">
            <div className="row">
              <div className="col-2 logo">
                  <img className="logo-2" src={mainLogo} alt="main logo"/>
                  <img className="img-logo" src={logo} alt="logo" />
              </div>
              <div className="col-10 head">
                  <label htmlFor="select-region" className="explore">Region :</label>
                  <select className="select-style region" id="select-region" value={this.state.region} onChange={e => this.changeRegion(e.target.value, handleChangeRegionFn)}>
                    {regions.map((regions, i) => (
                      <option key={i} value={regions.name}>{regions.name}</option>
                    ))}
                  </select>

                  <label htmlFor="select-location" className="explore">Location :</label>
                  <select className="select-style" id="select-location" value={this.state.location} 
                    onChange={e => this.changeLocation(
                      e.target.value, 
                      areas, 
                      handleChangeLocationFn, 
                      handleChangeAreaFn)
                    }>

                    {locations.map((location, i) => (
                      <option key={i} value={location.name}>{location.name}</option>
                    ))}
                  </select>

                  <label htmlFor="select-area" className="explore">Area :</label>
                  <select className="select-style" id="select-area" value={this.state.area} onChange={e => this.changeArea(e.target.value, handleChangeAreaFn)}>
                    {areas.map((area, i) => (
                      <option key={i} value={area.name}>{area.name}</option>
                    ))}
                  </select>

                  <img className="explore pokeball" src={pokeball} alt="pokeball" onClick={() => this.searchPokemon(explorePokemonFn)}/>
              </div>
            </div>
          </div>
      </div>
      </header>
    );
  }
}

