import React, { Component } from 'react';
import AdSense from 'react-adsense';
import "../css/components/loading.css";
import wandr_pic from "../assets/images/wandr_pic.svg";

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
            "Dolphins recognize and admire themselves in mirrors.",
            "There is a McDonald’s in every continent except Antartica.",
            "A duel between three people is actually called a truel.",
            "All Fruit Loops taste the same",
            "In Morse Code -.- means k.",
            "???",
            "The Boston Marathon didn’t allow female runners until 1972.",
            "y̫͍̭o̫̭̩̟͞u͓̞͜ͅ'̞͖re̼ ͚̞͔̹͖͢p͔̝̫̪̭̺͓͢r҉̻͈ͅo͠b̺̠a̷̝̻͈͔b̬͖̖ļ̱̗̗y͜ h͏̭̳̤ͅu͖̱̻̟͚m̘̙͍a̼n͉̥",
        ];

        // timer for showing connection time
        this.connection_timer = undefined;

        this.state = {
            // the current fact being shown
            current_fact: ""
        }
    }

    // wait five seconds before showing bad connection message
    componentDidMount = () => {

        (window.adsbygoogle = window.adsbygoogle || []).push({});

        // get a new fact whenever the component mounts
        this.setState({
            current_fact: this.facts[Math.floor(Math.random()*this.facts.length)]
        })

        // start the bad connection timer
        this.connection_timer = setTimeout(() => {
            // show bad connection message
            let message = document.getElementsByClassName("loading-message")[0];

            // check to see if the element exists
            if(message !== undefined){
                document.getElementsByClassName("loading-message")[0].classList.add("visible");
            }
        },5000);
    }


    // disable the timer and reset the connection message
    componentWillUnmount = () => {
        // check if the timer is defined
        if (this.connection_timer !== undefined) {
            // clear (reset) the timer for the next mounting
            clearTimeout(this.connection_timer);
        }

        // get the loading message
        let message = document.getElementsByClassName("loading-message")[0];

        // if the loading message is defined, make it invisible for the next mounting
        if(message !== undefined) {
            document.getElementsByClassName("loading-message")[0].classList.remove("visible");
        }
    }

    render() {
        return(
            <div className="loading-wrapper wrapper">
                <div className="loading">
                        <img src={wandr_pic} alt={"wandr-logo"}></img>
                        <span>wandr.<span className="color">land</span></span>
                </div>

                <div className="fact-wrapper">
                    <span className="did-you-know"><span className="color">Did You Know:</span> </span>
                    <span className="fact">{this.state.current_fact}</span>
                </div>

                
                <AdSense.Google
                    client='ca-pub-9847814503069204'
                    layoutKey='-gw-3+1f-3d+2z'
                    format='fluid'
                    slot='7806394673'
                    style={{ display: 'block' }}
                    layout='in-article'
                />
                

                <div className="loading-message">
                    <span>It looks like your connection is weak. Please be patient. If this cotinues try refreshing the page.</span>
                </div>
            </div>
        );
    }
}