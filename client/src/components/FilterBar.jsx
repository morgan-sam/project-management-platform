import React from 'react';
import FilterToggle from 'components/FilterToggle';
import ResetFilterBtn from 'components/ResetFilterBtn';
import DateRangeSelect from 'components/DateRangeSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import CompletionSelect from 'components/CompletionSelect';
import TeamSelect from 'components/TeamSelect';
import { filterBarStyle, filterBarItemStyle } from 'styling/filterBar';
import { parseISOToDateObj } from 'processing/parseDates';

const FilterBar = (props) => {
	return (
		<div className="filterBar" style={{ ...props.style, ...filterBarStyle }}>
			<FilterToggle {...props} style={filterBarItemStyle} />
			<ResetFilterBtn {...props} style={filterBarItemStyle} />
			<DateRangeSelect
				{...props}
				style={filterBarItemStyle}
				date={parseISOToDateObj(props.filterOptions.date)}
				deadline={parseISOToDateObj(props.filterOptions.deadline)}
				setDate={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						date: val
					})}
				setDeadline={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						deadline: val
					})}
			/>
			<UrgencyRangeSelect {...props} style={filterBarItemStyle} />
			<TeamSelect {...props} style={filterBarItemStyle} />
			<CompletionSelect {...props} style={filterBarItemStyle} />
		</div>
	);
};

export default FilterBar;
