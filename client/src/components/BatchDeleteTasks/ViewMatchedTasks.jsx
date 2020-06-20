import React from 'react';
import {
	titleStyle,
	topContainerStyle,
	popUpWindowStyle,
	cancelButtonStyle,
	errorMatchTextStyle,
	finalContainerStyle,
	dateTopContainer,
	dateGridStyle,
	dateRangeContainer,
	dateContainer,
	dateLabel,
	autoContainerStyle
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';

const MatchedDeleteTasks = (props) => {
	const { finalMatched, setScreen, setPopUp, rawTaskList } = props;

	const getMatchedListItem = (el) => {
		return (
			<li>
				{el.id}
				{'   '}
				{el.task}
			</li>
		);
	};

	const getMatchedList = () => {
		return (
			<ul style={listStyle}>
				{rawTaskList.flatMap((el) => (finalMatched.includes(el.id) ? [ getMatchedListItem(el) ] : []))}
			</ul>
		);
	};

	const listStyle = {
		height: 'auto',
		width: 'auto',
		maxHeight: '30vh',
		padding: '1rem',
		overflowY: 'scroll'
	};

	return (
		<div style={popUpWindowStyle}>
			<div style={titleStyle}>Matched Delete Tasks</div>
			<div style={autoContainerStyle}>{getMatchedList()}</div>
			<div style={finalContainerStyle}>
				<ColorButton text={'Back To Previous Screen'} onClick={() => setScreen('main')} />
				<ColorButton
					color={'#a00'}
					text={`Delete ${finalMatched.length} Tasks`}
					onClick={() => setScreen('confirm')}
				/>
			</div>
			<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
				×
			</button>
		</div>
	);
};

export default MatchedDeleteTasks;
