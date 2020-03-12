import React from 'react';
import FilterToggle from './FilterToggle';
import DateRangeSelect from './DateRangeSelect';
import UrgencyRangeSelect from './UrgencyRangeSelect';
import CompletionSelect from './CompletionSelect';
import TeamSelect from './TeamSelect';
import { filterBarStyle } from '../styling/filterBar';

const FilterBar = (props) => {
	return (
		<div className="filterBar" style={{ ...filterBarStyle, ...props.style }}>
			<FilterToggle {...props} />
			<DateRangeSelect {...props} />
			<UrgencyRangeSelect {...props} />
			<CompletionSelect {...props} />
			<TeamSelect {...props} />
		</div>
	);
};

export default FilterBar;
