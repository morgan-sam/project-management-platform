import React from 'react';
import ColorButton from 'components/ColorButton';
import { getDefaultFilterOptions } from 'data/defaultState';

const ResetFilterBtn = (props) => {
	return (
		<ColorButton
			className="resetFilterBtn"
			onClick={() => {
				const active = props.filterOptions.active;
				props.setFilterOptions({
					...getDefaultFilterOptions(props.rawTaskList, active)
				});
			}}
			text={'Reset Filter'}
			style={{ width: '6rem' }}
		/>
	);
};

export default ResetFilterBtn;
