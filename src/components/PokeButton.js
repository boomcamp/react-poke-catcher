import React from 'react';

const styles = {
  color: '#235df3',
  fontWeight: 'bold',
  width: '100px',
  height: '40px',
  backgroundColor: '#ffcd04',
  border: '3px solid #235df3',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '15px',
}

function PokeButton(props) {
  return <button style={styles} onClick={props.explore}>{
  	props.children}</button>
}

export default PokeButton;
