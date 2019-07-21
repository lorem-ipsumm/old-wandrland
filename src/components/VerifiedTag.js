import React, { Component } from 'react';
import "../css/components/tag_verification.css"
import verified_1 from "../gifs/verified_1.gif";
import verified_2 from "../gifs/verified_2.gif";
import verified_3 from "../gifs/verified_3.gif";
import verified_4 from "../gifs/verified_4.gif";
import verified_5 from "../gifs/verified_5.gif";

/*
    This component appears when a discovered tag has been verified
*/

export default class VerifiedTag extends Component {
    constructor(props){
        super(props);

        // list of success gifs
        this.gifs = [
            verified_1,
            verified_2,
            verified_3,
            verified_4,
            verified_5
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