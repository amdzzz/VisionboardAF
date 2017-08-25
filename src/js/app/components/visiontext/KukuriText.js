import React from "react";

export default class KukuriText extends React.Component {


  render() {
    const { text } = this.props;
    const { style } = this.props;

    
   return  <a style={style} class="link link--kukuri"  data-letters={text}>{text}</a>          


   
  }
}
