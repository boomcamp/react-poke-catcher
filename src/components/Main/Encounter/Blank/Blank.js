import React from 'react';

import '../../Main.css';

function Blank( { captured }){
    return(
        <React.Fragment>
            <div className="encounter">
                <div className="encounter-header"> 
                    {captured}
                </div>
                <div className="encounter-content">
                    <div id="wild-pokemon">
                    </div>
                    <div id="wild-pokemon-image">
                    </div>
                    <div 
                        id="catch"
                    >       
                    </div>
                </div>
            </div>
            <div className="data">
                <div className="data-divider bordered">
                    <div id="hp"></div>
                    <div id="attack"></div>
                    <div id="defense"></div>
                    <div id="sp-atk"></div>
                    <div id="sp-def"></div>
                    <div id="speed"></div>
                </div>
                <div className="data-divider bordered">
                    <div id="type"></div>
                    <div id="ability"></div>
                </div>
            </div>
        </React.Fragment>    
    )
}

export default Blank;