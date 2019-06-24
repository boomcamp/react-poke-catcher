import React from 'react';

const styles = {
  color: '#235df3',
  fontWeight: 'bold',
  width: '80px',
  height: '30px',
  backgroundColor: '#ffcd04',
  border: '3px solid #235df3',
  borderRadius: '3px',
  cursor: 'pointer',
}

function PokeButton(props) {
  return <button onClick={props.explore} style={styles}>{props.children}</button>
}

export default PokeButton;
