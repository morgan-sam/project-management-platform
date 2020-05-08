import React, { useState } from 'react';

const ColorButton = (props) => {
	const [ hover, setHover ] = useState(false);

	const btnWidth = props.style && props.style.width ? props.style.width : 'auto';
	const btnHeight = props.style && props.style.height ? props.style.height : 'auto';

	const staticContainerStyle = {
		position: 'relative',
		height: props.style && props.style.height ? `${parseInt(props.style.height) * 1.8}rem` : 'auto',
		display: 'flex',
		alignItems: 'center',
		margin: '0.5rem'
	};

	const floatingContainerStyle = {
		position: 'relative',
		width: btnWidth,
		height: btnHeight,
		top: hover ? '-0.5rem' : '0',
		transition: 'top 0.2s ease-in-out',
		animation: hover ? 'float 1.4s ease-in-out 0.4s alternate infinite' : 'none',
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	const buttonStyle = {
		position: 'relative',
		width: btnWidth,
		height: btnHeight,
		padding: '0.75rem',
		backgroundColor: 'transparent',
		border: '1px solid black',
		color: hover ? 'white' : 'black',
		transition: '0s cubic-bezier(.11,.31,.92,.05)'
	};

	const colorBoxStyle = {
		position: 'absolute',
		width: '150%',
		height: '150%',
		zIndex: '-2',
		transformOrigin: 'center',
		transform: hover ? 'translate(0%,0%) scale(2) skew(0deg)' : 'translate(0%,400%) scale(2) skew(45deg)',
		borderRadius: '0',
		transition: '0s transform ease-in-out',
		background:
			'radial-gradient(circle, rgba(35,104,184,1) 0%, rgba(104,207,189,0.9906163148853291) 48%, rgba(61,53,209,1) 100%)',
		opacity: '100%',
		animation: hover ? 'rotate 5s cubic-bezier(0,.09,1,-0.09) 0s infinite alternate-reverse' : 'none'
	};

	const whiteBoxStyle = {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		zIndex: '-3'
	};

	return (
		<div style={staticContainerStyle} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<div style={floatingContainerStyle}>
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
