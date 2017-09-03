import React from "react";
import IlinText from './visiontext/IlinText';
import KukuriText from  './visiontext/KukuriText';
import KumyaText from './visiontext/KumyaText';
import NukunText from  './visiontext/NukunText';

export default class VisionText extends React.Component {


  render() {
    const { effect } = this.props;
    const { text } = this.props;
    const { style } = this.props;
    const { onDoubleClick } = this.props;
    switch(effect){
        case"ilin":{
            return <IlinText onDoubleClick={onDoubleClick} inputRef={this.props.inputRef}  text={text} style={style}/>;
        }
        case"kukuri":{
            return <KukuriText onDoubleClick={onDoubleClick} inputRef={this.props.inputRef} text={text} style={style}/>;
        }
        case"kumya":{
            return <KumyaText onDoubleClick={onDoubleClick} inputRef={this.props.inputRef} text={text} style={style}/>;
        }
        case"nukun":{
            return <NukunText onDoubleClick={onDoubleClick} inputRef={this.props.inputRef} text={text} style={style}/>;
        }
        default:{
            return<div></div>
        }
    }
    
  }
}
