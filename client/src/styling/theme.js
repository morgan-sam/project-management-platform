import { anyColorToHex, hexToRgb } from 'processing/convertColors';

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
