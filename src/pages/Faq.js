import React, { Component } from 'react';
import "../css/pages/faq.css";

/*
    This class will show the user FAQ about the app/game,
    and may include news about any upcoming changes, 
    or good to know info
*/

export default class Faq extends Component {
    render() {
        return(
            <div className="faq-wrapper wrapper">
                <div className="question-wrapper">
                    <div className="question">
                        <span>What is this?</span>
                    </div>
                    <div className="answer">
                        <span>There are QR codes hidden all around campus. Scan any QR code you find to increase your score. The harder it is to find, the more points you’ll get.</span>
                    </div>
                    
                </div>
                <div className="question-wrapper">
                    <div className="question">
                        <span>Do I need to sign up?</span>
                    </div>
                    <div className="answer">
                        <span className="text">Signing up is <b>not required</b>, but if you change browsers/devices or use a browser that clears its data*, you will be given a new account, so choose wisely. Your phone number will be used as your login and a text message is sent to verify who you are. <b>This info will not be shared with anyone</b>, and is only used to tie your data to you.</span>
                        <span className="text">If you verify your account and switch browsers or devices, you will be able to log back into your account.</span>
                        <span className="text">To restore a verified account tap the login button and you will be asked to verify your phone number again.</span>
                        <button onClick={() => this.props.history.push("/verify")}>Sign-Up/Login</button>
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
            </div>
        );
    }
}