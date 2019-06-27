import React  from 'react';
import styles from '../../css/PokeHeader.css';



export default function Regions(props){ 
    return (
        <div>
        <select id="dropdownRegions" onChange={props.regionUrl} >
          {props.region.map((name) => (
            <option key={name.name} id={name.name} value={name.url} selected=''>
              {name.name}
            </option>
          ))}
      </select>
      </div>
        )
}