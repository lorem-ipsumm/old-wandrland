import React, { Component } from 'react';
import "../css/components/tag_verification.css"

/*
    This component appears when a discovered tag has been verified
*/

export default class VerifiedTag extends Component {
    constructor(props){
        super(props);

        // list of success gifs
        this.gifs = [
            "https://media.giphy.com/media/fdyZ3qI0GVZC0/giphy.gif",
            "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
            "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif",
            "https://media.giphy.com/media/wZjlCH43M3M0U/giphy.gif",
            "https://media.giphy.com/media/3oFzmiMu3v4LIXpJBK/giphy.gif",
            "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif"
        ];

        this.state = {
            // the gif being shown
            current_gif: ""
        }
    }


    componentDidMount = () => {
        this.setState({
            current_gif : this.gifs[Math.floor(Math.random()*this.gifs.length)]
        });
    }

    render() {
        return(
            <div className="tag_verification-wrapper wrapper">
                <img className="success-gif" alt="sucess-gif" src={this.state.current_gif}/>
                <header>
                    Nice Find!
                </header>

                <div className="discovery-info">
                    <span>You Discovered: {this.props.data.tag_data.name}</span>
                    <span className="discovery-reward color">+{this.props.data.tag_data.worth} Points!</span>
                </div>
                <div className="discovery-button-wrapper">
                    <button onClick={() => this.props.history.push("/user/me")}>Okay</button>
                </div>
            </div>
        );
    }
}