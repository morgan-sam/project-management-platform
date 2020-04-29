import React from 'react';
import FilterToggle from 'components/FilterToggle';
import ResetFilterBtn from 'components/ResetFilterBtn';
import DateRangeSelect from 'components/DateRangeSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import CompletionSelect from 'components/CompletionSelect';
import TeamSelect from 'components/TeamSelect';
import { filterBarStyle, filterBarItemStyle } from 'styling/filterBar';

const FilterBar = (props) => {
	return (
		<div className="filterBar" style={{ ...props.style, ...filterBarStyle }}>
			<FilterToggle {...props} style={filterBarItemStyle} />
			<ResetFilterBtn {...props} style={filterBarItemStyle} />
			<DateRangeSelect {...props} style={filterBarItemStyle} />
			<UrgencyRangeSelect {...props} style={filterBarItemStyle} />
			<TeamSelect {...props} style={filterBarItemStyle} />
			<CompletionSelect {...props} style={filterBarItemStyle} />
		</div>
	);
};

export default FilterBar;
