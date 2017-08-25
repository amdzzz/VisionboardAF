import React from "react";

export default class NinaButton extends React.Component {
  render() {
    const { btnClass } = this.props;
    const { btnText } = this.props;
    const { btnHoverText } = this.props;
    const { logo } = this.props;
    const innerText = btnHoverText!==undefined? btnHoverText.split("").map((e,i) => <span>{e}</span>) : btnText.split("").map((e,i) => <span>{e}</span>);
    const { onClickFn }= this.props;
    const { hide } = this.props;
    console.log("hide: ",hide);
    const hideClass = hide===true?" hidden":"";
    const btnClassFull = "button button--nina button--border-thin button--round-s button--nina-" +btnClass + hideClass; 
 
    if (logo!==undefined){
        const logoClass = logo + " pull-left";
        return (
        <div class="box">
            <button onClick={onClickFn} class={btnClassFull} data-text={btnText}>
            <span><i class={logoClass} aria-hidden="true"></i></span>{innerText}
            </button>
        </div>
        );
    }else{
        return (
        <div class="box">
            <button  onClick={onClickFn} class={btnClassFull} data-text={btnText}>
            {innerText}
            </button>
        </div>
        );
    }
  }
}
