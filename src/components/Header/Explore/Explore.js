import React from 'react';

import './../Header.css';

export default function Explore({onHover, offHover, red, pika, handleExplore}){
    return(
        <div 
            className="place-container" 
            id="explore"
            onMouseEnter={onHover}
            onMouseLeave={offHover}
            onClick={handleExplore}
        >
            <img src={ red } alt="" className="red-gif" />
            <img src={ pika } alt="" className="pikachu-gif"/>
        </div>
    )
}