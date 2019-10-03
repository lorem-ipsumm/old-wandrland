import React, { Component } from 'react';
import "../css/components/error.css";

/*
    This class will show the user info 
    about a specific badge, but only if they
    have found the badge
*/

export default class Error extends Component {

    // triggered when button is clicked
    button_clicked = () => {

        // clear user variables
        localStorage.clear();

        // reload page
        window.location.reload();
    }

    render() {
        return(
            <div className="error-wrapper wrapper">
                <span className="header">Uh oh</span>
                <span className="text">It looks like something broke somewhere</span>
                <span className="subtext">I apologize</span>
                <button onClick={() => this.button_clicked()}>Home</button>
            </div>
        );
    }
}