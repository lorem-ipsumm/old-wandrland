import React, { Component } from 'react';
import "../css/pages/home.css";
import Loading from "../components/Loading.js";
import { Award } from "react-feather";

/*
    This component will show the home page
*/


export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            top_players_loaded: false,
            user_data_loaded: false,
            user_data: [],
            top_players: []
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
            if (!data.error) {
                // add delay
                setTimeout(() => {
                    // set state varaibles
                    this.setState({
                        user_data_loaded: true,
                        user_data: data
                    });
                }, 1500)
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
            console.log(data);
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

        let user_name = localStorage.getItem("user_name");

        // create url for top players 
        let top_players_url = "https://us-central1-explor-fecbc.cloudfunctions.net/get_top_players?limit=10";

        // create url for user data
        let user_data_url = "https://us-central1-explor-fecbc.cloudfunctions.net/get_user_data?user_name=" + user_name;

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


    show_data = () => {
        if (this.state.user_data_loaded && this.state.top_players_loaded) {
            return(
                <div className="data-wrapper">
                    <div className="player-data">
                        <div className="player-wrapper individual">
                            <span className="user-name">{this.state.user_data.user_name} <span className="color">(you)</span></span>
                            <span className="score">{this.state.user_data.score} Points</span>
                            <div className="rank-wrapper">
                                <span className="rank-label">Rank</span>
                                <span className="rank-value">{this.state.user_data.rank}</span>
                            </div>
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
        return(
            <div className="home-wrapper wrapper">
               {/*<div className="home-top-banner">
                    <span className="title">explor.</span><span className="title-fun">fun</span>
        </div>*/}
                {this.show_data()} 
            </div>
        );
    }
}