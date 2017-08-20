import React from "react";

export default class Article extends React.Component {
  render() {
    const { title } = this.props;
    const { photo } = this.props;


    return (
      <div class="col-md-4 ">
				<div class="grid">
					<figure class="effect-bubba">
						<img src={photo} alt="img16l"/>
						<figcaption>
							<h2>{title}</h2>
							<p>For when you're in a {title} mood.</p>
							<a href="#">View more</a>
						</figcaption>			
					</figure>
				</div>
      </div>
    );
  }
}
