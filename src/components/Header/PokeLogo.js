import React from 'react';

const containerStyles = {
  maxHeight: '35px',
  maxWidth: '100px',
  overflow: 'hidden',
};

const imageStyles = {
  position: 'relative',
  top: '-33px',
  height: '100px',
}

function PokeLogo() {
  return (
    <div style={containerStyles}>
      <img
        style={imageStyles}
        alt="logo"
        src="https://boomcamp.github.io/poke-catcher/images/pokemon-logo.png"
      />
    </div>
  );
}

export default PokeLogo;
