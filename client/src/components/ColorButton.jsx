import React, { useState, useRef } from 'react';
import {
	BUTTON_BOUNCE_PX,
	getStaticContainerStyle,
	getFloatingContainerStyle,
	getButtonStyle,
	getColorBoxStyle,
	whiteBoxStyle
} from 'styling/colorButton';

const ColorButton = (props) => {
	const [ hover, setHover ] = useState(false);
	const [ shake, setShake ] = useState(false);
	const [ pressed, setPressed ] = useState(false);
	const floatRef = useRef();

	return (
		<div
			style={getStaticContainerStyle(props.style, shake)}
			onMouseOver={() => {
				if (props.enabled) setHover(true);
			}}
			onMouseLeave={() => {
				if (hover) setHover(false);
				if (pressed) setTimeout(() => setPressed(false), 200);
			}}
		>
			<div style={getFloatingContainerStyle(props.style, { hover, pressed })} ref={floatRef}>
				<button
					style={{
						...getButtonStyle({ style: props.style, color: props.color }, hover),
						...props.style
					}}
					onMouseDown={() => {
						if (props.enabled) setPressed(true);
					}}
					onMouseUp={(val) => {
						if (props.enabled) {
							if (pressed) props.onClick(val);
							if (getComputedStyle(floatRef.current).top === `${BUTTON_BOUNCE_PX}px`) setPressed(false);
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
				<div style={getColorBoxStyle(props.color, hover)} />
				<div style={whiteBoxStyle} />
			</div>
		</div>
	);
};

ColorButton.defaultProps = { enabled: true };

export default ColorButton;
