import React from 'react';

import PokeLogo from './PokeLogo';
import PokeButton from './PokeButton';

const selectStyle = {
  margin: '0 8px',
  minWidth: '80px',
};

function PokeSelector({ handleChange, items, selectedItem }) {
  return (
    <select
      onChange={e => handleChange(e.target.value)}
      style={selectStyle}
      disabled={!items.length}
      value={selectedItem}
    >
      {items.map(item => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

const flexCenter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const styles = {
  backgroundColor: '#EF5350',
  padding: '8px',
  ...flexCenter,
};

function PokeHeader({
  loading,
  changeRegion,
  changeLocation,
  changeArea,
  selectedRegion,
  selectedLocation,
  selectedArea,
  exploreFn,
  hideExplore,
  regions = [],
  locations = [],
  areas = [],
}) {
  return (
    <header style={styles}>
      <PokeLogo />
      {
        hideExplore ?
        <span></span> : (
          <React.Fragment>
          <div style={flexCenter}>
            {loading ? (
              <img className="load" src="https://66.media.tumblr.com/c99a579db3ae0fc164bf4cca148885d3/tumblr_mjgv8kEuMg1s87n79o1_400.gif"/>
            ) : (
              <React.Fragment>
                <PokeSelector selectedItem={selectedRegion} handleChange={changeRegion} items={regions} />
                <PokeSelector selectedItem={selectedLocation} handleChange={changeLocation} items={locations} />
                <PokeSelector selectedItem={selectedArea} handleChange={changeArea} items={areas} />
              </React.Fragment>
            )}
          </div>
          <PokeButton explore={exploreFn}>Explore</PokeButton>
          </React.Fragment>
        )
      }
    </header>
  );
}

export default PokeHeader;
