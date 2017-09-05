import React from "react";

import FlickrImage from "../components/FlickrImage";

import VisionImage from "../components/VisionImage";

import axios from 'axios';

import PaginationSmall from "../components/PaginationSmall";

  import { ToastContainer, toast } from 'react-toastify';

  import YokoInput from '../components/YokoInput';



export default class ImageSearch extends React.Component {
  
      constructor(){
        super();
      
         this.state = {
            photos: [],
            displayPhotos:[],
            dreamBoardId:"238skl",
            searchValue:""
            };
        this.onChangePage = this.onChangePage.bind(this);

    }

 onImageSelected(data){

}

  onChangePage(displayPhotos) {
        // update state with new page of items
        this.setState({ displayPhotos: displayPhotos });
    }

  handleChange(e){
      const searchValue = e.target.value;
      this.setState({searchValue},this.searchPhotos);
    
  }

 
 searchPhotos(){
     this.cancelCurrentSearch();
     var CancelToken = axios.CancelToken;
     var source = CancelToken.source();
     this.setState({source});
       axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bcc7650f62be995230ba1fa41d4a67e9&text=`+this.state.searchValue+`&sort=relevance&safe_search=2&content_type=1&per_page=120&format=json&nojsoncallback=1`,{cancelToken: source.token})
      .then(res => {
        //  console.log("ress "+JSON.stringify(res));
        const photos = res.data.photos.photo;
        this.setState({ photos });
      }).catch(function(thrown) {
        if (axios.isCancel(thrown)) {
            // console.log('Request canceled');
        } else {
            console.log('error canceling');
        }
      }); 
 }

 cancelCurrentSearch (){
     if(this.state.source){
        this.state.source.cancel();
     }
 }

  render() {

    const photoSearchFilled = this.state.searchValue.length>0;
    const photoSearchInputClass = photoSearchFilled? " input--filled":"";
    
 const DisplayPhotos = this.state.displayPhotos.map((photo, i) =><div class="col-md-4"> <VisionImage onPhotoDoubleClick={this.props.onPhotoDoubleClick}  imgClass="effect-apollo" key={photo.id} onImageSelected={this.onImageSelected.bind(this)} title={photo.title} subTitle="Double click to add this image" src={'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_'+'c.jpg'}/> </div>);        
    if(DisplayPhotos.length<0){
        return(
            <div>
               <h1>Search Here</h1>
                <span class={"input input--yoko"+ photoSearchInputClass}>
                  <input class="input__field input__field--yoko" type="text" id="input-17" value={this.state.searchValue} onChange={this.handleChange.bind(this)} />
                  <label class="input__label input__label--yoko" for="input-17">
                    <span class="input__label-content input__label-content--yoko">Image Search</span>
                  </label>
                </span>       
         </div>
        );
    }
    return (
      <div>
        <div class="row">
          <div class="col-md-3">
          </div>
          <div class="col-md-6">
            <YokoInput value={this.state.searchValue} label={"Image Search"} onChange={this.handleChange.bind(this)} />
          </div>
          <div class="col-md-3">
          </div>
        </div>
        <div class="row">{DisplayPhotos}</div>
        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-9">
          <PaginationSmall items={this.state.photos} onChangePage={this.onChangePage}/>
          </div>
          <div class="col-md-1">
          </div>
        </div>
      </div>
    );
  }
}
