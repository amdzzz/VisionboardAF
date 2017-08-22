import React from "react";

import FlickrImage from "../components/FlickrImage";

import axios from 'axios';

import Pagination from "../components/Pagination";

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
    console.log("image selected: "+ JSON.stringify(data));
    //console.log("current user: " + JSON.stringify(this.props.user()));
 
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
    console.log("input span class",photoSearchInputClass);
    
 const DisplayPhotos = this.state.displayPhotos.map((photo, i) =><div class="col-md-4"> <FlickrImage  imgClass="effect-bubba" key={photo.id} onImageSelected={this.onImageSelected.bind(this)} title={photo.title} subTitle="Add this image" id={photo.id} secret={photo.secret} farm={photo.farm} server={photo.server}/> </div>);        
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
          <ToastContainer 
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <div class="container">
          <YokoInput value={this.state.searchValue} label={"Image Search"} onChange={this.handleChange.bind(this)} />
        </div>
        <div class="row">{DisplayPhotos}</div>
        <Pagination items={this.state.photos} onChangePage={this.onChangePage}/>
      </div>
    );
  }
}
