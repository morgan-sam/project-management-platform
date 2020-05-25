import { BOX_WIDTH_REM, BOX_HEIGHT_REM } from 'styling/navigationMenu';
import { convertRemToPixels, convertPixelsToRem } from 'processing/convertUnits';

export const getBoxPosition = (menuPos) => {
	const pos = getExactRemPosition(menuPos);
	return adjustForBorderPixels(menuPos, pos);
};

const getExactRemPosition = (menuPos) => {
	const topPositionRem = (menuPos.slice(1).reduce((a, b) => a + b, 0) + 1) * BOX_HEIGHT_REM;
	const leftPositionRem = (menuPos.length + menuPos[0] - 2) * BOX_WIDTH_REM;
	if (menuPos.length === 1) return { left: `${menuPos[0] * BOX_WIDTH_REM}rem`, top: '0' };
	else return { top: `${topPositionRem}rem`, left: `${leftPositionRem}rem` };
};

const adjustForBorderPixels = (menuPos, position) => {
	let { left, top } = position;
	const leftPx = convertRemToPixels(parseInt(left.match(/\d+/)[0]));
	const topPx = convertRemToPixels(parseInt(top.match(/\d+/)[0]));
	if (menuPos.length === 1) {
		left = `${leftPx - menuPos[0]}px`;
		top = '0px';
	} else if (menuPos.length > 1) {
		left = `${leftPx - menuPos.length - menuPos[0] + 2}px`;
		top = `${topPx - menuPos.slice(1).reduce((a, b) => a + b, 0) - 1}px`;
	}
	return { top, left };
};
