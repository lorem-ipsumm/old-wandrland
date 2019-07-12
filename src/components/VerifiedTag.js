import React, { Component } from 'react';
import "../css/components/tag_verification.css"

/*
    This component appears when a discovered tag has been verified
*/

export default class VerifiedTag extends Component {
    render() {
        return(
            <div className="tag_verification-wrapper wrapper">
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