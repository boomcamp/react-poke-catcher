import React from 'react';

 function Count({items}){
     let count=0;
     console.log(items)

     return(
         
            
                 <React.Fragment>
                     <div className='captured-box'>
                         <h1>Captured pokemons <span>{items.length}/6</span></h1>
                     </div>
                     <div className='capturedList-box'>
                        {
                            items.map(item=>(
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



function Captured({capturedPokemons=[],}){
    return (
      
        <div className="capture-container">
                <div className="textcontent-h3">
                    <div className="textcontainer">
                        <Count items={capturedPokemons}/>
                    </div>
                </div>
        </div>
 )
}
  


export default Captured;


