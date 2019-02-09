import React, {Component} from 'react';

import { WrapperStyled } from "./styled";

class Wrapper extends Component {
    static defaultProps = {
        column: false
    };

    render() {
        return (
          <WrapperStyled { ...this.props }>
              { this.props.children }
          </WrapperStyled>
        );
    }
}

export default Wrapper;
