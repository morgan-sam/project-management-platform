import React from 'react';
import Dropdown from 'components/Dropdown';

const TeamSelect = (props) => {
	const elStyle = { margin: '0 0.3rem' };
	return (
		<div>
			<div className="filterBarLabel" style={elStyle}>
				Teams:
			</div>
			<Dropdown
				className="teamDropdown"
				style={{
					...elStyle,
					width: '7rem'
				}}
				default={props.filterOptions.teams}
				options={props.taskListTeams}
				onClick={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						teams: val
					})}
			/>
		</div>
	);
};

export default TeamSelect;
