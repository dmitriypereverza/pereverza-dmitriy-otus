import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import {AppWrapper, GlobalStyle, PageWrapper} from "./styled";

import Home from "./components/Home";
import CityPage from "./components/CityPage";

const App = props => {
    return (
        <>
            <GlobalStyle />
            <PageWrapper backgroundUrl={props.backgroundUrl}>
                <AppWrapper>
                    <Router>
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route path="/city/:code" component={CityPage} />
                        </div>
                    </Router>
                </AppWrapper>
            </PageWrapper>
        </>

    );
};

const mapState = state => ({
    backgroundUrl: state.weather.backgroundUrl,
});

export default connect(mapState)(App);
