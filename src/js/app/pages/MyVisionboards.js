import React from "react";
import { Link } from 'react-router';
import Article from "../components/Article";
import { Modal, Tooltip, Popover, Button, OverlayTrigger,DropdownButton, MenuItem } from "react-bootstrap";
import NinaButton from "../components/NinaButton";
import YokoInput from "../components/YokoInput";
import ColorPickerWrapper from '../components/ColorPickerWrapper';
var ReactGridLayout = require('react-grid-layout');


export default class MyVisionboards extends React.Component {

  constructor(){
    super();
    this.state={
      showCreateDreamboardModal: false, 
      createDreamboardTitle:"",
      createDreamboardBGStyle:{background: "black"},
      createDreamboardBorderStyle:{border:"6px solid white"}
    };
  }


  handleChangecreateDreamBoardBG = (color) => {
    console.log("recievedColor ",color)
    const createDreamboardBGStyle = {background:color.hex};
    this.setState({createDreamboardBGStyle});
  };

  handleChangecreateDreamBoardBorder = (color) => {
   console.log("recieved color ",color);
   const createDreamboardBorderStyle = {border:"6px solid "+color.hex};
   this.setState({createDreamboardBorderStyle});
  };

  handleDreamboardTitleChange(e){
    const createDreamboardTitle = e.target.value;
    this.setState({createDreamboardTitle});
  }
  
  closeCreateDreamboardModal() {
    this.setState({showCreateDreamboardModal: false});
    console.log("teest",this.state);
  }

  openCreateDreamboardModal() {
    this.setState({ showCreateDreamboardModal: true });
    console.log("teest",this.state);
    
  }

  createDreamboard(){
    console.log("create dreamboard");
  }

  render() {
    const layout=[];
    const authed = this.props.route.authed();
    const onClickFn = this.openCreateDreamboardModal.bind(this);
    console.log("on main page authed: " + authed)
    console.log("MyVisionboards");
    if(!authed){
       return (
        <div>
          <div class="row">
            <div class="col-md-12">
                <h1 class="bsd-title" >My Visionboards</h1>
      
                 <h1> Please log in with google to create or view your Visionboards.</h1>
                 <h1> See our Demo for more info on what you can create.</h1>
            </div>
           


          </div>
                                  <hr></hr>

        </div>
      );
    }else{
    return (
        <div>
          <div class="row">
            <div class="col-md-12">
                <h1 class="bsd-title" >My Visionboards</h1>
            </div>
            <div class="col-md-4 pull-right">
                
                    <NinaButton btnText="Create" 
                    btnClass="primary" 
                    onClickFn={onClickFn.bind(this)} />
            </div>


          </div>
                                  <hr></hr>

         <Modal bsSize="large" show={this.state.showCreateDreamboardModal} onHide={this.closeCreateDreamboardModal.bind(this)}>
          <Modal.Header closeButton>
            <h1 class="bsd-title">Create a Visionboard</h1>
          </Modal.Header>
          <Modal.Body>
            <div class="row">
            <div class="col-md-6">
              <YokoInput label="Title" value={this.state.createDreamboardTitle} onChange={this.handleDreamboardTitleChange.bind(this)}/>
           </div>
           <div class="col-md-6">
              <ColorPickerWrapper handleChange={this.handleChangecreateDreamBoardBG.bind(this)} color={{
                r:'0',g:'0',b:'0',a:'1'
              }}/>
              <p class="demo-title">Background Color</p>
               <ColorPickerWrapper handleChange={this.handleChangecreateDreamBoardBorder.bind(this)} />
              <p class="demo-title">Border Color</p>

           </div>
           </div>
          <div  style={this.state.createDreamboardBorderStyle} >
            <ReactGridLayout   style={this.createDreamboardBGStyle}  cols={12} rowHeight={30} width={1200} layout={layout} >
             <div></div>
             <div></div>
             <div></div>
             <div></div>
              <div></div>
             <div></div>
             <div></div>
             <div></div>
              </ReactGridLayout>
              </div>
            </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.createDreamboard.bind(this)}>Create</Button>
            <Button bsStyle="secondary" onClick={this.closeCreateDreamboardModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

       
        </div>
      );
    }
  }
}