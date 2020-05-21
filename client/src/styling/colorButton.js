import { calculateColorStyles, getGradientTextColor } from 'styling/theme';
export const BUTTON_BOUNCE_PX = 8;

const getButtonSizes = (style) => {
	return {
		width: style && style.width ? style.width : 'auto',
		height: style && style.height ? style.height : 'auto'
	};
};

export const getStaticContainerStyle = (style, shake) => {
	return {
		position: 'relative',
		height: style && style.height ? `${parseInt(style.height) * 1.8}rem` : 'auto',
		display: 'flex',
		alignItems: 'center',
		margin: '0.5rem',
		animation: shake ? 'button-error-shake 0.2s ease-in-out infinite' : 'none'
	};
};

export const getFloatingContainerStyle = (style, state) => {
	const { width, height } = getButtonSizes(style);
	const { pressed, hover } = state;
	return {
		position: 'relative',
		width,
		height,
		top: pressed ? `${BUTTON_BOUNCE_PX}px` : hover ? `-${BUTTON_BOUNCE_PX}px` : '0',
		transition: 'top 0.2s ease-in-out',
		animation: hover ? 'float 1.4s ease-in-out 0.4s alternate infinite' : 'none',
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};
};

export const getButtonStyle = (props, hover) => {
	const { style, color } = props;
	const { width, height } = getButtonSizes(style);
	const hoverTextColor = getGradientTextColor(color);

	return {
		position: 'relative',
		width,
		height,
		padding: '0.75rem',
		backgroundColor: 'transparent',
		border: '1px solid black',
		color: hover ? hoverTextColor : 'black',
		transition: '0s cubic-bezier(.11,.31,.92,.05)'
	};
};

export const getColorBoxStyle = (color, hover) => {
	return {
		position: 'absolute',
		width: '150%',
		height: '150%',
		zIndex: '-2',
		transformOrigin: 'center',
		transform: hover ? 'translate(0%,0%) scale(2) skew(0deg)' : 'translate(0%,400%) scale(2) skew(45deg)',
		borderRadius: '0',
		transition: '0s transform ease-in-out',
		background: getButtonGradient(color),
		opacity: '100%',
		animation: hover ? 'button-bg-rotate 5s cubic-bezier(0,.09,1,-0.09) 0s infinite alternate-reverse' : 'none'
	};
};

const getButtonGradient = (color) => {
	const colors = calculateColorStyles(color);
	return `radial-gradient(circle, rgb(${colors[0].join(',')}) 0%, rgb(${colors[1].join(
		','
	)}) 48%, rgb(${colors[2].join(',')}) 100%)`;
};

export const whiteBoxStyle = {
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	backgroundColor: 'white',
	zIndex: '-3'
};
