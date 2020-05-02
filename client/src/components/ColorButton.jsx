import React, { useState } from 'react';

const ColorButton = (props) => {
	const [ hover, setHover ] = useState(false);

	const containerStyle = {
		position: 'relative',
		width: props.style.width,
		height: props.style.height,
		overflow: 'hidden',
		top: hover ? '-10px' : '0',
		transition: '0.5s'
	};

	const buttonStyle = {
		position: 'absolute',
		backgroundColor: 'transparent',
		border: '1px solid black',
		color: hover ? 'white' : 'black',
		transition: '0.5s'
	};

	const colorBoxStyle = {
		position: 'absolute',
		width: props.style.width,
		height: props.style.height,
		backgroundColor: props.color,
		zIndex: '-2',
		transform: hover ? 'translate(0%,0%)' : 'translate(100%,100%)',
		borderRadius: hover ? '0' : '100%',
		transition: '0.5s',
		background:
			'radial-gradient(circle, rgba(35,104,184,1) 0%, rgba(104,207,189,0.9906163148853291) 48%, rgba(61,53,209,1) 100%)',
		opacity: '50%'
	};
	const whiteBoxStyle = {
		position: 'absolute',
		width: props.style.width,
		height: props.style.height,
		backgroundColor: 'white',
		zIndex: '-3'
	};

	return (
		<div style={containerStyle} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<button style={{ ...buttonStyle, ...props.style }} onClick={(val) => props.onClick(val)}>
				{props.text}
			</button>
			<div style={colorBoxStyle} />
			<div style={whiteBoxStyle} />
		</div>
	);
};

export default ColorButton;
