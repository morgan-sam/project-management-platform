export const getIndividualBoxStyle = (menuPos, menusOpen) => {
	let individualStyle;
	individualStyle = getTopBoxStyle(menuPos);
	return individualStyle;
};

const getTopBoxStyle = (menuPos) => {
	if (menuPos[0] !== 0 && menuPos.length === 1) return { borderLeft: 'none' };
	else return { borderLeft: '1px solid black' };
};
