import React, { Component } from 'react';
import "./css/main.css"
import { Route,  Router } from 'react-router-dom';
import Home from "./pages/Home.js";
import Faq from "./pages/Faq.js";
import User from "./pages/User.js";
import Discovery from "./pages/Discovery.js";
import Navbar from "./components/Navbar.js";
import Verification from "./pages/Verification.js";
import history from "./history";

/*
  This class acts as an overall controller for all
  other classes
*/


export default class App extends Component{

  constructor(props){
    super(props);

    // list of pages that require accounts
    this.account_required = ["/","/verify","/discovery","/user/me"];

    // listen for page changes
    history.listen((event) => {
      // pass the pathname
      this.update_active(event.pathname);

      // check to see if an account is needed for the page
      this.check_account();      
    })
  }


  // check to see if the user has an account
  check_account = () => {
    // check if the user has an account 
    if (window.localStorage.getItem("user_name") === null) {
      // iterate through list of account required pages
      for (let path of this.account_required) {
        // check to see if the location is in the list of account required pages
        if (window.location.pathname === path) {
          // go to account page
          //history.push("/verify");
        }
      }
    }
  }

  // update the active page
  update_active = (path) => {

    // get children
    let children = document.getElementsByClassName("navbar-wrapper")[0].children;

    // set faq page to active
    if (path.indexOf("faq") > -1) {
        // iterate through children
        for(let child of children){
            //  deactivate all non-targets
            if (!child.classList.contains("faq")) {
              child.classList.remove("active");
            } else {
              child.classList.add("active");
            }
        }
    }

    // set user page to active
    if (path.indexOf("user") > -1) {
        
        // iterate through children
        for(let child of children){
            // deactivate all non-targets 
            if (!child.classList.contains("user")) {
              child.classList.remove("active");
            } else {
              child.classList.add("active");
            }if (path.indexOf("user") > -1) {
        
              // iterate through children
              for(let child of children){
                  // go through all non-targets
                  if (!child.classList.contains("user")) {
                    child.classList.remove("active");
                  } else {
                    child.classList.add("active");
                  }
              }
          }
      
        }
    }

    // set home page to active
    if (path === "/") {
        // iterate through children
        for(let child of children){
            // deactivate all non-targets
            if (!child.classList.contains("home")) {
              child.classList.remove("active");
            } else {
              child.classList.add("active");
            }
        }
    }
  }

  // set the active button when the user first visits the site
  componentDidMount = () => {
    this.update_active(window.location.pathname);

    // check to see if an account is needed for the first page
    this.check_account();
  }

  render(){  
    return (
      <div className="app">
        <Router history={history}>
          <Route exact path="/faq" component={Faq}/>
          <Route path="/user" component={User}/>
          <Route path="/discovery" component={Discovery}/>
          <Route path="/verify" component={Verification}/>
          <Route exact path="/" component={Home}/>
        </Router>
        <Navbar history={history}/> 
      </div>
    );
  }
}
