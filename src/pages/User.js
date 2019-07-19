import React, { Component } from 'react';
import "../css/pages/user.css";
import Loading from "../components/Loading.js";

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
            is_verified: false
        }
    }

    // request data from the backend when the component mounts
    componentDidMount = () => {
        // get username
        let user_name = window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1);

        // if the url ends with "me" then request data for user
        if (user_name === "me") {
            // set user name to saved user name
            user_name = localStorage.getItem("user_name"); 

            // set state username
            this.setState({user_name: user_name});
        }

        // create the url
        let url = "https://us-central1-explor-fecbc.cloudfunctions.net/get_user_data?user_name=" + user_name;

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
                            is_verified: json_data.is_verified
                            //rarity: json_data.tag_data.obtained/json_data.discovery_count
                        });
                    },1500);
                }
            });
        });

    }

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
                            <span>{tag.worth} Points</span>
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
                <span>Your account is not verified! <b>This is completely optional</b>, but if you switch browsers/devices or use a browser that clears data when it closes, <b>you may lose your account</b>. Select an option to hide this warning.</span>
                <div className="warning-buttons" onClick={this.warning_button_clicked}>
                    <button onClick={() => this.props.history.push("/faq")}>Go to FAQ</button>
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
    }
}