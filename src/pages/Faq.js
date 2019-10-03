import React, { Component } from 'react';
import ConfirmButton from '../components/ConfirmButton.js'
import "../css/pages/faq.css";

/*
    This class will show the user FAQ about the app/game,
    and may include news about any upcoming changes, 
    or good to know info
*/

export default class Faq extends Component {


    // logout user
    logout = () => {
        // clear the local storage
       localStorage.clear(); 
    }

    // handle confirm button confirm
    delete_account = () => {
        // check to see if the user is logged in
        let url = "https://us-central1-explor-fecbc.cloudfunctions.net/delete_user?";

        //add the user credentials
        url += this.props.get_local_storage().variables.substring("1");



        if (this.props.get_local_storage().count < 2) {
            window.location.assign("/");
        }

        // hit the delete_user endpoint
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

                // check if there was a success
                if (json_data.success) {
                    // clear local storage
                    localStorage.clear()

                    // redirect to user page
                    window.location.assign("/");
                } else {
                    // TODO: display authentication failure message
                    window.location.assign("lost")
                }
            });

        });   
    }

    // check to see if delete account
    // should be shown
    show_delete_button = () => {
        // are the account variables created?
        if (this.props.get_local_storage().count >= 2) {
            return(
                <div className="question-wrapper">
                    <ConfirmButton text="Delete Account" onConfirm={this.delete_account}/>
                    <ConfirmButton text="Logout" onConfirm={this.logout}/>
                </div>
            );
        }
    }

    // check to see if verify should be shown
    show_verify = () => {
        // does the user have any account info
        if (this.props.get_local_storage().count >= 2) {
            return(
                <div>
                    <span className="text">To restore a verified account tap the login button and you will be asked to verify your phone number again.</span>
                    <button onClick={() => this.props.history.push("/verify")}>Verify Account</button>
                </div>
            );
        }
    }

    render() {
        return(
            <div className="faq-wrapper wrapper">
                <div className="question-wrapper">
                    <div className="question">
                        <span>What is this?</span>
                    </div>
                    <div className="answer">
                        <span>There are QR codes hidden all around campus. Scan any QR code you find to increase your score. </span>
                        <span className="footnote">This game is still in its early stages so there are a couple bugs here are there. I'm trying my best!</span>
                    </div>
                    
                </div>
                <div className="question-wrapper">
                    <div className="question">
                        <span>What is rarity?</span>
                    </div>
                    <div className="answer">
                        <span className="text">You can get more points if you find a tag that very few people have found. This is called <color className="color">rarity.</color> If you want to earn the most points, look for tags in spots you wouldn't expect them to be.</span>
                    </div>
                </div>
                <div className="question-wrapper">
                    <div className="question">
                        <span>Do I need to sign up?</span>
                    </div>
                    <div className="answer">
                        <span className="text">Signing up is <b>not required</b>, but if you change browsers/devices or use a browser that clears its data*, you will be given a new account, so choose wisely. Your phone number will be used as your login and a text message is sent to verify who you are. <b>This info will not be shared with anyone</b>, and is only used to tie your data to you.</span>
                        <span className="text">If you verify your account and switch browsers or devices, you will be able to log back into your account.</span>
                        {this.show_verify()}
                        <span className="footnote">*This includes, but is not limited to Firefox Focus, Ghostery, Red Onion, Secret Browser, etc. Playing in incognito mode will have the same effect.</span>
                    </div>
                </div>
                
                <div className="question-wrapper">
                    <div className="question">
                        <span>Why is this?</span>
                    </div>
                    <div className="answer">
                        <span>For fun. You’re now part of a super secret club filled with people as curious as yourself. Use this newfound power wisely.</span>
                    </div>
                </div>
                <div className="question-wrapper">
                    <div className="question">
                        <span>Who is this?</span>
                    </div>
                    <div className="answer">
                        <span>I’m a JMU student that enjoys making things. This wouldn’t be much of a secret club if I revealed my identity would it?</span>
                    </div>
                </div>
                {this.show_delete_button()}
            </div>
        );
    }
}