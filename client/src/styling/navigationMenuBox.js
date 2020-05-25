import { BOX_WIDTH_REM, BOX_HEIGHT_REM } from 'styling/navigationMenu';

export const getIndividualBoxStyle = (menuPos, menusOpen) => {
	let individualStyle;
	const boxStyleFunctions = [ getTopBoxStyle, getMidBoxStyle, getBoxPosition ];
	boxStyleFunctions.forEach((func) => (individualStyle = { ...individualStyle, ...func(menuPos, menusOpen) }));
	return individualStyle;
};

///STYLE///
const getTopBoxStyle = (menuPos, menusOpen) => {
	if (menuPos[0] !== 0 && menuPos.length === 1) return { borderLeft: 'none' };
	else return { borderLeft: '1px solid black' };
};

const getMidBoxStyle = (menuPos, menusOpen) => {
	if (menuPos[1] === 0 && menuPos.length === 2) return { borderTop: 'none' };
	else if (menuPos[menuPos.length - 1] === 0 && menuPos[menuPos.length - 2] === 0) return { borderTop: 'none' };
	else if (menuPos[menuPos.length - 1] !== 0 && menuPos.length > 1) return { borderTop: 'none' };
	else return { borderTop: '1px solid black' };
};

///POSITION///

const getBoxPosition = (menuPos, menusOpen) => {
	const topPositionRem = (menuPos.slice(1).reduce((a, b) => a + b, 0) + 1) * BOX_HEIGHT_REM;
	const leftPositionRem = (menuPos.length - 2) * BOX_WIDTH_REM;
	if (menuPos.length === 1) return { left: '0', top: '0' };
	else return { top: `${topPositionRem}rem`, left: `${leftPositionRem}rem` };
};
