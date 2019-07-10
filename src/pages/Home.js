import React, { Component } from 'react';
import "../css/pages/home.css";

export default class Home extends Component {
    button_clicked = () => {
        console.log(this.props);
        //this.props.history.push("/discovery");
    }

    render() {
        return(
            <div className="home-wrapper wrapper">
                <input></input>
                <button onClick={this.button_clicked}>go</button>
            </div>
        );
    }
}