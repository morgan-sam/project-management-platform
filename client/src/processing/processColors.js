import { hexToRgb, rgbToHex, anyColorToHex } from 'processing/convertColors';

export const colorToWhiteArray = (color, numberOfShades) => {
	const colorData = {
		colorOneArray: hexToRgb(anyColorToHex(color)),
		colorTwoArray: [ 255, 255, 255 ],
		numberOfShades: Math.ceil(numberOfShades)
	};
	const colorMatrix = createColorMatrixByStep(colorData);
	return colorMatrix.map((el) => rgbToHex(el));
};

const getColorStepValues = (colorData) => {
	const { colorOneArray, colorTwoArray, numberOfShades } = colorData;
	return colorOneArray.map((el, i) => (colorTwoArray[i] - el) / (numberOfShades - 1));
};

const createColorMatrixByStep = (colorData) => {
	const { colorOneArray, numberOfShades } = colorData;
	let colorMatrix = [];
	const colorStepValues = getColorStepValues(colorData);
	for (let iteration = 0; iteration < numberOfShades; iteration++) {
		const color = colorOneArray.map((el, index) => Math.floor(el + iteration * colorStepValues[index]));
		colorMatrix.push(color);
	}
	return colorMatrix;
};
