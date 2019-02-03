import React, {Component} from 'react';

import {
    WebflowButton,
    WebflowInput,
    WebflowWrapper
} from "./styled";

export default class SearchBar extends Component {
    state = {
        value: '',
        suggestList: [],
    };

    static defaultProps = {
        value: '',
        type: 'text',
        placeholder: '',
        btnText: 'Ok',
        searchItems: [],
    };

    componentWillMount() {
        this.setState({value: this.props.value});
    }

    filterList(event) {
        let suggestList = this.props.searchItems.filter(item => {
            return item.toLowerCase().search(
              event.target.value.toLowerCase()) !== -1;
        });
        this.setState({suggestList: suggestList});
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let {onSubmit, btnText, type, placeholder} = this.props;
        return (
          <WebflowWrapper>
              <WebflowInput
                value={this.state.value}
                type={type}
                placeholder={placeholder}
                onChange={this.onChange.bind(this)} />
              <WebflowButton onClick={() => onSubmit(this.state.value)}>
                  {btnText}
              </WebflowButton>
          </WebflowWrapper>
        );
    }

}
