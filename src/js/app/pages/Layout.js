import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import * as firebase from "firebase";


export default class Layout extends React.Component {


 


  render() {
    console.log("has stuff: " + JSON.stringify(this.props.route));
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    const signIn = this.props.route.signIn;
    const signOut = this.props.route.signOut;
    const authed = this.props.route.authed;
    const user = this.props.route.user;
    return (
      <div>

        <Nav authed={this.props.route.authed} user={this.props.route.user} signIn={this.props.route.signIn.bind(this)} signOut={this.props.route.signOut.bind(this)} location={location} />

        <div class="container" style={containerStyle}>
          
             
              {this.props.children}

          <Footer/>
        </div>
      </div>

    );
  }
}
