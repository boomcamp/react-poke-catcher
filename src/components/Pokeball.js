import React, {Component} from 'react';

const ball = {
    cursor: 'pointer',
}

class Pokeball extends Component {
    encounter = (possibleEncounters, handleExplore) => {
       handleExplore()
    }
    render () {
    return (
        
        <img style={ball} alt="Pokeball" onClick={() => this.encounter(this.props.possibleEncounters,this.props.handleExplore)} src="https://stickeroid.com/uploads/pic/full-pngmart/thumb/stickeroid_5bf565ddc32c9.png" height="48" width="48" />
    )
}
}
export default Pokeball;