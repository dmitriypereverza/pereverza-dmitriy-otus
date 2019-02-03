import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AppWrapper, GlobalStyle } from "./styled";

import Home from "./components/Home";

class App extends Component {


  render() {
    return (
      <AppWrapper>
          <GlobalStyle />
          <Router>
                <Route exact path="/" component={Home} />
                {/*<Route path="/about" component={About} />*/}
                {/*<Route path="/topics" component={Topics} />*/}
        </Router>
      </AppWrapper>
    );
  }
}

export default App;
