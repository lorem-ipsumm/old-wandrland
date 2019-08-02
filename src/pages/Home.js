import React, { Component } from 'react';
import "../css/pages/home.css";
import Loading from "../components/Loading.js";
import Account from "../components/Account.js";
import  Error from "../components/Error.js";
import { Award } from "react-feather";

/*
    This component will show the home page
*/


export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            // have the top players been loaded
            top_players_loaded: false,
            // has the user's data been loaded
            user_data_loaded: false,
            // received user data
            user_data: [],
            // top player data
            top_players: [],
            // error flag
            error: false,
            // error message
            error_message: ""
        }
    }


    // read the user's data
    read_user_data = (response) => {
        let data = {};
        response.body.getReader().read()
        .then(({done,value}) => {

            // decode data
            let decoded_data = new TextDecoder("utf-8").decode(value);

            // set JSON data
            data = JSON.parse(decoded_data);
        })
        
        .then(() => {
            // check data for errors
            if (data.rank !== -1 && !data.error) {
                // add delay
                setTimeout(() => {
                    // set state varaibles
                    this.setState({
                        user_data_loaded: true,
                        user_data: data
                    });
                }, 1500)
            } else {
                this.setState({
                    error: true,
                    error_message: data.eror
                });

                // try fixing
                if (!data.user_exists) {
                    window.localStorage.removeItem("user_name");
                }
            }
        });

    }


    read_top_players_data = (response) => {
        let data = {};
        response.body.getReader().read()
        .then(({done,value}) => {

            // decode data
            let decoded_data = new TextDecoder("utf-8").decode(value);

            // set JSON data
            data = JSON.parse(decoded_data);
        })
        
        .then(() => {
            // check data for errors
            if (!data.error) {
                // add delay
                setTimeout(() => {
                    // set state varaibles
                    this.setState({
                        top_players_loaded: true,
                        top_players: data.top_players
                    });
                }, 1500)
            }
        });

    }

    // send a request to the bab
    componentDidMount = () => {

        // do not send anything if user variables aren't saved
        if (this.props.get_local_storage().count < 2)
            return;

        // create url for top players 
        let top_players_url = "https://us-central1-explor-fecbc.cloudfunctions.net/get_top_players?limit=10";

        // create url for user data
        let user_data_url = "https://us-central1-explor-fecbc.cloudfunctions.net/get_user_data?";

        // add the local storage variables to the url
        user_data_url += this.props.get_local_storage().variables.substr(1);

        // send request to backend for top players data
        fetch(top_players_url, {
            method: "GET"
        })
        .then(response => {
            // get the parseable data
            this.read_top_players_data(response);
        });


        // send request to backend for user data
        fetch(user_data_url, {
            method: "GET"
        })
        .then(response => {
            // get the parseable data
            this.read_user_data(response);
        });
    }


    // check to see the user has user data stored
    check_storage = () => {
        
        // count of user data variables
        let count = 0;

        // iterate through all items stored in local storage
        for (let i = 0; i < localStorage.length; i++) {
            // check to see if it's a user variable
            if (localStorage.key(i).startsWith("l_")) {
                // increment count
                count++;
            }
        }
        
        // return the count
        return count;
    }


    show_data = () => {
        if (this.state.user_data_loaded && this.state.top_players_loaded) {
            return(
                <div className="data-wrapper">
                    <div className="individual-player-wrapper">
                        <span className="user-name">{this.state.user_data.user_name} <span className="color">(you)</span></span>
                        <span className="score">{this.state.user_data.score} Points</span>
                        <div className="rank-wrapper">
                            <span className="rank-label">Rank</span>
                            <span className="rank-value">{this.state.user_data.rank}</span>
                        </div>
                    </div>
                    <div className="switch-wrapper">
                        <div className="top-players-button">
                            <span>Top 10 Players</span>
                        </div>
                    </div>
                    <div className="top-players-wrapper">
                    {this.state.top_players.map((player,index) => 
                        <div className="player-wrapper" key={index}>
                            {index <= 2 ?
                            <div className="award">
                                <span className="user-name">{this.state.top_players[index].user_name}</span>
                                <Award/>
                            </div>
                            : 
                            <span className="user-name">{this.state.top_players[index].user_name}</span>
                            }
                            <span className="score">{this.state.top_players[index].score} Points</span>
                        </div>
                    )}
                    <div className="spacer"></div>
                    </div>
                </div>
            );    
        } else {
            return(
                <Loading/>
            );
        }
    }




    render() {
        if (this.state.error) {
            return(
                <Error history={this.props.history}/>                
            );
        } else if (this.props.get_local_storage().count < 2) {
            // if the user doesn't have an account show the account info page
            return(
                <Account history={this.props.history}/>
            );
        } else {
            // otherwise show the regular data
            return(
                <div className="home-wrapper wrapper">
                    {this.show_data()} 
                </div>
            );
        }
    }
}