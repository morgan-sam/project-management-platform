import React from 'react';
import DateSelect from './DateSelect';

const FilterBar = (props) => {
	const filterBarStyle = { display: 'flex', flexDirection: 'row' };

	return (
		<div className="filterBar" style={{ ...filterBarStyle, ...props.style }}>
			<DateSelect />
			<DateSelect />
		</div>
	);
};

export default FilterBar;
