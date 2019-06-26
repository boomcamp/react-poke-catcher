import React from 'react';

import ButtonExplore from './Button';

function SelectorReg ({handleChange,items, id}){
    return (
        <select onChange={e => handleChange(e.target.value)}
        disabled={!items.length} className="selection-design" id={id}>
        {
            
            items.map(item =>(
                <option key={item.name} value={item.name}>
                 {item.name}
                </option>
            ))
        }
        </select>
    );
}

function SelectorLoc ({handleChange,items, id}){
    return (
        <select onChange={e => handleChange(e.target.value)}
        disabled={!items.length} className="selection-design" id={id}>
        {
            
            items.map(item =>(
                <option key={item.name} value={item.name}>
                 {item.name}
                </option>
            ))
        }
        </select>
    );
}
function SelectorArea ({handleChange,items, id}){
    return (
        <select onChange={e => handleChange(e.target.value)}
        disabled={!items.length} className="selection-design" id={id}>
        {
            
            items.map(item =>(
                <option key={item.name} value={item.name}>
                 {item.name}
                </option>
            ))
        }
        </select>
    );
}


function Header ({regions=[],locations=[],areas=[],
                changeLocationReg,changeLocationLoc,changeLocationArea,handleExplore,}){
    
   // console.log(regions)
    return (
        <div className="logo-container">

            <div className="logo-box">
                <img src={ require("../images/Pok-Catcher.png")} alt="logo" className="logo" />
            </div>

            <div className="nav-box">
                <div className="region-container">
                <SelectorReg  id={"region"} items={regions} handleChange={changeLocationReg}/>
                </div>
                <div className="location-container">
                <SelectorLoc id={"location"} items={locations} handleChange={changeLocationLoc}/>
                </div>
                <div className="area-container">
                <SelectorArea id={"area"} items={areas} handleChange={changeLocationArea}/>
                </div>
                <div className="area-container">
                    <ButtonExplore explorehandle={handleExplore} 
                            > 
                            Explore 
                    </ButtonExplore>
                </div>
            </div>
        </div>
        
    );
}

export default Header;