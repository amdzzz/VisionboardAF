import React from "react";

export default class YokoInput extends React.Component {


  render() {
    const { label } = this.props;
    const { onChange } = this.props;
    const { value } = this.props;
    const { maxlength } = this.props;
    const isFilled = (value!==undefined && value.length>0)?true:false;
    const fillClass = isFilled?" input--filled":"";

    return (
        <span class={"input input--yoko"+fillClass}>
            <input maxLength={maxlength} class="input__field input__field--yoko" type="text" id="input-17" value={value} onChange={onChange} />
            <label class="input__label input__label--yoko" for="input-17">
                <span class="input__label-content input__label-content--yoko">{label}</span>
            </label>
        </span>
        
    );
  }
}
