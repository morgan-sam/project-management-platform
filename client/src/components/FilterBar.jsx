import React from 'react';
import FilterToggle from 'components/FilterToggle';
import ResetFilterBtn from 'components/ResetFilterBtn';
import DateRangeSelect from 'components/DateRangeSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import CompletionSelect from 'components/CompletionSelect';
import DropdownCheckboxes from 'components/DropdownCheckboxes';
import { filterBarStyle, filterBarItemStyle } from 'styling/filterBar';
import { parseISOToDateObj } from 'processing/parseDates';

const FilterBar = (props) => {
	const { taskListTeams, filterOptions, setFilterOptions } = props;

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
			<DropdownCheckboxes
				label={'Teams'}
				onClick={(val) => {
					console.log(filterOptions.teams);
					let newState = filterOptions.teams.filter((el) => el !== 'all');
					if (val === 'all') newState = [ 'all' ];
					else if (newState.includes(val)) newState = newState.filter((el) => el !== val);
					else newState.push(val);
					if (newState.length === 0) newState = [ 'all' ];
					setFilterOptions({ ...filterOptions, teams: newState });
				}}
				options={taskListTeams}
				filterOptions={filterOptions}
				selected={filterOptions.teams}
				style={{ ...filterBarItemStyle, width: '8rem', zIndex: '10' }}
			/>
			<CompletionSelect {...props} style={filterBarItemStyle} />
		</div>
	);
};

export default FilterBar;
