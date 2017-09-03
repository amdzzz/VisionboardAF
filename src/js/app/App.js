import React from "react";
import { Link } from "react-router";

import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from './pages/Layout';
import MyVisionBoards from './pages/MyVisionBoards';
import Contact from './pages/contact';
import About from './pages/about';
import Demo from './pages/demo';
import { Provider } from "react-redux";


export default class App extends React.Component {




  render() {

    const { location } = this.props;
    const {store} = this.props;

    return (
        <Provider store={store}>
          <Router history={hashHistory}>
            <Route path="/" component={Layout} location={location}  >
            <IndexRoute component={MyVisionBoards} ></IndexRoute>
            <Route path="about" name="about" component={About}></Route>
            <Route path="contact" name="contact" component={Contact} ></Route>
            <Route path="demo" name="demo" component={Demo} ></Route>
            </Route>
          </Router>
          </Provider>

        );
    
  }
}
