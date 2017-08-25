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
    console.log("effect: " + effect,"text",text);
    switch(effect){
        case"ilin":{
            return <IlinText text={text} style={style}/>;
        }
        case"kukuri":{
            return <KukuriText text={text} style={style}/>;
        }
        case"kumya":{
            return <KumyaText text={text} style={style}/>;
        }
        case"nukun":{
            return <NukunText text={text} style={style}/>;
        }
        default:{
            return<div></div>
        }
    }
    
  }
}
