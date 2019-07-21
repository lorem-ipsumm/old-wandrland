import React, { Component } from 'react';
import "../css/components/error.css";

/*
    This class will show the user info 
    about a specific badge, but only if they
    have found the badge
*/

export default class Lost extends Component {
    render() {
        return(
            <div className="lost-wrapper wrapper">
                <img alt="lost-gif" src="https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif"/>
                <span className="header">You Look Lost :/</span>
                <span className="text">Don't worry, it happens to the best of us</span>
                <button onClick={() => this.props.history.push("/")}>Go Home</button>
            </div>
        );
    }
}