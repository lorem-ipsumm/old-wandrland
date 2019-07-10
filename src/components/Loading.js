import React, { Component } from 'react';
import "../css/components/loading.css";

/*
    This component shows the user a loading screen while data is prepared
*/

export default class Loading extends Component {
    constructor(props){
        super(props);

        // random facts to show to the user
        this.facts = [
            "Only 2% of Earth population naturally has green eyes.",
            "A bolt of lightning is six times hotter than the sun.",
            "Dolphins recognize and admire themselves in mirrors."
        ];
    }

    render() {
        return(
            <div className="loading-wrapper wrapper">
                <span className="loading">Loading</span>
                <div className="fact-wrapper">
                    <span className="did-you-know"><span className="color">Did You Know:</span> </span>
                    <span className="fact">{this.facts[Math.floor(Math.random()*3)]}</span>
                </div>
            </div>
        );
    }
}