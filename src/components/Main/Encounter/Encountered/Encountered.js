import React from 'react';

import '../../Main.css';

function Encountered( { pokemon, handleCapture, catchMouseEnter, catchMouseLeave, catched, stats, captured }){
    return(
        <React.Fragment>
            <div className="encounter">
            <div className="encounter-header">
                {captured}
            </div>
            <div className="encounter-content">
                <div id="wild-pokemon">
                    {pokemon.name}
                </div>
                <div id="wild-pokemon-image">
                    <img src={pokemon.pic} className="image wild-img"/>
                </div>
                <div 
                    id="catch"
                    onMouseEnter={catchMouseEnter} 
                    onMouseLeave={catchMouseLeave} 
                    onClick={handleCapture}
                >
                    <img className="image pokeball-catch" src={catched} alt="" />       
                </div>
            </div>
        </div>
        <div className="data">
            <div className="data-divider bordered">
                    <div id="hp">{'HP: '}</div>
                    <div id="attack">{'ATK: '}</div>
                    <div id="defense">{'BEF: '}</div>
                    <div id="sp-atk">{'SP-ATK: '}</div>
                    <div id="sp-def">{'SP-DEF: '}</div>
                    <div id="speed">{'SPD: '}</div>
            </div>
            <div className="data-divider bordered">
                <div id="type">{'Type: '}</div>
                <div id="ability">{'Ability/ies: '}</div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Encountered;