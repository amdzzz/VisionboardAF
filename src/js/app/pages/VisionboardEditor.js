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



export default class VisionboardEditor extends React.Component {

  constructor(){
    super();
    this.state={
      title:"",
      edit:false,
      addTextBGStyle:{background:"red"},
      addTextText:"kumya",
      addTextEffect:"kumya",
      showAddTextModal:false,
       alertOptions : {
          offset: 14,
          position: 'top left',
          theme: 'dark',
          time: 5000,
          transition: 'scale'
        },
      showAddPhotoModal:false,
      addPhotoPrimaryText:"Primary",
      addPhotoSecondaryText:"Secondary text here",
      addPhotoPrimaryTextStyle:{color:"black"},
      addPhotoSecondaryTextStyle:{color:"black"},
      demoImgClass:"effect-steve",
      addPhotoSrc:"https://farm3.staticflickr.com/2580/3837389579_d8eea2e9e0_c.jpg",
      addPhotoUrl:""
     };
     
  }

  changeImageEffect(eventKey){
    const demoImgClass = eventKey;
    this.setState({demoImgClass});
  }

  handleAddTextBGChange = (color) => {
    console.log("recievedColor ",color)
    const addTextBGStyle = {background:color.hex};
    this.setState({addTextBGStyle});
  };

  handleAddTextChange(e){
    const addTextText = e.target.value;
    this.setState({addTextText});
    if(addTextText.length>=10){
      console.log("greater than or equal to 10");
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
      console.log("greater than or equal to 10");
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
      console.log("greater than or equal to 10");
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
    console.log("add text style change",eventKey);
  }
  
  closeAddTextModal() {
    this.setState({showAddTextModal: false});
    console.log("teest",this.state);
  }

  openAddTextModal() {
    this.setState({ showAddTextModal: true });
    console.log("teest",this.state);
    
  }
  closeAddPhotoModal() {
    this.setState({showAddPhotoModal: false});
    console.log("teest",this.state);
  }

  openAddPhotoModal() {
    this.setState({ showAddPhotoModal: true });
    console.log("teest",this.state);
    
  }
  addTextToBoard(){
    console.log("add text");
  }

  handleAddPhotoCustomUrlChange(e){
    const addPhotoUrl = e.target.value;
    this.setState({addPhotoUrl});
  }

  loadUrl(addPhotoSrc){
    console.log("load Url,",addPhotoSrc);
    this.setState({addPhotoSrc});
  }

  loadCustomUrl(){
    this.loadUrl(this.state.addPhotoUrl);
  }

  photoSelected(src){
    console.log("photo selected,",src.src);
    this.loadUrl(src.src);
  }

  componentDidMount(){
    console.log("did mount");
    if(this.props.demo){
      console.log("demo mode");
        const { demo } = this.props;
        const { title } = demo;
        const { layout } = demo;
        const { backgroundStyle } = demo;
        const { borderStyle } = demo;
        this.setState({title,demo,layout,backgroundStyle,borderStyle});
        const { edit } = this.props;
        if(edit){

          this.setState({edit});
        }
    }else{
      console.log("prod mode");
      this.fetchVisionBoard(this.props.id);
    }
  }

  render() {


    console.log("dreamboard editor render");
    console.log("state, ",this.state);
    const title = this.state.title;
    var layout = [
      {i: 'ag', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'bg', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'cg', x: 4, y: 0, w: 1, h: 2}
    ];
    console.log("edit",this.state.edit);
    const addTextButton = this.state.edit?<div class="pull-right"><NinaButton onClickFn={this.openAddTextModal.bind(this)} btnText="Add Text" btnHoverText="add" btnClass="primary" /></div>:<div></div>;
       const addPhotoButton = this.state.edit?<NinaButton onClickFn={this.openAddPhotoModal.bind(this)} btnText="Add Photo" btnHoverText="add" btnClass="primary" />:<div></div>;
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
    );
    
    return (
      <div>
        <div class="row">
          <div class="col-md-6">
            <h1 class="pull-right">{title}</h1>
          </div>
          <div class="col-md-3">
               {addTextButton}
          </div> 
          <div class="col-md-3">
               {addPhotoButton}
          </div>
        </div>
        <div class="width1200" style={this.state.backgroundStyle}>
          <div class="width1200" style={this.state.borderStyle}>
            <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
              <div key={'ag'}>a</div>
              <div key={'bg'}>b</div>
              <div key={'cg'}>c</div>
            </ReactGridLayout>
          </div>
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
             <div class="col-md-12">
              </div>
              <div class="col-md-3">
                </div>
              <div class="col-md-6 text-center">
                  <VisionText style={this.state.addTextBGStyle} text={this.state.addTextText} effect={this.state.addTextEffect}/>
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
              <div class="col-md-4">
              </div>
              <div class="col-md-6 marginBottom2em marginRight2em">
                <VisionImage primaryTextStyle={this.state.addPhotoPrimaryTextStyle} secondaryTextStyle={this.state.addPhotoSecondaryTextStyle}  imgClass={this.state.demoImgClass} key="34728344012"  title={this.state.addPhotoPrimaryText} subTitle={this.state.addPhotoSecondaryText} id="34728344012" src={this.state.addPhotoSrc}/>             
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
                    <DropdownButton  bsStyle="primary" title={this.state.demoImgClass.split("-")[1]} id="bg-nested-dropdown">
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
           <div class="row">
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
           
            </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.addTextToBoard.bind(this)}>Add</Button>
            <Button  onClick={this.closeAddTextModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
