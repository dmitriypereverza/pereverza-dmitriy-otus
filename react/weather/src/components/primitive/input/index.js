import React from 'react';

import {
    WebflowButton,
    WebflowInput,
    WebflowWrapper
} from "./styled";

export default function render({value, onChange, onSubmit, btnText = 'Ok', type = 'text', placeholder = ''}) {
    return (
        <WebflowWrapper>
            <WebflowInput
                   value={value}
                   type={type}
                   placeholder={placeholder}
                   onChange={onChange} />
            <WebflowButton onClick={onSubmit}>
                {btnText}
            </WebflowButton>
        </WebflowWrapper>
    );
}
