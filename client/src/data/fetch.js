export const fetchDeleteTasks = (taskIds) => {
	for (let i = 0; i < taskIds.length; i++) {
		fetch(`/tasks/${taskIds[i]}`, {
			method: 'delete'
		});
	}
};
