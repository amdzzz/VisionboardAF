import React from "react";

export default class KumyaText extends React.Component {


  render() {
    const { text } = this.props;
    const { style } = this.props;
    const { onDoubleClick } = this.props;

    
   return <a  onDoubleClick={onDoubleClick} ref={this.props.inputRef} style={style} class="link link--kumya"><span data-letters={text}>{text}</span></a>

   
  }
}
