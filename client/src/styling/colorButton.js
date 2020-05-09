export const BUTTON_BOUNCE_PX = 8;

const getButtonSizes = (style) => {
	return {
		width: style && style.width ? style.width : 'auto',
		height: style && style.height ? style.height : 'auto'
	};
};

export const getStaticContainerStyle = (style) => {
	return {
		position: 'relative',
		height: style && style.height ? `${parseInt(style.height) * 1.8}rem` : 'auto',
		display: 'flex',
		alignItems: 'center',
		margin: '0.5rem'
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

export const getButtonStyle = (style, hover) => {
	const { width, height } = getButtonSizes(style);
	return {
		position: 'relative',
		width,
		height,
		padding: '0.75rem',
		backgroundColor: 'transparent',
		border: '1px solid black',
		color: hover ? 'white' : 'black',
		transition: '0s cubic-bezier(.11,.31,.92,.05)'
	};
};

export const getColorBoxStyle = (color, hover) => {
	calculateColorStyles(color);
	return {
		position: 'absolute',
		width: '150%',
		height: '150%',
		zIndex: '-2',
		transformOrigin: 'center',
		transform: hover ? 'translate(0%,0%) scale(2) skew(0deg)' : 'translate(0%,400%) scale(2) skew(45deg)',
		borderRadius: '0',
		transition: '0s transform ease-in-out',
		background: 'radial-gradient(circle, rgb(35,104,184,1) 0%, rgb(104,207,189) 48%, rgb(61,53,209) 100%)',
		opacity: '100%',
		animation: hover ? 'rotate 5s cubic-bezier(0,.09,1,-0.09) 0s infinite alternate-reverse' : 'none'
	};
};

const calculateColorStyles = (color) => {
	const hex = anyColorToHex(color);
	const rgb = hexToRgb(hex);
	console.log(rgb);
};

const anyColorToHex = (str) => {
	let ctx = document.createElement('canvas').getContext('2d');
	ctx.fillStyle = str;
	return ctx.fillStyle;
};

const hexToRgb = (hex) => {
	hex = standardizeHex(hex);
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null;
};

const standardizeHex = (hex) => {
	let match = hex.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
	if (match) return `#${match[1]}${match[1]}${match[2]}${match[2]}${match[3]}${match[3]}`;
	else return hex;
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
