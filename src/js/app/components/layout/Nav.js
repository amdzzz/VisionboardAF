import React from "react";
import { IndexLink, Link } from "react-router";
import { Modal, Tooltip, Popover, Button, OverlayTrigger,DropdownButton, MenuItem } from  'react-bootstrap';
import NinaButton from '../NinaButton';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS // needed for full list and once
  // orderedToJS // needed for ordered list
  // populatedDataToJS // needed for populated list
} from 'react-redux-firebase'



var ReactGridLayout = require('react-grid-layout');

@firebaseConnect([])
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth'),
  account: pathToJS(firebase, 'profile'),
}))
export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      showModal: false
    };    

  }

  signIn(){
     return this.props.firebase
      .login({ provider: 'google', type: 'popup' })
      .then(() => {
        this.setState({ isLoading: false })
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }


  signOut(){
    this.props.firebase.logout();
    this.close();
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  loginStyle = {
      marginTop:".5%",
      float:"right"
    }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const demoClass = location.pathname.match(/^\/demo/) ? "active" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    const contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
    const featuredClass = (demoClass !== "active" && aboutClass !== "active" && contactClass!=="active") ? "active" : "";

    const navClass = collapsed ? "collapse" : "";
    //userInfo
    var userName = "";

    if(this.props.account){
       userName = this.props.account.displayName.split(" ")[0];
    }

     let loginBar = null;
    if (this.props.account) {
      loginBar =<section style={this.loginStyle} >
        <img class="img-login-circle" src={this.props.account.avatarUrl}></img>
        <DropdownButton  bsStyle="danger" title={userName} id="bg-nested-dropdown">
              <MenuItem onSelect={this.open.bind(this)}  eventKey="">Sign Out</MenuItem>
        </DropdownButton>
       </section>;
    } else {

      loginBar =  <div  style={this.loginStyle}><NinaButton
                    btnText="Google Login"
                    btnHoverText="Login"
                    logo="fa fa-google"
                    btnClass="success"
                    onClickFn={this.signIn.bind(this)} /></div>
                    
    }

  const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return (
    
      <div style = {{marginBottom:"7em"}}>
      <nav  class="navbar navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar icon-bar-blue"></span>
              <span class="icon-bar icon-bar-blue"></span>
              <span class="icon-bar icon-bar-blue"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class={featuredClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>My Visionboards</IndexLink>
              </li>
              
                <li class={aboutClass}>
                <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
              </li>

              <li class={demoClass}>
                <Link to="demo" onClick={this.toggleCollapse.bind(this)}>Demo</Link>
              </li>
                        
            </ul>
              {loginBar}
          </div>
        </div>
         
      </nav>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
 
          <Modal.Body>
            <p>Do you want to sign out? Any unsaved data will be LOST!</p>
            </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.signOut.bind(this)}>Sign Out</Button>
            <Button  onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
