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
	const [ pressed, setPressed ] = useState(false);
	const floatRef = useRef();

	return (
		<div
			style={getStaticContainerStyle(props.style)}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => {
				setHover(false);
				setTimeout(() => setPressed(false), 300);
			}}
		>
			<div style={getFloatingContainerStyle(props.style, { hover, pressed })} ref={floatRef}>
				<button
					style={{ ...getButtonStyle(props.style, hover), ...props.style }}
					onMouseDown={() => setPressed(true)}
					onMouseUp={(val) => {
						if (pressed) props.onClick(val);
						if (getComputedStyle(floatRef.current).top === `${BUTTON_BOUNCE_PX}px`) setPressed(false);
						else setTimeout(() => setPressed(false), 300);
					}}
				>
					{props.text}
				</button>
				<div style={getColorBoxStyle(hover)} />
				<div style={whiteBoxStyle} />
			</div>
		</div>
	);
};

export default ColorButton;
