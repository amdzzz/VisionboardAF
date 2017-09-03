import React from "react";

export default class FlickrImage extends React.Component {

constructor(){
  super();
  this.state = {
    clickCount:0
  };
}

imgSelect(data)
{
  if(this.props.onImageSelected)
   this.props.onImageSelected(data);
  if(this.state.clickCount == 1){
    this.doubleClick(data);
    const clickCount = 0;
    this.setState({clickCount});
  }else{
    const clickCount = 1;
    this.setState({clickCount});
    setTimeout(function(){
      const clickCount = 0;
      this.setState({clickCount});
    }.bind(this),1000);
  }
}

  doubleClick(src){
    if(this.props.onPhotoDoubleClick)
       this.props.onPhotoDoubleClick(src);
  }

  render() {
    const { id } = this.props;
    const { title } = this.props;  
    const { primaryTextStyle } = this.props; 
    const { subTitle } = this.props;
    const { secondaryTextStyle } = this.props;
    const { src } = this.props;
    const { imgClass } = this.props;


    return (
				<div class="grid">
					<figure class={imgClass}>
						<img class="img-result" src={src} alt={title}/>
						<figcaption>
							<h2 style={primaryTextStyle} class="hvision">{title}</h2>
							<p style={secondaryTextStyle}> {subTitle}</p>
							<a onClick={function(e){this.imgSelect({src}); e.preventDefault();}.bind(this)}></a>
						</figcaption>			
					</figure>
				</div>
    );
  }
}
