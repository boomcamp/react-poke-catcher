import React from 'react';

import PokeLogo from './PokeLogo';
import PokeButton from './PokeButton';
import PokeEncounter from './PokeEncounter';
import '../App.css';

function PokeSelector({ handleChange, items, type}) {
 
  return (
    <select
      onChange={e => handleChange(e.target)}      
      disabled={!items.length}
      className='type'
      id={type}
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
  padding: '20px',
  ...flexCenter,
};

function PokeHeader({
  loading,
  regions = [],
  locations = [],
  changeRegion,
  changeLocation,
  areas = [],
  encounters = [],
  specificPoke = {},
  capturePok,
  ShowPoke,
  captured = [],
}) {
  return (
    <div>
    <header style={styles}>
      <PokeLogo />
      <div style={flexCenter}>
        {loading ? (
          'Loading...'
        ) : (
          <React.Fragment>
            <PokeSelector handleChange={changeLocation} items={regions} type='reg' enc={encounters} />
            <PokeSelector handleChange={changeLocation} items={locations} type='loc' enc={encounters} />
            <PokeSelector handleChange={changeLocation} items={areas} type='area' />
          </React.Fragment>
        )}
      </div>
      <PokeButton explore={ShowPoke}>Explore</PokeButton>
    </header>    
    <PokeEncounter enc={specificPoke} capture={capturePok} captured={captured}></PokeEncounter>
    </div>
  );
}


export default PokeHeader;
