import React from "react";
import ImageSearch from "./ImageSearch";
import FlickrImage from "../components/FlickrImage";
import {DropdownButton, MenuItem} from 'react-bootstrap'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';
var ReactGridLayout = require('react-grid-layout');


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
     displayColorPicker3: false,
    color3: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    primaryTextStyle:{},
    secondaryTextStyle:{},
    textBGColor:{}
 };

}

onLayoutChange(layout){

}

 handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
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
    const secondaryTextStyle = {color: color2.hex};
    this.setState({secondaryTextStyle});
  };

   handleClick3 = () => {
    this.setState({ displayColorPicker3: !this.state.displayColorPicker3 })
  };

  handleClose3 = () => {
    this.setState({ displayColorPicker3: false })
  };

  handleChange3 = (color3) => {
    this.setState({ color3: color3.rgb });
    const textBGColor = {background: color3.hex};
    this.setState({textBGColor});
  };

  changeImageEffect(eventKey){
    const demoImgClass = eventKey;
    this.setState({demoImgClass});
  }

  onPhotoDoubleClick(src){
  }
  render() {
     var layout = [{"w":3,"h":8,"x":0,"y":2.25,"i":"b","moved":false,"static":false,"isResizable":false},
     {"w":4,"h":1.5,"x":4,"y":0,"i":"c","moved":false,"static":false,"isResizable":false},
     {"w":4,"h":2.25,"x":0,"y":10.25,"i":"d","moved":false,"static":false,"isResizable":false},
     {"w":3,"h":8,"x":8,"y":0,"i":"h","moved":false,"static":false,"isResizable":false},
     {"w":4,"h":2.25,"x":5,"y":9.5,"i":"f","moved":false,"static":false,"isResizable":false},
     {"w":2,"h":2.25,"x":0,"y":0,"i":"k","moved":false,"static":false,"isResizable":false},
     {"w":4,"h":1.25,"x":6,"y":11.75,"i":"g","moved":false,"static":false,"isResizable":false},
     {"w":3,"h":8,"x":5,"y":13,"i":"i","moved":false,"static":false,"isResizable":false},
     {"w":3,"h":8,"x":4,"y":1.5,"i":"j","moved":false,"static":false,"isResizable":false},
     {"w":3,"h":8,"x":1,"y":12.5,"i":"p","moved":false,"static":false,"isResizable":false}];
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

    const styles3 = reactCSS({
      'default': {
        color3: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color3.r }, ${ this.state.color3.g }, ${ this.state.color3.b }, ${ this.state.color3.a })`,
        },
        swatch3: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover3: {
          position: 'absolute',
          zIndex: '2',
        },
        cover3: {
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
          <div class="row">
          <h1 class="wsg-title">Demo</h1>
          </div>
            <h1 >Vision Board Image Options</h1>

              <div class="col-md-12">
                <div class="col-md-4">
            <FlickrImage  imgClass={this.state.demoImgClass} primaryTextStyle={this.state.primaryTextStyle} secondaryTextStyle={this.state.secondaryTextStyle} key="3837389579"  title="Black cat no.67" subTitle="demo subtitle" id="3837389579" secret="d8eea2e9e0" farm="3" server="2580"/>           
            </div>
            <div class="col-md-4">

            <FlickrImage  imgClass={this.state.demoImgClass} primaryTextStyle={this.state.primaryTextStyle} secondaryTextStyle={this.state.secondaryTextStyle} key="16298657569"  title="london" subTitle="demo subtitle" id="16298657569" secret="b606bae4fe" farm="8" server="7426"/>           
            </div>
            <div class="col-md-4">

            <FlickrImage  imgClass={this.state.demoImgClass} primaryTextStyle={this.state.primaryTextStyle} secondaryTextStyle={this.state.secondaryTextStyle} key="34728344012"  title="Schwifty Rickmobile" subTitle="demo subtitle" id="34728344012" secret="8f63a7154d" farm="5" server="4222"/>           
            </div>
              </div>
            <div class ="row">

            <div class="col-md-4" style={{marginBottom:"15px"}}>
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
            <div class="row">
            <hr></hr>

            <h1>Text Options</h1>
              <div class="col-md-6 color-8" style={this.state.textBGColor}>
                <a class="link link--kukuri"  data-letters="Kukuri">Kukuri</a>          
              </div>
              <div class="col-md-6  color-3"style={this.state.textBGColor}>
				        <a class="link link--nukun" >Nu<span>k</span>un</a>       
              </div>
              <div class="col-md-6 color-4"style={this.state.textBGColor}>
		        		<a class="link link--kumya"><span data-letters="Kumya">Kumya</span></a>
              </div>
              <div class="col-md-6 color-9" style={this.state.textBGColor}>
			        	<a class="link link--ilin"><span>Il</span><span>in</span></a>
              </div>
              <div class="clearfix"></div>
              <div class="col-md-4">
                </div>
               <div class="col-md-4"  style={{marginTop:"15px"}}>
                  <div style={ styles3.swatch3 } onClick={ this.handleClick3 }>
                    <div style={ styles3.color3 } />
                  </div>
                  { this.state.displayColorPicker3 ? <div style={ styles3.popover3 }>
                    <div style={ styles3.cover3 } onClick={ this.handleClose3 }/>
                    <SketchPicker color={ this.state.color3 } onChange={ this.handleChange3 } />
                  </div> : null }
                  <p class="demo-title">Text Background Color</p>
                </div>
                 <div class="col-md-4">
                </div>
            </div>
                                                           <hr></hr>

            <h1>Integrated Image Search</h1>
            <ImageSearch onPhotoDoubleClick={this.onPhotoDoubleClick.bind(this)} authed={this.props.route.authed} user={this.props.route.user} ></ImageSearch>
            <hr></hr>
            <h1>Demo Vision Board</h1>
            <div style={{border:"6px solid white",background:"#add8e6", width:"1200px"}}>
             <ReactGridLayout onLayoutChange={this.onLayoutChange} className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
              <div  key={'b'}>
                <FlickrImage  imgClass="effect-steve" key="34728344012"  title="Schwifty Rickmobile" subTitle="get a new Schwiftmobile" id="34728344012" secret="8f63a7154d" farm="5" server="4222"/>             
              </div>
              <div key={'c'}> 
                <div style={{background: "white"}}>
                  <a class="link link--kukuri"  data-letters="england">england</a>          
                </div>
              </div>
              <div key={'d'}> 
                <div style={{background: "red"}}>
		        		<a class="link link--kumya"><span data-letters="schwifty">schwifty</span></a>
                </div>
              </div>
              
              <div  key={'h'}>
                <FlickrImage  imgClass="effect-dexter"  key="6257398888"  title="Workout" subTitle="workout 3 times a week" id="6257398888" secret="f710a47cc7" farm="7" server="6216"/>             
              </div>
               <div key={'f'}> 
                <div  style={{background: "black"}}>
				        <a class="link link--nukun" >ad<span>o</span>pt</a>       
                </div>
              </div>
               <div key={'k'}> 
                <div style={{background: "red"}} >
				        <a  class="link link--nukun" >g<span>e</span>t</a>       
                </div>
              </div>
                <div key={'g'}> 
                <div  style={{background: "#000035"}}>
			          	<a class="link link--ilin"><span>A_</span><span> Cat</span></a>
                </div>
              </div>
                <div  key={'i'}>
                <FlickrImage   imgClass="effect-zoe" key="3837389579"  title="Black cat no.67" subTitle=" :3" id="3837389579" secret="d8eea2e9e0" farm="3" server="2580"/>             
              </div>
              
              <div  key={'j'}>
                <FlickrImage  imgClass="effect-sadie"key="16298657569"  title="london" subTitle="visit london" id="16298657569" secret="b606bae4fe" farm="8" server="7426"/>             
              </div>
                <div  key={'p'}>
                <FlickrImage  imgClass="effect-sadie"key="35362641780"  title="Painting" subTitle="learn to paint" id="35362641780" secret="f3c1867e95" farm="5" server="4237"/>             
              </div>
             </ReactGridLayout>
             </div>
            <hr></hr>
            
      </div>
    );
  }
}
