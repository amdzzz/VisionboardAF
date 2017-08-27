import React from "react";

export default class NukunText extends React.Component {


  render() {
    const { text } = this.props;
    const { style } = this.props;

    const middle = Math.ceil(text.length / 2);

    const s1 = text.length>3?text.substring(0, middle-1):text;
    const s2 = text.length>3?text.substring(middle-1,middle):"";
    const s3 = text.length>3?text.substring(middle):"";
    
   return <a  ref={this.props.inputRef} style={style} class="link link--nukun" >{s1}<span>{s2}</span>{s3}</a>


   
  }
}
