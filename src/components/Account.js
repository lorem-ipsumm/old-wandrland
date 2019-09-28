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
                    <div className="center-wrapper">
                        <div className="svg-wrapper">
                            <AlertTriangle/>
                        </div>
                        <div className="section-text">
                            You've stumbled upon something interesting.
                        </div>
                    </div>
                    <button onClick={() => this.props.history.push("/faq")}>Join the game</button>
                </div>
                <div className="section-wrapper">
                    <div className="center-wrapper">
                        <div className="svg-wrapper">
                            <UserCheck/>
                        </div>
                        <div className="section-text">
                            If you have a verified account, tap the button below to login
                        </div>
                    </div>
                    <button onClick={() => this.props.history.push("/verify")}>Login</button>
                </div>
            </div>
        );
    }
}