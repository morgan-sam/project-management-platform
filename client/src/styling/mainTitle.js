export const mainTitleContainer = {
	position: 'relative',
	display: 'flex',
	height: 'auto',
	margin: '4rem 0 7rem 0',
	animation: 'title-container-margin-close 1.6s ease-in-out 3s 1 forwards'
};

export const getMainTitleStyle = (themeColor) => {
	return {
		position: 'relative',
		fontSize: '2.2rem',
		background: `#fff -webkit-gradient(linear, left top, right top, from(${themeColor}), to(${themeColor}), color-stop(0.5, #fff)) 0 0 no-repeat`,
		WebkitBackgroundSize: '250px',
		color: 'rgba(0, 0, 0, 0.3)',
		WebkitBackgroundClip: 'text',
		opacity: '0',
		textShadow: '0 0px 0px rgba(255, 255, 255, 0.2)',
		animation: 'title-fade-in-out 3s ease-in-out 0.4s 1 forwards, title-shine 1s ease-in-out 1.7s 1 forwards',
		backgroundPosition: '-300%',
		cursor: 'default',
		userSelect: 'none'
	};
};
