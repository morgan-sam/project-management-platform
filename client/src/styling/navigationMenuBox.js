export const getIndividualBoxStyle = (menuPos, menusOpen) => {
	let individualStyle;
	const boxStyleFunctions = [ getTopBoxStyle, getMidBoxStyle ];
	boxStyleFunctions.forEach((func) => (individualStyle = { ...individualStyle, ...func(menuPos, menusOpen) }));
	return individualStyle;
};

const getTopBoxStyle = (menuPos, menusOpen) => {
	if (menuPos[0] !== 0 && menuPos.length === 1) return { borderLeft: 'none' };
	else return { borderLeft: '1px solid black' };
};

const getMidBoxStyle = (menuPos, menusOpen) => {
	if (menuPos[1] === 0 && menuPos.length === 2) return { borderTop: 'none' };
	else if (menuPos[menuPos.length - 1] === 0 && menuPos[menuPos.length - 2] === 0) return { borderTop: 'none' };
	else if (menuPos[menuPos.length - 1] !== 0 && menuPos.length > 1) return { borderTop: 'none' };
	else return null;
};
