import React from "react";

export default class IlinText extends React.Component {


  render() {
    const { text } = this.props;
    const { style } = this.props;

    const middle = Math.ceil(text.length / 2);  
    const s1 = text.length>1?text.substring(0, middle):text;
    const s2 = text.length>1?text.substring(middle):"";
    
   return <a style={style} class="link link--ilin"><span>{s1}</span><span>{s2}</span></a>


   
  }
}
