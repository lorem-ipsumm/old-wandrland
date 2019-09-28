import React, { Component } from 'react';
import "../css/components/error.css";

/*
    This class will show the user info 
    about a specific badge, but only if they
    have found the badge
*/

export default class Error extends Component {
    render() {
        return(
            <div className="error-wrapper wrapper">
                <span className="header">Uh oh</span>
                <span className="text">It looks like something broke somewhere</span>
                <span className="subtext">I apologize</span>
                <button onClick={() => this.props.history.push("/")}>Home</button>
            </div>
        );
    }
}