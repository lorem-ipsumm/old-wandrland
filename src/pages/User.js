import React, { Component } from 'react';
import "../css/pages/user.css";
import Loading from "../components/Loading.js";
import Account from '../components/Account';
import  Error from "../components/Error.js";

/*
    This class shows the user's stats. This includes
        - score
        - name 
        - rank
        - badges collected
        - (maybe) rarity

    If the user has not verified their account, their 
    stats will be saved, but their ID is stored in the
    local storage, which is vulnerable to being erased
*/



export default class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            // rank state value
            rank: -1,
            // score state value
            score: -1,
            // state value for checking if user has an account
            user_created: false,
            // signal when the user's data has been loaded
            user_data_loaded: false,
            // state value for user name
            user_name: "",
            // state value for user tags
            tags: -1,
            // list of tags discovered
            tags_list: [],
            // additional points for rarity
            rarity: 0,
            // state value for checking user verification
            is_verified: false,
            // was there an error
            error: undefined
        }
    }

    // request data from the backend when the component mounts
    componentDidMount = () => {

        // do not send anything if user variables aren't saved
        if (this.props.get_local_storage().count < 2)
            return;

        // create the url
        let url = "https://us-central1-explor-fecbc.cloudfunctions.net/get_user_data?";

        // add the local storage variables to the url
        url += this.props.get_local_storage().variables.substr(1);

        return fetch(url, {
            method: "GET"
        })
        .then(response => {
            response.body.getReader().read()
            .then(({done,value}) => {
                // decode the data
                let data = new TextDecoder("utf-8").decode(value);

                // convert data to JSON
                let json_data = JSON.parse(data);

                // check if there was an error getting the data
                if (!json_data.error) {
                    // set the state variables
                    // add delay
                    setTimeout(() => {
                        this.setState({
                            rank: json_data.rank,
                            score: json_data.score,
                            tags: json_data.tags,
                            user_data_loaded: true,
                            tags_list: json_data.tags_list,
                            is_verified: json_data.is_verified,
                            user_name: json_data.user_name
                        });
                    },1500);
                } else {
                    // the user doesn't exist for some reason
                    if (!json_data.user_exists) {
                        // set error
                        this.setState({
                            error: json_data.error
                        });
                    }
                }
            });
        });

    }

    // show the tag data 
    show_tags = () => {
        // show loading before the data is loaded
        if (this.state.user_data_loaded) {
            return(
                this.state.tags_list.map((tag,index) =>
                    <div className="tag-wrapper" key={index}>
                        <div className="tag-name">
                            <span>{tag.name}</span>
                        </div>
                        <div className="tag-worth">
                            <span>Worth: {tag.worth}pts</span>
                        </div>
                        <div className="tag-rarity">
                            {tag.rarity === undefined ? 
                            <span>Rarity: {tag.rarity.toFixed(2)}</span>
                            :
                            <span>Rarity: ???</span>
                            }
                        </div>
                    </div>   
                )
            );
        } else {
            return(
                <Loading/>
            );
        }
    }

    // listen for warning button clicks and redirect the user
    warning_button_clicked= (redirect) => {
        // the user has seen the warning so do not show it anymore
        window.localStorage.setItem("warning_seen","");
    }


    // show the user the account verification warning
    show_warning = () => {
        // check to see if the user is verified
        // if user is not verified show the warning
        if (this.state.user_data_loaded && (!this.state.is_verified && window.localStorage.getItem("warning_seen") === null))
        return(
            <div className="warning-wrapper">
                <span>Your account is not verified! <b>This is completely optional</b>, but if you switch browsers/devices or use a browser that clears its data, <b>you may lose your account</b>. Select an option to hide this warning.</span>
                <div className="warning-buttons" onClick={this.warning_button_clicked}>
                    <button onClick={() => this.props.history.push("/faq")}>Learn More</button>
                    <button onClick={() => this.props.history.push("/verify")}>Verify Account</button>
                </div>
            </div>
        )
    }

    // toggle the visibility of the data when loaded
    componentDidUpdate = () => {
        // wait for the data to be loaded 
        if (this.state.user_data_loaded) {
            // get the stats container
            let stats = document.getElementsByClassName("user-info-stats")[0];

            // add loaded class
            stats.classList.add("loaded");
        }
    }


    render() {
        if (this.state.error !== undefined) {
            return(
                <Error history={this.props.history}/>                
            );
        }else if (this.props.get_local_storage().count >= 2){
            // check to see if the user has an account
            // if two user variables are stored in local storage, show the page
            if (this.state.user_data_loaded) {
                return(
                    <div className="user-wrapper wrapper">
                        <div className="user-info-top">
                            <span className="user-info-name">{this.state.user_name}</span>
                            <div className="user-info-stats">
                            <div className="user-stat">
                                    <span className="label">Rank</span>
                                    <span className="value">{this.state.rank}</span>
                            </div> 
                            <div className="user-stat">
                                    <span className="label">Points</span>
                                    <span className="value">{this.state.score}</span>
                            </div> 
                            <div className="user-stat">
                                    <span className="label">Tags</span>
                                    <span className="value">{this.state.tags}</span>
                            </div> 
                            </div> 
                        </div>
                        {this.show_warning()}
                        <div className="user-info-middle">
                            <span>Tags Discovered</span>
                        </div>
                        <div className="user-info-bottom">
                            {this.show_tags()}
                        </div>
                    </div>
                );
            } else {
                return(
                    <div className="user-wrapper wrapper">
                        <Loading/>
                    </div>
                );
            }
        } else {
            // show account page if user does not have an account
            return(
                <Account history={this.props.history}/>
            );
        }
    }
}