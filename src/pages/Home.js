import React, { Component } from 'react';
import "../css/pages/home.css";

/*
    This component will show the home page
*/


export default class Home extends Component {
    button_clicked = () => {
        console.log(this.props);
        //this.props.history.push("/discovery");
    }

    render() {
        return(
            <div className="home-wrapper wrapper">
                <input></input>
                <button >go</button>
            </div>
        );
    }
}