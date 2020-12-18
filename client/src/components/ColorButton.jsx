import React, { useState, useRef, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import {
    BUTTON_BOUNCE_PX,
    ColorButtonStaticContainer,
    getFloatingContainerStyle,
    getButtonStyle,
    ColorBox,
    WhiteBox
} from 'styling/colorButton';

const ColorButton = (props) => {
    const [hover, setHover] = useState(false);
    const [shake, setShake] = useState(false);
    const [pressed, setPressed] = useState(false);
    const floatRef = useRef();
    const themeColor = useContext(ThemeContext);

    return (
        <ColorButtonStaticContainer
            shake={shake}
            onMouseOver={() => props.enabled && setHover(true)}
            onMouseLeave={() => {
                if (hover) setHover(false);
                if (pressed) setTimeout(() => setPressed(false), 200);
            }}
        >
            <div
                style={getFloatingContainerStyle(props.style, {
                    hover,
                    pressed
                })}
                ref={floatRef}
            >
                <button
                    className={props.className}
                    style={{
                        ...getButtonStyle(
                            {
                                style: props.style,
                                color: props.color,
                                enabled: props.enabled
                            },
                            hover
                        ),
                        ...props.style
                    }}
                    onMouseDown={() => props.enabled && setPressed(true)}
                    onMouseUp={(val) => {
                        if (props.enabled) {
                            if (pressed) props.onClick(val);
                            if (
                                getComputedStyle(floatRef.current).top ===
                                `${BUTTON_BOUNCE_PX}px`
                            )
                                setPressed(false);
                            else
                                setTimeout(() => {
                                    if (floatRef.current) setPressed(false);
                                }, 200);
                        } else {
                            setShake(true);
                            setTimeout(() => setShake(false), 300);
                        }
                    }}
                >
                    {props.text}
                </button>
                <ColorBox
                    color={props.color ? props.color : themeColor}
                    hover={hover}
                />
                <WhiteBox />
            </div>
        </ColorButtonStaticContainer>
    );
};

ColorButton.defaultProps = { enabled: true };

export default ColorButton;
