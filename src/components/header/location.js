import React  from 'react';
import styles from '../../css/PokeHeader.css';



export default function Locations(props){
    return (
        <div>
        <select id="dropdownLocations" onChange={props.getAreasUrl}>
        {props.region.map((name) => (
          <option key={name.name} value={name.url}>
            {name.name}
          </option>
        ))}
      </select>
     
      </div>
        )
}