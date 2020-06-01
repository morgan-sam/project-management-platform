import React from 'react';
import Dropdown from 'components/Dropdown';

const UrgencyRangeSelect = (props) => {
	const elStyle = { margin: '0 0.3rem' };

	const setParentUrgencyOptions = (min, max) => {
		props.setFilterOptions({
			...props.filterOptions,
			urgency: {
				min,
				max
			}
		});
	};

	const setMinUrgency = (min) => {
		if (min > props.filterOptions.urgency.max) setParentUrgencyOptions(min, min);
		else setParentUrgencyOptions(min, props.filterOptions.urgency.max);
	};

	const setMaxUrgency = (max) => {
		if (max < props.filterOptions.urgency.min) setParentUrgencyOptions(max, max);
		else setParentUrgencyOptions(props.filterOptions.urgency.min, max);
	};

	return (
		<div style={props.style}>
			<div className="filterBarLabel" style={{ ...elStyle, width: '7rem' }}>
				Urgency Range:
			</div>
			<div style={{ display: 'flex' }}>
				<Dropdown
					className="minUrgencyDropdown"
					style={{
						...elStyle,
						width: '2rem'
					}}
					selected={props.filterOptions.urgency.min}
					options={[ 1, 2, 3, 4, 5 ]}
					onClick={(val) => setMinUrgency(val)}
					onOpenChange={props.setOverflowHidden}
				/>
				{'..'}
				<Dropdown
					className="maxUrgencyDropdown"
					style={{
						...elStyle,
						width: '2rem'
					}}
					selected={props.filterOptions.urgency.max}
					options={[ 1, 2, 3, 4, 5 ]}
					onClick={(val) => setMaxUrgency(val)}
					onOpenChange={props.setOverflowHidden}
				/>
			</div>
		</div>
	);
};

export default UrgencyRangeSelect;
