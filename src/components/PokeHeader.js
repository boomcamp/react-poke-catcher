import React from 'react';

import Pokeball from './Pokeball';

function Pokeselector({ handleChange, items }) {
  return (
    <select
      onChange={e => handleChange(e.target.value)}
      style={dropdown}
      disabled={!items.length}
    >
      {items.map(item => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

const dropdown = {
    border: '1px solid gray',
    borderRadius: '6px',
    padding: '10px 30px 10px 20px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    margin: '0 25px 0 25px',

}

const header = {
  backgroundColor: '#2f7ce4',
  padding: '9px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function Header({regions = [], locations = [], areas = [],changeRegion, changeLocation, changeArea, handleExplore, possibleEncounters}) {
  
  return (
    <header style={header}>
      <img src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG3.png" alt="logo" height="50" width="115" />

      <Pokeselector handleChange={changeRegion} items={regions} />
      <Pokeselector handleChange={changeLocation} items={locations} />
      <Pokeselector handleChange={changeArea} items={areas} />

     <Pokeball possibleEncounters={possibleEncounters}handleExplore={handleExplore} />
    </header>
  );
}

export default Header;
