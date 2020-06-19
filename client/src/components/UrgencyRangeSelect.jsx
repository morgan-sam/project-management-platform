import React from 'react';
import Dropdown from 'components/Dropdown';

const UrgencyRangeSelect = (props) => {
	const { onChange, urgency } = props;
	const elStyle = { margin: '0 0.3rem' };

	const setMinUrgency = (min) => {
		if (min > urgency.max) onChange(min, min);
		else onChange(min, urgency.max);
	};

	const setMaxUrgency = (max) => {
		if (max < urgency.min) onChange(max, max);
		else onChange(urgency.min, max);
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
					selected={urgency.min}
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
					selected={urgency.max}
					options={[ 1, 2, 3, 4, 5 ]}
					onClick={(val) => setMaxUrgency(val)}
					onOpenChange={props.setOverflowHidden}
				/>
			</div>
		</div>
	);
};

export default UrgencyRangeSelect;
