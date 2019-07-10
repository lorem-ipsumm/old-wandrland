import React, { Component } from 'react';
import "../css/components/navbar.css";
import { HelpCircle, Home, User} from "react-feather";

/*
   This component displays the bottom navbar 
*/

export default class Navbar extends Component {

    // triggered when navbar button is clicked
    button_clicked = (e) => {
        // get the target
        let target = e.target;

        // find div parent
        while(target.nodeName !== "DIV") {
            // set the target to parent
            target = target.parentNode;
        }

        // set the target to active
        target.classList.add("active");

        // navigate to faq
        if (target.classList.contains("faq")) {
            this.props.history.push("/faq");
        } 

        // navigate to home
        if (target.classList.contains("home")) {
            this.props.history.push("/");
        }

        // navigate to user
        if (target.classList.contains("user")) {
            this.props.history.push("/user");
        }

        // get the other buttons
        let children = document.getElementsByClassName("navbar-wrapper")[0].children;
        
        // iterate through children
        for(let child of children){
            // go through all non-targets
            if (child !== target) {
                // turn off the active class
                child.classList.remove("active");
            }
        }
    }


    render() {
        return(
            <div className="navbar-wrapper">
               <div className="icon-section faq" onClick={(e) => {this.button_clicked(e)}}>
                <HelpCircle/>
                <span>faq</span>
               </div> 
               <div className="icon-section home" onClick={(e) => this.button_clicked(e)}>
                <Home/>
                <span>home</span>
               </div> 
               <div className="icon-section user" onClick={(e) => this.button_clicked(e)}>
                <User/>
                <span>profile</span>
               </div> 
            </div>
        );
    }
}