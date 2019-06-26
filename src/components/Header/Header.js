import React, { Component } from 'react';

import './Header.css';
import './Dropdown.css';

import Selector from './Selector/Selector';
import Explore from './Explore/Explore';


export default class Header extends Component{

    constructor(){
        super();
        this.state = {
            exploreHover: false,
            red: require('../img/red-static.gif'),
            pika: require('../img/pikachu-static.gif')
        }
        
        this.exploreMouseEnter = this.exploreMouseEnter.bind(this);
        this.exploreMouseLeave = this.exploreMouseLeave.bind(this);
    }

    exploreMouseEnter(){
        this.setState({
            exploreHover: true,
            red: require('../img/red-running.gif'),
            pika: require('../img/pikachu-running.gif')
        });
    }

    exploreMouseLeave(){
        this.setState({
            exploreHover: false,
            red: require('../img/red-static.gif'),
            pika: require('../img/pikachu-static.gif')
        });
    }


    render(){
        const { loading, regions = [], locations = [], changeRegion, changeLocation, changeArea, areas = [], handleExplore, } = this.props;
        return (    
            <header>
                <div className="app-title-container">
                </div>
                <div className="place">
                    <Selector 
                        handleChange={changeRegion}
                        items={regions} 
                        title="region"
                    />
                    <Selector
                        handleChange={changeLocation} 
                        items={locations} 
                        title="location" 
                    />
                    <Selector 
                        handleChange={changeArea}
                        items={areas}
                        title="area"
                    />
                    <Explore 
                        onHover={this.exploreMouseEnter}
                        offHover={this.exploreMouseLeave}
                        red={this.state.red}
                        pika={this.state.pika}
                        handleExplore={handleExplore}
                    />
                </div>
            </header>
        )
    }   
}