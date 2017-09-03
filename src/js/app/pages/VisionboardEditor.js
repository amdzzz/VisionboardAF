import React from "react";
import NinaButton from '../components/NinaButton';
import YokoInput from '../components/YokoInput';
import { Modal, Tooltip, Popover, Button, OverlayTrigger,DropdownButton, MenuItem } from "react-bootstrap";
import ColorPickerWrapper from '../components/ColorPickerWrapper';
import VisionText from '../components/VisionText';
var ReactGridLayout = require('react-grid-layout');
import AlertContainer from 'react-alert';
import FlickrImage from '../components/FlickrImage';
import VisionImage from '../components/VisionImage';
import ImageSearch from './ImageSearch';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
export default class VisionboardEditor extends React.Component {

  constructor(){
    super();
    this.state={
      visionboardTitle:"",
      edit:false,
      addTextBGStyle:{background:"red"},
      addTextText:"text",
      addTextEffect:"kumya",
      showAddTextModal:false,
       alertOptions : {
          offset: 14,
          position: 'top right',
          theme: 'light',
          time: 5000,
          transition: 'scale'
        },
      showAddPhotoModal:false,
      addPhotoPrimaryText:"Primary",
      addPhotoSecondaryText:"Secondary text here",
      addPhotoPrimaryTextStyle:{color:"black"},
      addPhotoSecondaryTextStyle:{color:"black"},
      addPhotoImgClass:"effect-steve",
      addPhotoSrc:"https://education.microsoft.com/Assets/images/workspace/placeholder-camera-760x370.png",
      addPhotoUrl:"",
      layout:[],
      layoutElements:[]
     };
     
  }

  changeImageEffect(eventKey){
    const addPhotoImgClass = eventKey;
    this.setState({addPhotoImgClass});
  }

  handleAddTextBGChange = (color) => {
    const addTextBGStyle = {background:color.hex};
    this.setState({addTextBGStyle});
  };

  handleAddTextChange(e){
    const addTextText = e.target.value;
    this.setState({addTextText});
    if(addTextText.length>=10){
      this.msg.show('Text limited to 10 characters', {
      time: 3000,
      icon: <i class="fa fa-info-circle font25"></i>
     });
    }
  }
  handleAddPhotoPrimaryTextChange(e){
    const addPhotoPrimaryText = e.target.value;
    this.setState({addPhotoPrimaryText});
    if(addPhotoPrimaryText.length>=15){
      this.msg2.show('Text limited to 15 characters', {
      time: 3000,
      icon: <i class="fa fa-info-circle font25"></i>
     });
    }
  }
  handleAddPhotoPrimaryTextStyleChange(color){
    const addPhotoPrimaryTextStyle ={color:color.hex};
    this.setState({addPhotoPrimaryTextStyle});
  }
   handleAddPhotoSecondaryTextChange(e){
    const addPhotoSecondaryText = e.target.value;
    this.setState({addPhotoSecondaryText});
    if(addPhotoSecondaryText.length>=30){
      this.msg2.show('Text limited to 30 characters', {
      time: 3000,
      icon: <i class="fa fa-info-circle font25"></i>
     });
    }
  }
  handleAddPhotoSecondaryTextStyleChange(color){
    const addPhotoSecondaryTextStyle = {color:color.hex};
    this.setState({addPhotoSecondaryTextStyle});
  }

  handleAddTextStyleChange(eventKey){
    const addTextEffect = eventKey;
    this.setState({addTextEffect});
  }
  
  closeAddTextModal() {
    this.setState({showAddTextModal: false});
  }

  openAddTextModal() {
    this.setState({ showAddTextModal: true});
  }
  closeAddPhotoModal() {
    this.setState({showAddPhotoModal: false});
  }

  openAddPhotoModal() {
    this.setState({ showAddPhotoModal: true});
  }
  addTextToBoard(){
    const visionboardId = this.props.id;
    const text = this.state.addTextText;
    const effect = this.state.addTextEffect;
    const backgroundStyle = this.state.addTextBGStyle;
    var w = Math.abs((Math.round((this.inputElement.clientWidth+35)/100 * 2) / 2).toFixed(1));
    const h = (this.inputElement.clientHeight/35);
    const x = 12;
    const y = 1200;
    const createdDate = Date.now();
    const completed = false;
    const data = {visionboardId,text,effect,backgroundStyle,w,h,x,y,completed,createdDate};
    const update = this.getSaveUpdates();
    this.props.firebase.database().ref().update(update).then((res)=>{
      this.visionboardTextElementsDb.push(data).then((result)=>{
        this.refreshBoard();
        this.closeAddTextModal();
      }).catch((error)=>{
        console.log("error",error);
      });
    });

  }

  addPhotoToBoard(){
    const visionboardId = this.props.id;
    const primaryText = this.state.addPhotoPrimaryText;
    const primaryTextStyle = this.state.addPhotoPrimaryTextStyle;
    const secondaryText = this.state.addPhotoSecondaryText;
    const secondaryTextStyle = this.state.addPhotoSecondaryTextStyle;
    const imgClass = this.state.addPhotoImgClass;
    const imgSrc = this.state.addPhotoSrc;
    const w = 3;
    const h = 8;
    const x = 12;
    const y = 1200;
    const completed = false;
    const createdDate = Date.now();
    const data = {visionboardId,imgSrc,imgClass,primaryText,primaryTextStyle,secondaryText,secondaryTextStyle,w,h,x,y,completed,createdDate};
    const update = this.getSaveUpdates();
    this.props.firebase.database().ref().update(update).then((res)=>{
       this.visionboardPhotoElementsDb.push(data).then((result)=>{
          this.refreshBoard();
          this.closeAddPhotoModal();
       }).catch((error)=>{
          console.log("error",error);
        });
    });
   
  }

  refreshBoard(){
    this.destroyListeners();
    this.setUp();
  }

  handleAddPhotoCustomUrlChange(e){
    const addPhotoUrl = e.target.value;
    this.setState({addPhotoUrl});
  }

  loadUrl(addPhotoSrc){
    this.setState({addPhotoSrc});
  }

  loadCustomUrl(){
    this.loadUrl(this.state.addPhotoUrl);
  }

  photoSelected(src){
    this.loadUrl(src.src);
  }
  componentWillUnmount(){
    this.destroyListeners();
  }

  destroyListeners(){
    this.visionboardTextElements.off();
    this.visionboardPhotoElements.off();
  }

  componentDidMount(){
    this.setUp();
    const {edit}=this.props;
    this.setState({edit});
  }

  setUp(){
    this.setState({
      visionboardTitle:"",
      addTextBGStyle:{background:"red"},
      addTextText:"Text",
      addTextEffect:"kumya",
      showAddTextModal:false,
      alertOptions : {
          offset: 14,
          position: 'top right',
          theme: 'light',
          time: 5000,
          transition: 'scale'
        },
      showAddPhotoModal:false,
      addPhotoPrimaryText:"Primary",
      addPhotoSecondaryText:"Secondary text here",
      addPhotoPrimaryTextStyle:{color:"black"},
      addPhotoSecondaryTextStyle:{color:"black"},
      addPhotoImgClass:"effect-steve",
      addPhotoSrc:"https://education.microsoft.com/Assets/images/workspace/placeholder-camera-760x370.png",
      addPhotoUrl:"",
      layout:[],
      layoutElements:[]
     });
    if(this.props.firebase){
      this.visionboardPhotoElementsDb = this.props.firebase.database().ref("/visionphoto");
      this.visionboardTextElementsDb = this.props.firebase.database().ref("/visiontext");
      this.visionboardTextElements = this.props.firebase.database().ref("/visiontext").orderByChild("visionboardId").equalTo(this.props.id);
      this.visionboardPhotoElements = this.props.firebase.database().ref("/visionphoto").orderByChild("visionboardId").equalTo(this.props.id);
      this.visionboardElement = this.props.firebase.database().ref("/visionboards/"+this.props.id);
    }
    if(this.props.demo){
      console.log("demo mode");
        const { demo } = this.props;
        const { title } = demo;
        const { layout } = demo;
        const { backgroundStyle } = demo;
        const { borderStyle } = demo;
        this.setState({title,demo,layout,backgroundStyle,borderStyle});
        const { edit } = this.state;

    }else{
      const { id } = this.props ;
      this.setState({id});
      this.setUpVisionboard();
    }
  }
  
  createElement(el) {
    const i = el.i;
    const type = el.type;
    const completed = el.completed;
    var span = null;
    if(!this.state.edit){
        removeStyle = {
            position: 'absolute',
            right: '2px',
            top: 0,
            color:'green',
            fontSize:"25px",
            textShadow: "0 0 5px white",
            zIndex:"999",
        };
        if(completed){
            span = <span className="remove" style={removeStyle}><i class="fa fa-check-circle"></i></span>
        }
    
    } else{
      var removeStyle = {
        position: 'absolute',
        right: '2px',
        top: 0,
        cursor: 'pointer',
        color:'white',
        fontSize:"25px",
        textShadow: "0 0 5px black",
        zIndex:"999"
      };
       span = <span className="remove" style={removeStyle} onClick={function(){this.deleteElement(i,type);}.bind(this)}><i class="fa fa-times-circle"></i></span>
    }
    if (type === "text"){ 
       return (
            <div key={i} data-grid={el}>
              {span}
              <VisionText onDoubleClick={function(){this.markElementAsCompleted(i,type,completed);}.bind(this)} key={i} style={el.backgroundStyle} text={el.text} effect={el.effect} /> 
            </div>
          );
    }else{
       return (
          <div key={i} data-grid={el}>
            {span}
              <VisionImage onPhotoDoubleClick={function(){this.markElementAsCompleted(i,type,completed);}.bind(this)} key={i} primaryTextStyle={el.primaryTextStyle} secondaryTextStyle={el.secondaryTextStyle}  imgClass={el.imgClass}  title={el.primaryText} subTitle={el.secondaryText}  src={el.imgSrc}/>             
          </div>
          );
    }
   
  }

  deleteElement(elementId,type){
    const update = this.getSaveUpdates();
    this.props.firebase.database().ref().update(update).then((res)=>{
        if(type === "text"){
          this.props.firebase.database().ref("/visiontext/"+elementId).remove();
          this.refreshBoard();
        }
        else{
          this.props.firebase.database().ref("/visionphoto/"+elementId).remove();
          this.refreshBoard();
        }
    });
   
  }

  markElementAsCompleted(elementId,type,completed){
    if(!this.state.edit){
    const update = {};
    switch(type){
      case "text":{
        update['/visiontext/'+elementId+"/completed"]=!completed;
        break;        
      }
      case "photo":{
        update['/visionphoto/'+elementId+"/completed"]=!completed;   
        break;     
      }
    }
    this.props.firebase.database().ref().update(update).then((result)=>{
      this.refreshBoard();
      this.mainMsg.show('Succsfully updated board', {
        time: 3000,
        icon: <i style={{color:"green",fontSize:"2em"}} class="fa fa-check-circle font25"></i>
      });    
    }).catch((error)=>{
      console.log("error saving visionboard");
      this.mainMsg.show('Error saving board', {
      time: 3000,
      icon: <i style={{color:"green",fontSize:"2em"}} class="fa fa-exclamation-circle font25"></i>
     });
    });
  }
  }

  setUpVisionboard(){
    var layout = [];
    var layoutElements = [];
  
    if(this.visionboardElement){
      this.visionboardElement.once('value',function(snapshot){
        const visionboardTitle = snapshot.child("title").val();
        const visionboardBackgroundStyle = snapshot.child("backgroundStyle").val();
        const visionboardBorderStyle = snapshot.child("borderStyle").val();
        this.setState({visionboardTitle,visionboardBackgroundStyle,visionboardBorderStyle})
      }.bind(this));

    }
    if(this.visionboardTextElements){
      
      this.visionboardTextElements
        .on("child_added", function(snapshot) {
          const el =this.getTextElementForLayout(snapshot)
          const layout = [...this.state.layout,el];
          this.setState({layout});
        }.bind(this));
  }
    if(this.visionboardPhotoElements){
      this.visionboardPhotoElements
        .on("child_added", function(snapshot) {  
          const el =this.getPhotoElementForLayout(snapshot)
          const layout = [...this.state.layout,el];
          this.setState({layout});
        }.bind(this));
       }
  }


  onLayoutChange(layout){
    const dirtyLayout = layout;
    this.setState({dirtyLayout});
  }

  getTextElementForLayout(element){
    const w = element.child("w").val();
    const h = element.child("h").val();
    const x = element.child("x").val();
    const y = element.child("y").val();
    const i = element.key;
    const isResizable = false;
    const isDraggable = this.state.edit;
    const text = element.child("text").val();
    const effect = element.child("effect").val();
    const backgroundStyle = element.child("backgroundStyle").val();
    const completed = element.child("completed").val();
    const type= "text";
    const el = {w,h,x,y,i,isResizable,isDraggable,type,text,effect,backgroundStyle,completed};
    return el;
  }



  getPhotoElementForLayout(element){
    const w = element.child("w").val();
    const h = element.child("h").val();
    const x = element.child("x").val();
    const y = element.child("y").val();
    const i = element.key;
    const isResizable = false;
    const isDraggable = this.state.edit;
    const primaryText = element.child("primaryText").val();
    const primaryTextStyle = element.child("primaryTextStyle").val();
    const secondaryText = element.child("secondaryText").val();
    const secondaryTextStyle = element.child("secondaryTextStyle").val();
    const imgClass = element.child("imgClass").val();
    const imgSrc = element.child("imgSrc").val();
    const completed = element.child("completed").val();
    const type= "photo";
    const el = {w,h,x,y,i,isResizable,isDraggable,type,primaryText,secondaryText,primaryTextStyle,secondaryTextStyle,imgClass,imgSrc,completed};
    return el;
  }


  saveBoard(){
    const update = this.getSaveUpdates();
    this.props.firebase.database().ref().update(update).then((result)=>{
      this.refreshBoard();
      this.mainMsg.show('Succsfully saved vision board', {
        time: 3000,
        icon: <i style={{color:"green",fontSize:"2em"}} class="fa fa-check-circle font25"></i>
      });    
    }).catch((error)=>{
      console.log("error saving visionboard");
      this.mainMsg.show('Error saving layout', {
      time: 3000,
      icon: <i style={{color:"green",fontSize:"2em"}} class="fa fa-exclamation-circle font25"></i>
     });
    });
   
  }

  getSaveUpdates(){
        var update = {};
    _.forEach(this.state.dirtyLayout,(value,index)=>{
      if(value.h<8){
        update['/visiontext/'+value.i+"/x"]=value.x>=0?value.x:0;
        update['/visiontext/'+value.i+"/y"]=value.y>=0?value.y:0;
      }else{
        update['/visionphoto/'+value.i+"/x"]=value.x>=0?value.x:0;
        update['/visionphoto/'+value.i+"/y"]=value.y>0?value.y:0;
      }
    });
    return update;
  }

 closeVisionBoard(){
   this.props.closeBoard();
 }


  render() {
    const title = this.state.title;
    const addTextButton = <div class="pull-right"><NinaButton hide={!this.state.edit} onClickFn={this.openAddTextModal.bind(this)} btnText="Add Text" btnHoverText="add" btnClass="primary" /></div>;
    const addPhotoButton = <NinaButton hide={!this.state.edit} onClickFn={this.openAddPhotoModal.bind(this)} btnText="Add Photo" btnHoverText="add" btnClass="primary" />;
    const deleteButton = <NinaButton hide={!this.state.edit} onClickFn={this.props.deleteVisionBoard} btnText="Delete" btnHoverText="delete" btnClass="danger" />;
    const saveBoardButton = <NinaButton hide={!this.state.edit} onClickFn={function(){ this.setState({edit:false},function(){ this.saveBoard();}.bind(this));}.bind(this)} btnText="Save" btnHoverText="save" btnClass="success" />;    
    const editButton = <NinaButton hide={this.state.edit} onClickFn={function(){this.setState({edit:true}); this.refreshBoard();}.bind(this)} btnText="Edit" btnHoverText="edit" btnClass="primary" />;
    const doneButton = <NinaButton hide={this.state.edit} onClickFn={this.closeVisionBoard.bind(this)} btnText="Done" btnHoverText="done" btnClass="success" />;
    const nothingHere = this.state.layout.length==0?<h2>To add to your vision board, click 'edit' then 'add text' or 'add photo'</h2>:<div></div>;
    const tooltip = (
      <Tooltip id="modal-tooltip">
        Text limited to 10 characters.
      </Tooltip>
    ); const tooltip2 = (
      <Tooltip id="modal-tooltip">
        Text limited to 15 characters.
      </Tooltip>
    ); const tooltip3 = (
      <Tooltip id="modal-tooltip">
        Text limited to 30 characters.
      </Tooltip>
    ); const popoverText = (
      <Popover id="popover-positioned-right" title="How To Add Text To Your Vision Board">
        <h4 style={{color:"black"}}>1.Enter your custom text<br/> <br/>
        2.Select the effect and background color<br/><br/>
        3.Click 'Add'</h4>
      </Popover>
    ); const popoverPhoto = (
      <Popover id="popover-positioned-right" title="How To Add A Photo To Your Vision Board">
        <h4 style={{color:"black"}}>1.Select an Image<br/>
        -Paste in a custom url and click 'load'<br/>
        -Enter a search term in the 'Image Search' and Double click on an image to select it<br/><br/>
         2.Select an Image Effect.<br/><br/>
         3.Enter Primary / Secondary Text <br /><br/>
         4.Customize Primary / Secondary Text Color <br/><br/>
         5.Click 'Add'</h4>
      </Popover>
      
    );
    const popoverVisionboardComplete = (
      <Popover id="popover-positioned-right" title="">
        <h4 style={{color:"black"}}>
        Double click on a text or photo element to mark it as completed</h4>
      </Popover>
    ); 
    
    
    const overlay = !this.state.edit?<OverlayTrigger trigger="click" placement="right" overlay={popoverVisionboardComplete}>
    <h3 class="pull-left marginLeft1em"><i class="fa fa-info-circle"></i></h3>
  </OverlayTrigger>: <div></div>;
    return (
      <div>
        <div class="row">
        <AlertContainer ref={a => this.mainMsg = a} {...this.state.alertOptions} />

          <div class="col-md-4">
            <h1 class="pull-left">{this.state.visionboardTitle}</h1>{overlay}
          </div>
          <div class="col-md-2">
               {addTextButton}
          </div> 
          <div class="col-md-2">
               {addPhotoButton}
          </div>
          <div class="col-md-2">
              {editButton}
               {saveBoardButton}
          </div> 
          <div class="col-md-2">
            {doneButton}
            {deleteButton}
          </div>          
        </div>
        <div class="row marginBottom2em">
          <div class="width1200" style={this.state.visionboardBackgroundStyle}>
            <div class="width1200" style={this.state.visionboardBorderStyle}>
              <ReactGridLayout onLayoutChange={this.onLayoutChange.bind(this)} className="layout" layout={this.state.layout} cols={12} rowHeight={30} width={1200}>
                {_.map(this.state.layout, this.createElement.bind(this))}
              </ReactGridLayout>
            </div>
          </div>
        {nothingHere}
        </div>
        <Modal bsSize="large" show={this.state.showAddTextModal} onHide={this.closeAddTextModal.bind(this)}>
          <Modal.Header closeButton>
            <div class="text-center">
            <h1 class="wsg-title">Add Text</h1>            
            </div>
          </Modal.Header>
          <Modal.Body>
           <AlertContainer ref={a => this.msg = a} {...this.state.alertOptions} />
             <div class="row">
            <OverlayTrigger trigger="click" placement="right" overlay={popoverText}>
              <h3 class="pull-right marginRight2em"><i class="fa fa-info-circle"></i></h3>
            </OverlayTrigger>
             <div class="col-md-12">
              </div>
              <div class="col-md-3">
                </div>
              <div class="col-md-6 text-center">
                  <VisionText inputRef={el => this.inputElement = el} style={this.state.addTextBGStyle} text={this.state.addTextText} effect={this.state.addTextEffect}/>
              </div>
              <div class="col-md-3">
                </div>
             </div>
            <div class="row marginTop2em">
              <div class="col-md-1">
                </div>
                <div class="col-md-6">
                   <YokoInput maxlength="10" label="Text" value={this.state.addTextText} onChange={this.handleAddTextChange.bind(this)}/> <OverlayTrigger overlay={tooltip}><i class="marginTop2em fa fa-info-circle" describedby="modal-tooltip" ></i></OverlayTrigger>

                </div>
                <div class="col-md-2 marginTop2em form-responsive" >
                  <DropdownButton  bsStyle="primary" title={this.state.addTextEffect} id="bg-nested-dropdown">
                    <MenuItem onSelect={this.handleAddTextStyleChange.bind(this)}  eventKey="ilin">Ilin</MenuItem>
                    <MenuItem onSelect={this.handleAddTextStyleChange.bind(this)}  eventKey="kukuri">Kukuri</MenuItem>  
                    <MenuItem onSelect={this.handleAddTextStyleChange.bind(this)}  eventKey="kumya">Kumya</MenuItem>
                    <MenuItem onSelect={this.handleAddTextStyleChange.bind(this)}  eventKey="nukun">Nukun</MenuItem>
                  </DropdownButton>
                                    <p class="demo-title">Text Effect</p>
                </div>
                  <div class="col-md-2 marginTop2em form-responsive">
                  <ColorPickerWrapper handleChange={this.handleAddTextBGChange.bind(this)} color={{
                    r:'255',g:'0',b:'0',a:'1'}}/>
                  <p class="demo-title">Background Color</p>
                  </div>
                <div class="col-md-1">
                </div>
           </div>
         
            </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.addTextToBoard.bind(this)}>Add</Button>
            <Button  onClick={this.closeAddTextModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
         <Modal bsSize="large" show={this.state.showAddPhotoModal} onHide={this.closeAddPhotoModal.bind(this)}>
          <Modal.Header closeButton>
            <div class="text-center">
            <h1 class="wsg-title">Add Photo</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
           <AlertContainer ref={a => this.msg2 = a} {...this.state.alertOptions} />
            <div class="row">
              <OverlayTrigger trigger="click" placement="right" overlay={popoverPhoto}>
              <h3 class="pull-right marginRight2em"><i class="fa fa-info-circle"></i></h3>
            </OverlayTrigger>
             <div class="col-md-2">
             </div>
             <div class="col-md-6">
                <YokoInput label="Custom Photo URL" value={this.state.addPhotoUrl} onChange={this.handleAddPhotoCustomUrlChange.bind(this)}/> 
             </div>
             <div class="col-md-2 " style={{marginTop:".8em"}}>
               <NinaButton btnClass="primary" btnText="load" onClickFn={this.loadCustomUrl.bind(this)}/>
            </div>
            <div class="col-md-2">
            </div>
           </div>
           <div class="row">
             <div class="col-md-12">
             <ImageSearch onPhotoDoubleClick={this.photoSelected.bind(this)} />
             </div>
           </div>
            <div class="row">
              <div class="col-md-4">
              </div>
              <div class="col-md-6 marginBottom2em marginRight2em">
                <VisionImage primaryTextStyle={this.state.addPhotoPrimaryTextStyle} secondaryTextStyle={this.state.addPhotoSecondaryTextStyle}  imgClass={this.state.addPhotoImgClass} key="34728344012"  title={this.state.addPhotoPrimaryText} subTitle={this.state.addPhotoSecondaryText} id="34728344012" src={this.state.addPhotoSrc}/>             
              </div>
              <div class="col-md-3">
              </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                </div>
                <div class="col-md-2">
              </div>
               <div class="col-md-2 form-responsive" style={{marginBottom:"15px", paddingLeft:"3.5em"}}>
                    <DropdownButton  bsStyle="primary" title={this.state.addPhotoImgClass.split("-")[1]} id="bg-nested-dropdown">
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
                    <p class="demo-title">Image effect</p>
              </div>
              <div class="col-md-2">
              </div>
              <div class="col-md-3">
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
              </div>
              <div class="col-md-6">
                  <YokoInput maxlength="15" label={"Primary Text"} value={this.state.addPhotoPrimaryText} onChange={this.handleAddPhotoPrimaryTextChange.bind(this)}/> <OverlayTrigger overlay={tooltip2}><i class="marginTop2em fa fa-info-circle" describedby="modal-tooltip" ></i></OverlayTrigger>
              </div>   
                <div class="col-md-2 marginTop2em form-responsive">
                <ColorPickerWrapper handleChange={this.handleAddPhotoPrimaryTextStyleChange.bind(this)} color={{
                  r:'30',g:'32',b:'33',a:'1'}}/>
                <p class=" pull-left demo-title">Primary Text Color</p>
              </div>
              <div class="col-md-2">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
              </div>
              <div class="col-md-6">
                 <YokoInput maxlength="30" label="Secondary Text" value={this.state.addPhotoSecondaryText} onChange={this.handleAddPhotoSecondaryTextChange.bind(this)}/> <OverlayTrigger overlay={tooltip3}><i class="marginTop2em fa fa-info-circle" describedby="modal-tooltip" ></i></OverlayTrigger>
              </div>
              <div class="col-md-2 marginTop2em form-responsive">
                <ColorPickerWrapper handleChange={this.handleAddPhotoSecondaryTextStyleChange.bind(this)} color={{
                  r:'30',g:'32',b:'33',a:'1'}}/>
                <p class="demo-title">Secondary Text Color</p>
              </div>
              <div class="col-md-2">
              </div>
           </div>
          
           
            </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.addPhotoToBoard.bind(this)}>Add</Button>
            <Button  onClick={this.closeAddTextModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
