import React from "react";
import { Link } from 'react-router';
import Article from "../components/Article";
import { Modal, Tooltip, Popover, Button, OverlayTrigger,DropdownButton, MenuItem } from "react-bootstrap";
import NinaButton from "../components/NinaButton";
import YokoInput from "../components/YokoInput";
import ColorPickerWrapper from '../components/ColorPickerWrapper';
import VisionboardEditor from './VisionboardEditor'; 


var ReactGridLayout = require('react-grid-layout');


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
    };
  }

  componentDidMount(){
    console.log("did mount");
    this.firebase=this.props.route.firebase;
    console.log("test mvb",this.firebase);
    this.visionboards = this.firebase.database().ref("/visionboards");
    if(this.props.route.user())
      this.visionboards.orderByChild("uid").equalTo(this.props.route.user().uid)
      .on("child_added",(snapshot)=>{
        console.log("dreamboard added:",snapshot.key);
      });
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
    console.log("create dreamboard");
    const title = this.state.createDreamboardTitle;
    const backgroundStyle = this.state.createDreamboardBGStyle;
    const borderStyle = this.state.createDreamboardBorderStyle;
    const user = this.props.route.user();
    const { uid } = user;
    console.log('user to save',user.uid);
    const data ={uid, title,backgroundStyle,borderStyle};
    // const demo ={id, title,backgroundStyle,borderStyle};
    // console.log("demo: ",demo);
    this.saveNewDreamboard(data).then((result)=>{
      console.log("succesfully saved new vboard,",result);
      const activeDreamboard = result.key;
      console.log("new key",activeDreamboard);
      this.setState({activeDreamboard});
      this.closeCreateDreamboardModal();
      this.showEditDreamboardPage(result);
    
  }).catch((error) =>{
        console.log("error saving new vboard",error);
   
        });
  }

  saveNewDreamboard(data){
     return this.visionboards.push(data);   
  }

  

  showEditDreamboardPage(demo){
    this.setState({demo});
  }

  render() {
    const layout=[];
    const authed = this.props.route.authed();
    const onClickFn = this.openCreateDreamboardModal.bind(this);
    console.log("on main page authed: " + authed)
    console.log("MyVisionboards ,user",this.props.route.user());
    if(!authed){
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
        const activeDreamboard = this.state.activeDreamboard!==null?<VisionboardEditor firebase={this.firebase} edit={true} id={this.state.activeDreamboard}/>: <div></div>;
    return (
        <div>
          <div class="row">
            <div class="col-md-12">
                <h1 class="wsg-title" >My Visionboards</h1>
            </div>
            <div class="col-md-4 pull-right">
                
                    <NinaButton hide={this.state.activeDreamboard!==null} btnText="Create" 
                    btnClass="primary" 
                    onClickFn={onClickFn.bind(this)} />
            </div>


          </div>
          <div class="row">
            {activeDreamboard}
            </div>
                                  <hr></hr>

         <Modal bsSize="large" show={this.state.showCreateDreamboardModal} onHide={this.closeCreateDreamboardModal.bind(this)}>
          <Modal.Header closeButton>
            <div class="text-center">
               <h1 class="wsg-title">Create a Visionboard</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
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
