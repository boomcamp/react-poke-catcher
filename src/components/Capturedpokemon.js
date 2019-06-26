import React from 'react';

function Number({items}){
    let count=0;
    console.log(items)
    return (
            <React.Fragment>
            <div className="captured-box">
                    <h1>my pokemons  <span> {items.length} / 6</span></h1>
            </div>
            <div className="capturedlist-box">
                {
                    items.map(item =>(
                        
                        <React.Fragment>
                        <div className="capturedlist-item">
                        <img key={count++} src={item.sprites.front_default} alt="" className=""/>
                        <p key={count++}>{item.name}</p>
                        </div>
                        </React.Fragment>
                    ))
                }
            </div>
            </React.Fragment>

    )
}

function Capturedpokemon ({capturedPokemons=[],}){
    return (
            <div className="captured-container">
            <Number items={capturedPokemons}/>
            </div>
    );
}
export default Capturedpokemon;