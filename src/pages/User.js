import React, { Component } from 'react';


/*
    This class shows the user's stats. This includes
        - score
        - name ( if verified )
        - badges collected
        - (maybe) rarity

    If the user has not verified their account, their 
    stats will be saved, but their ID is stored in the
    cookies, which is vulnerable to being erased
*/
export default class User extends Component {
    render() {
        return(
            <div className="user-wrapper wrapper">
                this is user 
            </div>
        );
    }
}