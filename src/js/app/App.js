import React from "react";
import { Link } from "react-router";

import * as firebase from "firebase";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from './pages/Layout';
import MyVisionBoards from './pages/MyVisionBoards';
import Contact from './pages/contact';
import About from './pages/about';
import Demo from './pages/demo';


export default class App extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.state={
      authed:false,
      user:null,
      token:null
    }
     const config = {
        apiKey: "AIzaSyBohJQCqFznu3rhwYgRZUVtjJWz4dmg1u8",
        authDomain: "dreamboard-af-83240.firebaseapp.com",
        databaseURL: "https://dreamboard-af-83240.firebaseio.com",
        projectId: "dreamboard-af-83240",
        storageBucket: "dreamboard-af-83240.appspot.com",
        messagingSenderId: "1045645988321"
      };
    
    firebase.initializeApp(config);

    this.checkLoggedIn();

  }

  checkLoggedIn(){
        console.log("check logged in");
    const token = localStorage.getItem("token");
  
    if(token !== null){
      const credential = firebase.auth.GoogleAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(function(result){
        console.log("success revisit sign in: !" );
          
          // The signed-in user info.
          var user = result;
         this.setAuthed(true);
         this.setUser(user);
        }.bind(this)).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error:" +errorCode+"/"+errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }
 
   setAuthed(authed){
    this.setState({authed});
    
  }

  getAuthed(){
    return this.state.authed;
  }

  getUser(){
    return this.state.user;
  }
  setUser(user){
    this.setState({user});
   
  }

  setToken(token){
    this.setState({token});
  }

  googleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.idToken;

    localStorage.setItem('token', token);
    // The signed-in user info.
    var user = result.user;
    this.setAuthed(true);
    this.setUser(user);
    // ...
  }.bind(this)).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

signOut(){
  this.setAuthed(false);
  this.setUser(null);
  this.setToken(null);
  localStorage.setItem('token', null);

  firebase.auth().signOut();
  console.log("signed out");
}

  render() {

    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    const user = this.state.user;
    const authed = this.state.authed;
  
    return (
      <Router history={hashHistory}>
    <Route path="/" component={Layout}  user={this.getUser.bind(this)} authed={this.getAuthed.bind(this)} signIn={this.googleSignIn.bind(this)} signOut={this.signOut.bind(this)}>
      <IndexRoute component={MyVisionBoards}  user={this.getUser.bind(this)} authed={this.getAuthed.bind(this)}></IndexRoute>
      <Route path="about" name="about" component={About}></Route>
      <Route path="contact" name="contact" component={Contact} ></Route>
      <Route path="demo" name="demo" component={Demo}  user={this.getUser.bind(this)} authed={this.getAuthed.bind(this)} ></Route>
    </Route>
  </Router>

    );
  }
}
