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
  selectedRegion,
  selectedLocation,
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
              'Loading...'
            ) : (
              <React.Fragment>
                <PokeSelector selectedItem={selectedRegion} handleChange={changeRegion} items={regions} />
                <PokeSelector selectedItem={selectedLocation} handleChange={changeLocation} items={locations} />
                <PokeSelector items={areas} />
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
