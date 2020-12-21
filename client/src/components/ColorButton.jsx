import React, { useState, useRef, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import {
    BUTTON_BOUNCE_PX,
    ColorButtonStaticContainer,
    FloatingContainer,
    ButtonStyle,
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
            <FloatingContainer {...{ hover, pressed }} ref={floatRef}>
                <ButtonStyle
                    className={props.className}
                    color={props.color}
                    enabled={props.enabled}
                    hover={hover}
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
                </ButtonStyle>
                <ColorBox
                    color={props.color ? props.color : themeColor}
                    hover={hover}
                />
                <WhiteBox />
            </FloatingContainer>
        </ColorButtonStaticContainer>
    );
};

ColorButton.defaultProps = { enabled: true };

export default ColorButton;
