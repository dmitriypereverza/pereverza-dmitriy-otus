import styled from 'styled-components';

export const WrapperStyled = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${ props => props.column ? 'column' : 'row' };
    flex-wrap: ${ props => props.wrap ? 'wrap' : 'nowrap' };
`;
