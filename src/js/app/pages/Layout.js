import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import * as firebase from "firebase";


export default class Layout extends React.Component {


 


  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
 
    return (
      <div>

        <Nav location={location} />

        <div class="container" style={containerStyle}>
          
             
              {this.props.children}

          <Footer/>
        </div>
      </div>

    );
  }
}
