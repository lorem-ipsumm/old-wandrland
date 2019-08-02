import React, { Component } from 'react';
import "../css/components/tag_verification.css"
import firebase from "../firebase.js";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "../css/pages/verification.css";
import Loading from "../components/Loading.js";

/*
    This component handles the login process 
*/


export default class Verification extends Component {

    constructor(props) {
        super(props);

        // setup config for login popup
        this.uiConfig = {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // callback function
            callbacks: {
                signInSuccessWithAuthResult: (e) => {
                    // send uid provided by google to the backend
                    this.send_verification(e.user.uid);
                }
            },

            // We will display Google and Facebook as auth providers.
            signInOptions: [
                // enable phone login
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ]
        };

        this.state = {
            verification_complete: false
        }
    }


    // send the verification id (uid) to the backend
    send_verification = (uid) => {

        let url;

        // check to see if the user is logged in
        if (this.props.get_local_storage().count < 2) {
            // if the user is not logged in, don't send a user name
            url = "https://us-central1-explor-fecbc.cloudfunctions.net/verify_user?uid=" + uid;
        } else {
            // create url for HTTP request
            url = "https://us-central1-explor-fecbc.cloudfunctions.net/verify_user?uid=" + uid

            //add the user credentials
            url += this.props.get_local_storage().variables;
        }


        // hit the verify endpoint
        return fetch(url, {
            method: "GET" 
        })
        .then(response => {
            // read data
            response.body.getReader().read()
            .then(({done, value}) => {
                
                // decode the data
                let data = new TextDecoder("utf-8").decode(value);

                // convert data to JSON
                let json_data = JSON.parse(data);

                this.setState({
                    verification_complete: true
                });

                // iterate through the data being returned
                Object.keys(json_data).forEach(function(key) {
                    // check if it's 'important'
                    if (key.startsWith("l_")) {
                        // save the important value
                        localStorage.setItem(key,json_data[key]);
                    }
                });

                if (json_data.success) {
                    // redirect to user page
                    this.props.history.push("/user/me");
                } else {
                    // TODO: display authentication failure message
                    this.props.history.push("/verify");
                }
            });

        });

    }

    // show loading screen after the verification process
    // sometimes it hangs for a little bit
    show_data = () => {
        if (this.state.verification_complete) {
            return(
                <Loading/>
            );
        } else {
            return(
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            );
        }
    }


    render() {
        return(
            <div className="verification-wrapper wrapper">
                {this.show_data()}
            </div>
        );
    }
}