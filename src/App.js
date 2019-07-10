import React, { Component } from 'react';
import "./css/main.css"
import { Route,  Router } from 'react-router-dom';
import Home from "./pages/Home.js";
import Faq from "./pages/Faq.js";
import User from "./pages/User.js";
import Discovery from "./pages/Discovery.js";
import Navbar from "./components/Navbar.js";
import history from "./history";

/*
  This class acts as an overall controller for all
  other classes
*/


export default class App extends Component{

  constructor(props){
    super(props);


    // listen for page changes
    history.listen((event) => {
      // pass the pathname
      this.update_active(event.pathname);
    })
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
  }

  navigate = (page) => {
    history.push(page);
  }

  render(){  
    return (
      <div className="app">
        <Router history={history}>
          <Route exact path="/faq" component={Faq}/>
          <Route path="/user" component={User}/>
          <Route path="/discovery" component={Discovery}/>
          <Route exact path="/" component={Home}/>
        </Router>
        <Navbar navigate={this.navigate} history={history}/> 
      </div>
    );
  }
}
