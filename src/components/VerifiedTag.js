import React, { Component } from 'react';
import Confetti from 'react-confetti';
import "../css/components/tag_verification.css"
import verified_1 from "../assets/gifs/verified_1-min.gif";
import verified_2 from "../assets/gifs/verified_2-min.gif";
import verified_3 from "../assets/gifs/verified_3-min.gif";
import verified_4 from "../assets/gifs/verified_4-min.gif";
import verified_5 from "../assets/gifs/verified_5-min.gif";

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


    componentDidMount = () => {
        this.setState({
            current_gif : this.gifs[Math.floor(Math.random()*this.gifs.length)]
        });
    }


    // return true if the tag is an intro tag
    is_intro_tag = () => {
        return(this.props.data.tag_data.intro);
    }


    show_rarity = () => {
        if (!this.is_intro_tag()) {
            return(
                <span>Rarity: {this.props.data.tag_data.rarity.toFixed(2)}</span>
            );
        }
    }


    // calculate how many points the user will be awarded
    calculate_points = () => {
        // check to see if this is the users first find
        if (!this.props.data.new_user) {
            // get the tag worth
            let worth = this.props.data.tag_data.worth;
            
            // get the tag rarity
            let rarity = this.props.data.tag_data.rarity;

            // return the rounded rarity
            return(Math.round(worth + (1/rarity)));
        } else {
            // return the tag worth
            return this.props.data.tag_data.worth;
        }
    }

    render() {
        return(
            <div className="tag_verification-wrapper wrapper">
                <img className="success-gif" alt="sucess-gif" onLoad={(e) => this.show_gif(e)} src={this.state.current_gif}/>
                <header>
                    <span className="footnote">You Discovered:</span>
                    <span className="discovery-name color">"{this.props.data.tag_data.name}"</span>
                    <span className="footnote">You can scan this tag again in 30 minutes</span>
                </header>

                <div className="discovery-info">
                    <div className="points-info">
                        <span>Rarity: {this.props.data.tag_data.rarity.toFixed(2)}</span>
                        <span>Worth: {this.props.data.tag_data.worth}</span>
                    </div>
                    <span className="discovery-reward color">+{this.calculate_points()} Points!</span>
                </div>
                <div className="discovery-button-wrapper">
                    <button onClick={() => this.props.history.push("/user/me")}>Okay</button>
                </div>
                <div className="discovery-button-wrapper">
                    <a href="https://groupme.com/join_group/55829888/Ii0GgjzC">{this.foods[Math.floor(Math.random()*this.foods.length)]}?</a>
                    <span className="footnote">don't touch that link</span>
                </div>
                <Confetti tweenDuration={9000} opacity={.3} numberOfPieces={150} gravity={.5} friction={1} recycle={false} />
            </div>
        );
    }
}