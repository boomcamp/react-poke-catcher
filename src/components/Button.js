import React from 'react';

function ButtonExplore(props){

    return <button className="explore-btn" 
                   onClick={props.explorehandle}>
                   
                <span>{props.children}</span>
            </button>
}

export default ButtonExplore;