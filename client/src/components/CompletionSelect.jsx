import React from 'react';
import Dropdown from './Dropdown';

const CompletionSelect = (props) => {
	const elStyle = { margin: '0 0.3rem' };
	return (
		<div>
			<div className="filterBarLabel" style={elStyle}>
				Completed:
			</div>
			<Dropdown
				className="completionDropdown"
				style={{
					...elStyle,
					width: '7rem'
				}}
				default={props.filterOptions.completion}
				options={[ 'all', 'complete', 'incomplete' ]}
				onClick={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						completion: val
					})}
			/>
		</div>
	);
};

export default CompletionSelect;
