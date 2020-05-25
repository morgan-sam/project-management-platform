export const anyColorToHex = (str) => {
	let ctx = document.createElement('canvas').getContext('2d');
	ctx.fillStyle = str;
	return ctx.fillStyle;
};

export const hexToRgb = (hex) => {
	hex = standardizeHex(hex);
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] : null;
};

export const standardizeHex = (hex) => {
	let match = hex.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
	if (match) return `#${match[1]}${match[1]}${match[2]}${match[2]}${match[3]}${match[3]}`;
	else return hex;
};

export const rgbToHex = (array) =>
	'#' +
	[ ...array ]
		.map((el) => {
			const hex = el.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		})
		.join('');
