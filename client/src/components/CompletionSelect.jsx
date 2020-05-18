import React from 'react';
import Dropdown from 'components/Dropdown';

const CompletionSelect = (props) => {
	const elStyle = { margin: '0 0.3rem' };
	return (
		<div style={props.style}>
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
				onOpenChange={props.setOverflowHidden}
			/>
		</div>
	);
};

export default CompletionSelect;
