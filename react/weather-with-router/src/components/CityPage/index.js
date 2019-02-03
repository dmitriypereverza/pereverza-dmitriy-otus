import React, { Component } from 'react';

export default class CityPage extends Component {

    render() {
        return (
          <h1>{ this.props.match.params.code }</h1>
        );
    }
}
