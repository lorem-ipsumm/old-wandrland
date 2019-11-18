import React, { Component } from 'react';
import "../css/components/tag_verification.css"
import Confetti from 'react-confetti';
import unverified_1 from "../assets/gifs/unverified_1-min.gif";
import unverified_2 from "../assets/gifs/unverified_2-min.gif";
import unverified_3 from "../assets/gifs/unverified_3-min.gif";
import unverified_4 from "../assets/gifs/unverified_4-min.gif";
import unverified_5 from "../assets/gifs/unverified_5-min.gif";


/*
    This component appears when a discovered tag has been verified
*/

export default class UnverifiedTag extends Component {

    constructor(props){
        super(props);

        // list of success gifs
        this.gifs = [
            unverified_1,
            unverified_2,
            unverified_3,
            unverified_4,
            unverified_5
        ];

        this.foods = ["pizza", "saltines", "tomatoes", "popcorn", "bread", "friends", "burritos"];

        this.state = {
            // the gif being shown
            current_gif: ""
        }
    }


    // show the gif once the img tag finishes loading
    show_gif = (event) => {
        let image = event.target;
        image.classList.add("loaded");
    }

    display_error = () => {
        if (this.props.data.duplicate) {
            return(
                <div className="info-text">
                    <span>You can't rediscover this tag yet!</span>
                    <span className="footnote">You can rediscover this tag in {30 - this.props.data.limit_minutes}:{60 - this.props.data.limit_seconds.toLocaleString(undefined, {minimumIntegerDigits:2})}</span>
                </div>
            );
        } else {
            return(
                <div className="info-text">
                    <span>It looks like this isn't a verified tag.</span>
                    <span className="footnote">If you believe that this is a mistake, try scanning again.</span>
                </div>
            );
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
                <img className="success-gif" alt="sucess-gif" onLoad={(e) => this.show_gif(e)} src={this.state.current_gif}/>
                <header>
                    <span className="color">Uh Oh!</span>
                </header>
                {this.display_error()}
                <div className="discovery-button-wrapper">
                    <button onClick={() => this.props.history.push("/user/me")}>Okay</button>
                </div>
                <div className="discovery-button-wrapper">
                    <a href="https://groupme.com/join_group/55829888/Ii0GgjzC">{this.foods[Math.floor(Math.random()*this.foods.length)]}?</a>
                    <span className="footnote">don't touch that link</span>
                </div>
                <Confetti opacity={.5} numberOfPieces={10}  recycle={false} style={{"z-index": "1"}}/>
            </div>
        );
    }
}