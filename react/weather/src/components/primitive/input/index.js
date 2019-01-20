import React from 'react';

import "./input.css";

export default function render({value, onChange, onSubmit, btnText = 'Ok', type = 'text', placeholder = ''}) {
    return (
        <div className="webflow-style-input">
            <input className=""
                   value={value}
                   type={type}
                   placeholder={placeholder}
                   onChange={onChange} />
            <button onClick={onSubmit} type="submit" >
                {btnText}
            </button>
        </div>
    );
}
