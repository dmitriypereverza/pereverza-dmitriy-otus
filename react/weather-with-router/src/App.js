import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AppWrapper, GlobalStyle } from "./styled";

import Home from "./components/Home";
import CityPage from "./components/CityPage";

class App extends Component {


  render() {
    return (
      <AppWrapper>
          <GlobalStyle />
          <Router>
              <div>
                  <Route exact path="/" component={Home} />
                  <Route path="/city/:code" component={CityPage} />
              </div>
        </Router>
      </AppWrapper>
    );
  }
}

export default App;
