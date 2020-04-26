import React from 'react';

const FilterToggle = (props) => {
	const elStyle = { margin: '0 0.3rem' };
	return (
		<div>
			<div className="filterBarLabel" style={elStyle}>
				Active:
			</div>
			<input
				type="checkbox"
				className="inputCheckbox"
				style={elStyle}
				onChange={(e) =>
					props.setFilterOptions({
						...props.filterOptions,
						active: e.target.checked
					})}
				defaultChecked={props.filterOptions.active}
			/>
		</div>
	);
};

export default FilterToggle;
