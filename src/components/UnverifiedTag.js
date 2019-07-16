import React, { Component } from 'react';
import "../css/components/tag_verification.css"


/*
    This component appears when a discovered tag has been verified
*/

export default class UnverifiedTag extends Component {

    display_error = () => {
        if (this.props.data.duplicate) {
            return(
                <div className="info-text">
                    <span>It looks like you've already discovered this tag. Try looking for new ones!</span>
                </div>
            );
        } else {
            return(
                <div className="info-text">
                    <span>It looks like this isn't a verified tag. If you believe that this is a mistake, try scanning again.</span>
                </div>
            );
        }
    }

    render() {
        return(
            <div className="tag_verification-wrapper wrapper">
                <header>
                    <span className="color">Uh Oh!</span>
                </header>
                {this.display_error()}
                <div className="discovery-button-wrapper">
                    <button onClick={() => this.props.history.push("/user/me")}>Okay</button>
                </div>
            </div>
        );
    }
}