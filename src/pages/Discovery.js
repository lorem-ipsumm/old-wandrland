import React, { Component } from 'react';
import cookie from "react-cookies";
import '../css/pages/discovery.css';
import VerifiedTag from "../components/VerifiedTag.js";
import UnverifiedTag from "../components/UnverifiedTag.js";
import Loading from "../components/Loading.js";

/*
    This class is the page that the user sees when
    they discover a new tag.
        - Before being verified there is a loading screen
        - If verified, the user is shown info about the tag
        - If not, the user is given a message saying what happened
*/

export default class Discovery extends Component {

    constructor(props){
        super(props);

        // state variables
        this.state = {
            // is the tag verification process complete
            verification_complete: false,
            // is the tag itself verified
            tag_is_verified: false,
            // data received from verification process
            verification_data: {}
        }

        this.error_response = "";
    }


    // check the verified tag state variable
    check_tag_verification = () => {
        // is the verification complete
        if (this.state.verification_complete) {
            // was the tag verified
            if (this.state.tag_is_verified) {
                // show the verified tag component
                return (
                    <VerifiedTag history={this.props.history} data={this.state.verification_data}/>
                );
            } else {
                // show the unverified tag component
                return (
                    <UnverifiedTag history={this.props.history} data={this.state.verification_data}/>
                );
            }
        } else {
            // show the loading component by default 
            return(
                <Loading/>
            )
        }
    }

    // once the component mounts:
    // 1. send the tag to the function to verify
    // 2. if verified, show user's new score and the name of the tag
    componentDidMount = () => {

        // get the tag from the URL
        let tag = window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1);

        // url for the verfication endpoint
        let url = "https://us-central1-explor-fecbc.cloudfunctions.net/verify_tag";

        // check to see if there is a tag in the url
        if (tag.length > 1) {
            url = url + "?tag=" + tag;            
        }

        // if the user has a user name add it to the url
        if (cookie.load("user_name") !== undefined) {
            // if there is a parameter before, a '&' is used
            if(tag.length > 1)
                url = url + "&user_name=" + cookie.load("user_name");
            else
                url = url + "?user_name=" + cookie.load("user_name");
        }

        // hit the verify endpoint
        return fetch(url, {
            method: "GET" 
        })
        .then(response => {
            // read the data
            response.body.getReader().read()
            .then(({done,value}) => {
                // decode the data
                let data = new TextDecoder("utf-8").decode(value);

                // convert data to JSON
                let json_data = JSON.parse(data);

                console.log(json_data);

                // add small delay to allow for reading fun fact!
                setTimeout(() => {

                    // change state to move on to next steps
                    this.setState({
                        verification_complete: true,
                        tag_is_verified: json_data.tag_verified,
                        verification_data: json_data
                    });

                    // save the user's user name
                    cookie.save("user_name",json_data.user_name, {path: "/"});

                },2000);

            });
        });
    }
    
    render() {
        return(
            <div className="discovery-wrapper wrapper">
                {this.check_tag_verification()}
            </div>
        );
    }
}