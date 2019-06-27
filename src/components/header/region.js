import React  from 'react';
import styles from '../../css/PokeHeader.css';



export default function Regions(props){ 
  //function selectFirst(){
    // if(!document.getElementById('dropdownRegions')) {
    //   console.log('empty')
    // }
    // else{
    //   console.log('not empty');
    //   //console.log(document.getElementById('dropdownRegions').innerHTML)
    //   
     
    // }
    //   var val = 'kanto';    
    //   return document.querySelector('#dropdownRegions [value="' + val + '"]') !== null? document.querySelector('#dropdownRegions [value="' + val + '"]').selected =  true: null;
    // }  
    return (
        <div>
        <select id="dropdownRegions" onChange={props.regionUrl} >
          {/* <option >{props.region.results}</option> */}
          {props.region.map((name) => (
            <option key={name.name} id={name.name} value={name.url} selected=''>
              {name.name}
            </option>
          ))}
      </select>
      {/* {console.log(props.region[0])}
      {selectFirst()} */}
      </div>
        )
}