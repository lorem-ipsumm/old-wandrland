import React, { Component } from 'react';
import "../css/components/buttons.css";

/*
   This component handles confirm buttons
*/


export default class ConfirmButton extends Component {

    constructor(props){
        super(props);

        this.state = {
            text: ""
        }
    }

    // send request to delete user data
    button_clicked = (e) => {

        // get the button
        let button = e.target;


        // is this the first click?
        if (!button.classList.contains("confirm")) { 
            // toggle confirm style
            button.classList.toggle("confirm");

            // update the text
            this.setState({
                text: "Are You Sure?"
            });

            // toggle confirm style off
            setTimeout(() => {
                
                // toggle
                button.classList.toggle("confirm");

                // update the text
                this.setState({
                    text: this.props.text
                });
            },3000);
        } else {
            // trigger confirm
            this.props.onConfirm();

            button.classList.toggle("done");
        }
    }


    // set the text when the component mounts
    componentDidMount = () => {

        // set the text
        this.setState({
            text: this.props.text
        });
    }



    render() {
        return(
            <button className="confirm-button" onClick={(e) => this.button_clicked(e)}>{this.state.text}</button>
        );
    }
}