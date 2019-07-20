import React, { Component } from 'react';
import "../css/pages/account.css";
import { AlertTriangle } from "react-feather";
import { UserCheck } from "react-feather";

/*
   This component catches users that don't have accounts 
*/

export default class Account extends Component {
    render() {
        return(
            <div className="account-wrapper wrapper">
                <div className="section-wrapper">
                    <div className="svg-wrapper">
                        <AlertTriangle/>
                    </div>
                    <div className="section-text">
                        To get an account you’ll need to scan one of many hidden QR codes somewhere on campus.
                    </div>
                    <button onClick={() => this.props.history.push("/faq")}>Learn More</button>
                </div>
                <div className="section-wrapper">
                    <div className="svg-wrapper">
                        <UserCheck/>
                    </div>
                    <div className="section-text">
                        If you have a verified account, tap the button below to login
                    </div>
                    <button onClick={() => this.props.history.push("/verify")}>Login</button>
                </div>
            </div>
        );
    }
}