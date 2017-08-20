import React from "react";
import ImageSearch from "./ImageSearch";
import FlickrImage from "../components/FlickrImage";
import {DropdownButton, MenuItem} from 'react-bootstrap'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';


export default class Demo extends React.Component {

constructor(){
  super();
 this.state={
  demoImgClass:"effect-bubba",
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    }, 
    displayColorPicker2: false,
    color2: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    primaryTextStyle:{},
    secondaryTextStyle:{}
 };

}

 handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    console.log("change primary color: " + color.hex);
    const primaryTextStyle = {color: color.hex};
    this.setState({primaryTextStyle})
  };

   handleClick2 = () => {
    this.setState({ displayColorPicker2: !this.state.displayColorPicker2 })
  };

  handleClose2 = () => {
    this.setState({ displayColorPicker2: false })
  };

  handleChange2 = (color2) => {
    this.setState({ color2: color2.rgb });
      console.log("change secondary color: " + color2.hex);
    const secondaryTextStyle = {color: color2.hex};
    this.setState({secondaryTextStyle});
  };

  changeImageEffect(eventKey){
    console.log("chagne image effect");
    const demoImgClass = eventKey;
    console.log("new class: " + demoImgClass);
    this.setState({demoImgClass});
  }
  render() {
    console.log("demo");
console.log("js" + JSON.stringify(this.state.secondaryTextStyle));
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

 const styles2 = reactCSS({
      'default': {
        color2: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color2.r }, ${ this.state.color2.g }, ${ this.state.color2.b }, ${ this.state.color2.a })`,
        },
        swatch2: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover2: {
          position: 'absolute',
          zIndex: '2',
        },
        cover2: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
        <div class="container">
            <h1>Dreamboard Image Options</h1>

              <div class="col-md-12">
            <FlickrImage  imgClass={this.state.demoImgClass} primaryTextStyle={this.state.primaryTextStyle} secondaryTextStyle={this.state.secondaryTextStyle} key="3837389579"  title="Black cat no.67" id="3837389579" secret="d8eea2e9e0" farm="3" server="2580"/>           
            <FlickrImage  imgClass={this.state.demoImgClass} primaryTextStyle={this.state.primaryTextStyle} secondaryTextStyle={this.state.secondaryTextStyle} primarykey="16298657569"  title="london" id="16298657569" secret="b606bae4fe" farm="8" server="7426"/>           
            <FlickrImage  imgClass={this.state.demoImgClass} primaryTextStyle={this.state.primaryTextStyle} secondaryTextStyle={this.state.secondaryTextStyle} key="34728344012"  title="Schwifty Rickmobile" id="34728344012" secret="8f63a7154d" farm="5" server="4222"/>           

            </div>
            <div class ="row">

            <div class="col-md-4">
            <DropdownButton  bsStyle="primary" title="Image Effect" id="bg-nested-dropdown">
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-apollo">Apollo</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-bubba">Bubba</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-chico">Chico</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-duke">Duke</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-dexter">Dexter</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-goliath">Goliath</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-jazz">Jazz</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-julia">Julia</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-kira">Kira</MenuItem>
              

              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-layla">Layla</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-lexi">Lexi</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-lily">Lily</MenuItem>  
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-marley">Marley</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-milo">Milo</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-ming">Ming</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-moses">Moses</MenuItem>
              
                 
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-oscar">Oscar</MenuItem> 
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-romeo">Romeo</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-roxy">Roxy</MenuItem>
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-ruby">Ruby</MenuItem>
                                    
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-sadie">Sadie</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-sarah">Sarah</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-selena">Selena</MenuItem>
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-steve">Steve</MenuItem>
              
              
              <MenuItem onSelect={this.changeImageEffect.bind(this)}  eventKey="effect-zoe">Zoe</MenuItem>

              
           
            </DropdownButton>
              </div>
               
                <div class="col-md-4">
                  <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                  </div>
                  { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                  </div> : null }
                  <p class="demo-title">Primary Text Color</p>
                </div>

                 <div class="col-md-4">
                  <div style={ styles2.swatch2 } onClick={ this.handleClick2 }>
                    <div style={ styles2.color2 } />
                  </div>
                  { this.state.displayColorPicker2 ? <div style={ styles2.popover2 }>
                    <div style={ styles2.cover2 } onClick={ this.handleClose2 }/>
                    <SketchPicker color={ this.state.color2 } onChange={ this.handleChange2 } />
                  </div> : null }
                  <p class="demo-title">Secondary Text Color</p>
                </div>

                </div>
              
    

           
            <h1>Image Search</h1>
            <ImageSearch authed={this.props.route.authed} user={this.props.route.user} ></ImageSearch>
            <hr></hr>
            <h1>Demo Dreamboard</h1>
            <hr></hr>
      </div>
    );
  }
}
