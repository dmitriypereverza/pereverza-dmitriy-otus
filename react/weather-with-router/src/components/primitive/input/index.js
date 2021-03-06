import React, {Component} from 'react';
import clickOutside from 'react-click-outside';

import {
    FieldWrapper,
    LabelWrapper,
    Suggest,
    SuggestList,
    WebflowButton,
    WebflowInput,
    WebflowWrapper
} from "./styled";
import PropTypes from "prop-types";

class SearchBar extends Component {
    state = {
        value: '',
        suggestList: [],
        suggestsOpen: false,
    };


    static defaultProps = {
        value: '',
        label: '',
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
    }

    render() {
        let {onSubmit, btnText, type, placeholder, label} = this.props;
        return (
            <FieldWrapper>
                <LabelWrapper>{ label }</LabelWrapper>
                <WebflowWrapper>
                    <WebflowInput
                        value={this.state.value}
                        type={type}
                        placeholder={placeholder}
                        onFocus={this.onFocus.bind(this)}
                        onChange={this.filterList.bind(this)} />

                    {btnText &&
                    <WebflowButton onClick={() => onSubmit(this.state.value)}>
                        {btnText}
                    </WebflowButton>
                    }

                    {this.state.suggestsOpen &&
                    <SuggestList>
                        {this.state.suggestList.map(item => <Suggest onClick={() => onSubmit(item)} key={item.name}>{item.name}</Suggest>)}
                    </SuggestList>
                    }

                </WebflowWrapper>
            </FieldWrapper>
        );
    }
}

SearchBar.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    btnText: PropTypes.string,
    searchItems: PropTypes.array,
};

export default clickOutside(SearchBar);
