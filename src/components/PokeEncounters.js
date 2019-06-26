import React from 'react';

 function PokePicker({items,img,id,handleCapture,}){
     return(
         <div className='found' id={id}>
             {
                 <React.Fragment>
                     <img src={img} alt='' className='ImgPokemon' id='ImgPokemon'/>
                     <h1 id='ImgPokemon1'>{items.name}</h1>
                     <button id="ImgPokemon-btn" className="explore-btn"
                    onClick={e => handleCapture(items)}>Capture</button>
                
                 </React.Fragment>
             }
         </div>
     )
 }



function PokeEncounters({encounter=[],pokemon_img=[],Capture,view}){
    return (
      
        <div className="encounter-container">
                <div className="textcontent-h3">
                    <div className="textcontainer">
                            <h3>encounter</h3>
                            <PokePicker id={'encounter'} img={pokemon_img} items={encounter}
                            handleCapture={Capture} toggleview={view}
                                
                               
                            />
                            
                    </div>
                </div>   
        </div>
 )
}
  


export default PokeEncounters;