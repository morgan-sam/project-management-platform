import React, { useState } from 'react';

const ColorButton = (props) => {
	const [ hover, setHover ] = useState(false);

	const staticContainerStyle = {
		position: 'relative',
		height: `${parseInt(props.style.height) * 1.8}rem`,
		display: 'flex',
		alignItems: 'center'
	};

	const floatingContainerStyle = {
		position: 'relative',
		width: props.style.width,
		height: props.style.height,
		top: hover ? '-1rem' : '0',
		transition: 'top 0.5s ease-in-out',
		animation: hover ? 'float 1.4s ease-in-out 0.4s alternate infinite' : 'none',
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	const buttonStyle = {
		position: 'absolute',
		backgroundColor: 'transparent',
		border: '1px solid black',
		color: hover ? 'white' : 'black',
		transition: '0.2s cubic-bezier(.11,.31,.92,.05)'
	};

	const colorBoxStyle = {
		position: 'absolute',

		width: `${parseInt(props.style.width) * 1}rem`,
		height: `${parseInt(props.style.height) * 1}rem`,
		backgroundColor: props.color,
		zIndex: '-2',
		transformOrigin: 'center',
		transform: hover ? 'translate(0%,0%) scale(2) skew(0deg)' : 'translate(0%,200%) scale(2.6) skew(0deg)',
		borderRadius: '0',
		transition: '0.2s transform cubic-bezier(.11,.31,.92,.05)',
		background:
			'radial-gradient(circle, rgba(35,104,184,1) 0%, rgba(104,207,189,0.9906163148853291) 48%, rgba(61,53,209,1) 100%)',
		opacity: '100%',
		animation: hover ? 'rotate 5s cubic-bezier(0,.09,1,-0.09) 0.7s infinite alternate-reverse' : 'none'
	};

	const whiteBoxStyle = {
		position: 'absolute',
		width: props.style.width,
		height: props.style.height,
		backgroundColor: 'white',
		zIndex: '-3'
	};

	return (
		<div style={staticContainerStyle}>
			<div style={floatingContainerStyle} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				<button style={{ ...buttonStyle, ...props.style }} onClick={(val) => props.onClick(val)}>
					{props.text}
				</button>
				<div style={colorBoxStyle} />
				<div style={whiteBoxStyle} />
			</div>
		</div>
	);
};

export default ColorButton;
