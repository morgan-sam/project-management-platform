export const filterOptionsDefault = () => {
	return {
		active: true,
		date: '2000-01-01T00:00:00.000Z',
		deadline: '2025-01-01T00:00:00.000Z',
		completion: 'all',
		urgency: { min: 1, max: 5 },
		teams: 'all'
	};
};
