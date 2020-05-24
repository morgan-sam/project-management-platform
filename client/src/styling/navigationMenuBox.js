export const getIndividualBoxStyle = (menuPos, menusOpen) => {
	let individualStyle;
	const boxStyleFunctions = [ getTopBoxStyle ];
	boxStyleFunctions.forEach((func) => (individualStyle = func(menuPos, menusOpen)));
	return individualStyle;
};

const getTopBoxStyle = (menuPos, menusOpen) => {
	if (menuPos[0] !== 0 && menuPos.length === 1) return { borderLeft: 'none' };
	else return { borderLeft: '1px solid black' };
};
