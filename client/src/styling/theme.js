import { anyColorToHex, hexToRgb } from 'processing/colors';

export const calculateColorStyles = (color) => {
	const hex = anyColorToHex(color);
	const [ r, g, b ] = hexToRgb(hex);
	const colorOne = [ r, g, b ];
	let colorTwo = [ r / 2, g / 2, b / 2 ];
	let colorThree = [
		Math.abs(r - Math.abs((255 - r) / 2)),
		Math.abs(g - Math.abs((255 - g) / 2)),
		Math.abs(b - Math.abs((255 - b) / 2))
	];
	const domColorIndex = colorOne.indexOf(Math.max(...colorOne));
	colorTwo[domColorIndex] = colorTwo[domColorIndex] * 1.5;
	colorThree[domColorIndex] = colorOne[domColorIndex];
	return [ colorOne, colorTwo, colorThree ];
};

export const getGradientTextColor = (color) => {
	const rgb = hexToRgb(anyColorToHex(color));
	const sum = rgb.reduce((a, b) => a + b, 0);
	return sum > 5 * (255 * 3) / 6 ? 'black' : 'white';
};

export const getOppositeRGB = (color) => {
	const [ r, g, b ] = hexToRgb(anyColorToHex(color));
	return [ 255 - r, 255 - g, 255 - b ];
};
