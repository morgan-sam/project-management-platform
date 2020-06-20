import React from 'react';
import Dropdown from 'components/Dropdown';

const CompletionSelect = (props) => {
	const { state, setOverflowHidden } = props;
	const [ obj, set ] = state;

	const elStyle = {
		margin: '0 0.3rem'
	};

	const completionSelectStyle = {
		display: 'flex',
		alignItems: 'center',
		height: '3rem'
	};

	return (
		<div style={completionSelectStyle}>
			<div className="label" style={elStyle}>
				Completion:
			</div>
			<Dropdown
				className="completionDropdown"
				style={{
					...elStyle,
					width: '7rem'
				}}
				selected={obj.completion}
				options={[ 'all', 'complete', 'incomplete' ]}
				onClick={(val) =>
					set({
						...obj,
						completion: val
					})}
				onOpenChange={setOverflowHidden}
			/>
		</div>
	);
};

export default CompletionSelect;
