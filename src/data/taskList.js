var d = new Date('2020-01-01T00:00:00');
console.log(d.toString());

const taskList = [
	{
		task: 'Create App',
		date: '2020-01-01T00:00:00',
		deadline: '2020-01-01T00:00:00',
		urgency: 3,
		team: 'Team 1',
		completed: false
	},
	{
		task: 'Add Payment Feature',
		date: '2020-01-01T00:00:00',
		deadline: '2020-01-01T00:00:00',
		urgency: 4,
		team: 'Team 3',
		completed: true
	},
	{
		task: 'Refactor Backend',
		date: '2020-01-01T00:00:00',
		deadline: '2020-01-01T00:00:00',
		urgency: 9,
		team: 'Team 2',
		completed: false
	},
	{
		task: 'Redesign Homepage',
		date: '2020-01-01T00:00:00',
		deadline: '2020-01-01T00:00:00',
		urgency: 2,
		team: 'Team 2',
		completed: false
	}
];
export default taskList;
