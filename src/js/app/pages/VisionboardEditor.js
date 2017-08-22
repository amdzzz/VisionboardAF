import React from "react";
var ReactGridLayout = require('react-grid-layout');


export default class VisionboardEditor extends React.Component {

  constructor(){
    super();
    this.state={
      title:"",
    };
  }

  componentDidMount(){
    console.log("did mount");
    if(this.props.demo){
      console.log("demo mode");
        const { demo } = this.props;
        const { title } = demo;
        const { layout } = demo;
        const { backgroundStyle } = demo;
        const { borderStyle } = demo;
        this.setState({title,demo,layout,backgroundStyle,borderStyle});
    }else{
      console.log("prod mode");
      this.fetchVisionBoard(this.props.id);
    }
  }

  render() {
    console.log("dreamboard editor render");
    console.log("state, ",this.state);
    const title = this.state.title;
    var layout = [
      {i: 'ag', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'bg', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'cg', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <div>
        <h1 class="wsg-title">{title}</h1>
        <div style={this.state.backgroundStyle}>
          <div style={this.state.borderStyle}>
            <ReactGridLayout className="layout" layout={layout} cols={24} rowHeight={30} width={2400}>
              <div key={'ag'}>a</div>
              <div key={'bg'}>b</div>
              <div key={'cg'}>c</div>
            </ReactGridLayout>
          </div>
        </div>
      </div>
    );
  }
}
