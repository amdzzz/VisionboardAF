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
    this.doubleClick();
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

  doubleClick(){
    console.log("double click");
  }

  render() {
    const { title } = this.props;
    const { farm } = this.props;
    const { server } = this.props;    
    const { id } = this.props;
    const { secret } = this.props;
    const { subTitle } = this.props;


    return (
				<div class="grid">
					<figure class={this.props.imgClass}>
						<img class="img-result" src={'https://farm'+farm+'.staticflickr.com/'+server+'/'+id+'_'+secret+'_'+'c.jpg'} alt={title}/>
						<figcaption>
							<h2 style={this.props.primaryTextStyle} class="hvision">{title}</h2>
							<p style={this.props.secondaryTextStyle}> {subTitle}</p>
							<a onClick={function(e){this.imgSelect({title,farm,server,id,secret}); e.preventDefault();}.bind(this)}></a>
						</figcaption>			
					</figure>
				</div>
    );
  }
}
