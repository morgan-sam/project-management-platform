import React, { useState } from 'react';

const SystemButton = (props) => {
    const { style, onClick } = props;
    const [hover, setHover] = useState(false);

    return (
        <div
            style={{
                padding: '0.65rem 1rem',
                fontSize: '1rem',
                userSelect: 'none',
                cursor: 'pointer',
                backgroundColor: hover ? '#aaa' : 'white',
                color: hover ? 'white' : 'black',
                borderRadius: '5px',
                border: '1px solid black',
                ...style
            }}
            onClick={onClick}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {props.children}
        </div>
    );
};

export default SystemButton;
