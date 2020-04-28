export const fetchDeleteTasks = (taskIds) => {
	for (let i = 0; i < taskIds.length; i++) {
		fetch(`/tasks/${taskIds[i]}`, {
			method: 'delete'
		});
	}
};

export const fetchPutEntry = (entry) => {
	fetch(`/tasks/${entry.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(entry)
	});
};
