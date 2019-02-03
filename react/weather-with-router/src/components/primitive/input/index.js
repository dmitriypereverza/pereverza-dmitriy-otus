import React, {Component} from 'react';
import clickOutside from 'react-click-outside';

import {
    Suggest,
    SuggestList,
    WebflowButton,
    WebflowInput,
    WebflowWrapper
} from "./styled";

class SearchBar extends Component {
    state = {
        value: '',
        suggestList: [],
        suggestsOpen: false,
    };


    static defaultProps = {
        value: '',
        type: 'text',
        placeholder: '',
        btnText: '',
        searchItems: [],
    };

    // noinspection JSUnusedGlobalSymbols
    handleClickOutside() {
        this.setState({suggestsOpen: false});
    }

    onFocus() {
        this.setState({suggestsOpen: true});
    }

    componentWillMount() {
        this.setState({value: this.props.value});
    }

    filterList(event) {
        this.setState({value: event.target.value});
        if (this.props.searchItems.length === 0 || !event.target.value) {
            this.setState({suggestList: []});
            return;
        }
        let suggestList = this.props.searchItems.filter(item => {
            return item.name.toLowerCase().search(
              event.target.value.toLowerCase()) !== -1;
        });
        this.setState({suggestList: suggestList});
        console.log("suggestList", suggestList);
    }

    render() {
        let {onSubmit, btnText, type, placeholder} = this.props;
        return (
          <WebflowWrapper>
              <WebflowInput
                value={this.state.value}
                type={type}
                placeholder={placeholder}
                onFocus={this.onFocus.bind(this)}
                onChange={this.filterList.bind(this)} />

              {btnText ?
                <WebflowButton onClick={() => onSubmit(this.state.value)}>
                    {btnText}
                </WebflowButton>
                : null}

              {this.state.suggestsOpen ?
                <SuggestList>
                    {this.state.suggestList.map(item => <Suggest key={item}>{item.name}</Suggest>)}
                </SuggestList>
              : null}

          </WebflowWrapper>
        );
    }
}

export default clickOutside(SearchBar);
