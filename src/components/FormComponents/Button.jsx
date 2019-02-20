import React from 'react';

//TODO: Flesh this out or get rid of it
const Button = (props) => {
    return (
        <button
            disabled={props.disabled}
            //style={props.style}
            onClick={props.action}>
            {props.title}
        </button>
    )
}

export default Button;

