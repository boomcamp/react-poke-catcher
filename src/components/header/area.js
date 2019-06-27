import React  from 'react';
import styles from '../../css/PokeHeader.css';



export default function Areas(props){   
    return (
        <div>
        <select id="dropdownAreas"onChange={props.getExploreUrl} >
        {props.region.map((name) => (
          <option key={name.name} value={name.url}>
            {name.name}
          </option>
        ))}
      </select>
     
      </div>
        )
}