import { BOX_WIDTH_REM, BOX_HEIGHT_REM } from 'styling/navigationMenu';

export const getIndividualBoxStyle = (menuPos, menusOpen) => {
	let individualStyle;
	const boxStyleFunctions = [ getBoxPosition ];
	boxStyleFunctions.forEach((func) => (individualStyle = { ...individualStyle, ...func(menuPos, menusOpen) }));
	return individualStyle;
};

///POSITION///

const getBoxPosition = (menuPos, menusOpen) => {
	const topPositionRem = (menuPos.slice(1).reduce((a, b) => a + b, 0) + 1) * BOX_HEIGHT_REM;
	const leftPositionRem = (menuPos.length + menuPos[0] - 2) * BOX_WIDTH_REM;
	if (menuPos.length === 1) return { left: `${menuPos[0] * BOX_WIDTH_REM}rem`, top: '0' };
	else return { top: `${topPositionRem}rem`, left: `${leftPositionRem}rem` };
};
