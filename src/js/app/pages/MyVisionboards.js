import React from "react";
import { Link } from 'react-router';
import Article from "../components/Article";
import { Modal, Tooltip, Popover, Button, OverlayTrigger,DropdownButton, MenuItem } from "react-bootstrap";
import NinaButton from "../components/NinaButton"
import YokoInput from "../components/YokoInput"
import ColorPickerWrapper from '../components/ColorPickerWrapper'
import VisionboardEditor from './VisionboardEditor'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AlertContainer from 'react-alert'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  dataToJS 
} from 'react-redux-firebase'
import VisionboardPreview from '../components/VisionboardPreview';



var ReactGridLayout = require('react-grid-layout');

@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth'),
  account: pathToJS(firebase, 'profile')
}))
export default class MyVisionboards extends React.Component {

  constructor(){
    super();
    this.state={
      showCreateDreamboardModal: false, 
      createDreamboardTitle:"",
      createDreamboardBGStyle:{background: "#1e2021"},
      createDreamboardBorderStyle:{border:"6px solid white"},
      activeDreamboard:null,
      demo:{},
      edit:false,
      vbSet:false,
      visionboardPreviewList:[],
      alertOptions : {
          offset: 14,
          position: 'top left',
          theme: 'dark',
          time: 5000,
          transition: 'scale'
        },
    };
  }


  componentWillReceiveProps(){
    if(this.props.firebase && this.props.auth && !this.state.vbSet){
       var vbs = this.props.firebase.database().ref("visionboards");
      vbs.orderByChild("uid").equalTo(this.props.auth.uid)
        .on("child_added", function(snapshot) {
            const id = snapshot.key;
            const title = snapshot.child("title").val();
            var visionboardPreviewList = this.state.visionboardPreviewList;
            visionboardPreviewList.push(<div class="col-md-4"><VisionboardPreview key={id} onClick={()=>{this.setActiveVisionboard(id)}} id={id} title={title} /></div>)
            this.setState({visionboardPreviewList});
         }.bind(this));
          const vbSet = true;
          this.setState({vbSet});
    }
  }

  componentDidMount(){
    if(this.props.firebase && this.props.auth && !this.state.vbSet){
       var vbs = this.props.firebase.database().ref("visionboards");
      vbs.orderByChild("uid").equalTo(this.props.auth.uid)
        .on("child_added", function(snapshot) {
            const id = snapshot.key;
            const title = snapshot.child("title").val();
            var visionboardPreviewList = this.state.visionboardPreviewList;
            visionboardPreviewList.push(<div class="col-md-4"><VisionboardPreview key={id} onClick={()=>{this.setActiveVisionboard(id)}} id={id} title={title} /></div>)
            this.setState({visionboardPreviewList});
         }.bind(this));
          const vbSet = true;
          this.setState({vbSet});
    }
  }

  closeVisionBoard(){
    this.setState({activeDreamboard:null});
  }

  setActiveVisionboard(activeDreamboard){
    const edit = false;
    this.setState({activeDreamboard:null,edit},()=>{ this.setState({activeDreamboard});});     
   
  }  
  handleChangecreateDreamBoardBG = (color) => {
    const createDreamboardBGStyle = {background:color.hex};
    this.setState({createDreamboardBGStyle});
  };

  handleChangecreateDreamBoardBorder = (color) => {
   const createDreamboardBorderStyle = {border:"6px solid "+color.hex};
   this.setState({createDreamboardBorderStyle});
  };

  handleDreamboardTitleChange(e){
    const createDreamboardTitle = e.target.value;
    this.setState({createDreamboardTitle});
    
  }
  
  closeCreateDreamboardModal() {
    this.setState({showCreateDreamboardModal: false});
  }

  openCreateDreamboardModal() {
    this.setState({ showCreateDreamboardModal: true });
    
  }

  createDreamboard(){
    if(this.state.createDreamboardTitle.length<2){
      this.msg.show('title must have at least 2 chracters', {
      time: 3000,
      icon: <i class="fa fa-info-circle font25"></i>
     });
     return;
    }
    const title = this.state.createDreamboardTitle;
    const backgroundStyle = this.state.createDreamboardBGStyle;
    const borderStyle = this.state.createDreamboardBorderStyle;
    const uid = this.props.auth.uid;
    const data ={uid, title,backgroundStyle,borderStyle};
    this.saveNewDreamboard(data).then((result)=>{
      const activeDreamboard = result.key;
      const edit = true;
      this.setState({activeDreamboard,edit});
      this.closeCreateDreamboardModal();
      this.showEditDreamboardPage(result);
    
  }).catch((error) =>{
        console.log("error saving new vboard",error);
   
        });
  }

  saveNewDreamboard(data){
     return this.props.firebase.database().ref("visionboards").push(data);   
  }

  

  showEditDreamboardPage(demo){
    this.setState({demo});
  }

  render() {    
    const layout=[];
    const onClickFn = this.openCreateDreamboardModal.bind(this);   
    if(!this.props.account){
       return (
        <div>
          <div class="row">
            <div class="col-md-12">
                <h1 class="wsg-title" >My Visionboards</h1>
                <h1> Please log in with google to create or view your Visionboards.</h1>
                <h1> See our Demo for more info on what you can create.</h1>
            </div>
          </div>
          <hr></hr>
        </div>
      );
    }else{
        const activeDreamboard = this.state.activeDreamboard!==null?<VisionboardEditor closeBoard={this.closeVisionBoard.bind(this)} edit={this.state.edit} id={this.state.activeDreamboard}/>: <div></div>;
    return (
        <div>
          <div class="row">
            
            <div class="col-md-4 pull-right">       
             <NinaButton hide={this.state.activeDreamboard!==null} btnText="Create Vision Board" btnHoverText="create" btnClass="primary" onClickFn={onClickFn.bind(this)} />
            </div>
            <div class="col-md-12">
                <h1 class="wsg-title" >My Visionboards</h1>
            </div>
          </div>
          <div class="row">
            {activeDreamboard}
          </div>

          <div class="row">
            <hr></hr>
            {this.state.visionboardPreviewList}
          </div>
          <hr></hr>

         <Modal bsSize="large" show={this.state.showCreateDreamboardModal} onHide={this.closeCreateDreamboardModal.bind(this)}>
          <Modal.Header closeButton>
            
            <div class="text-center">
               <h1 class="wsg-title">Create a Visionboard</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AlertContainer ref={a => this.msg = a} {...this.state.alertOptions} />

            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-6">
                <YokoInput label="Title" value={this.state.createDreamboardTitle} onChange={this.handleDreamboardTitleChange.bind(this)}/>
              </div>
              <div class="col-md-2 marginTop2em form-responsive">
                  <ColorPickerWrapper handleChange={this.handleChangecreateDreamBoardBG.bind(this)} color={{
                    r:'30',g:'32',b:'33',a:'1'}}/>
                  <p class="demo-title">Background Color</p>
              </div>
               <div class="col-md-2 marginTop2em form-responsive">
                <ColorPickerWrapper handleChange={this.handleChangecreateDreamBoardBorder.bind(this)} />
                <p class="demo-title">Border Color</p>
              </div>
          <div class="col-md-1"></div>

           </div>
          <div  style={this.state.createDreamboardBorderStyle} >
            <div style={this.state.createDreamboardBGStyle}>
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
              </div>
            </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.createDreamboard.bind(this)}>Create</Button>
            <Button  onClick={this.closeCreateDreamboardModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

       
        </div>
      );
    }
  }
}
