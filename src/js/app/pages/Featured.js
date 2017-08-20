import React from "react";

import Article from "../components/Article";

export default class Featured extends React.Component {
  render() {
    const Articles = [
      {name:"Happy" ,photo:"/img/13.jpg"},
        {name:"Wanderlust",photo:"/img/14.jpg"},
        {name:"Excited",photo:"/img/15.jpg"},
        {name:"Nervous",photo:"/img/16.jpg"},
        {name:"Content",photo:"/img/17.jpg"},
        {name:"Crippling Depression",photo:"/img/18.jpg"},
        {name:"Joyus",photo:"/img/19.jpg"},
        {name:"Schwifty",photo:"/img/12.jpg"},
        {name:"Presidential",photo:"/img/11.jpg"},
        {name:"Confident",photo:"/img/10.jpg"},
        {name:"Blessed",photo:"/img/20.jpg"},
        {name:"Surprized",photo:"/img/21.jpg"},
    ].map((title, i) => <Article key={i} title={title.name} photo={title.photo}/> );

    console.log("featured");
    return (
      <div>
        <div class="row">{Articles}</div>
      </div>
    );
  }
}
