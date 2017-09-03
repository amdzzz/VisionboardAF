import React from "react";

export default class VisionboardPreview extends React.Component {
  render() {
    const { id } = this.props;
    const { title } = this.props;
    const { onClick } = this.props;

    return (<div class="cl-effect-8"><a onClick={onClick}>{title}</a></div>);
  }
}
