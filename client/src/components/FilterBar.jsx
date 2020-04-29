import React from 'react';
import FilterToggle from 'components/FilterToggle';
import ResetFilterBtn from 'components/ResetFilterBtn';
import DateRangeSelect from 'components/DateRangeSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import CompletionSelect from 'components/CompletionSelect';
import TeamSelect from 'components/TeamSelect';
import { filterBarStyle } from 'styling/filterBar';

const FilterBar = (props) => {
	return (
		<div className="filterBar" style={filterBarStyle}>
			<FilterToggle {...props} />
			<ResetFilterBtn {...props} />
			<DateRangeSelect {...props} />
			<UrgencyRangeSelect {...props} />
			<TeamSelect {...props} />
			<CompletionSelect {...props} />
		</div>
	);
};

export default FilterBar;
