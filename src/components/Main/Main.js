import React, { Component } from 'react';

import Encounter from './Encounter/Encounter';
import Catched from './Catched/Catched';

import './Main.css';

export default class Main extends Component {
    render() {
        const { encountered, handleCapture, capture, captured } = this.props;
        return (
            <main className="no-side-border">
                <Encounter 
                    pokemon={encountered} 
                    handleCapture={handleCapture} 
                    capture={capture} 
                />
                <Catched catched={captured} />
            </main>
        )
    }
}