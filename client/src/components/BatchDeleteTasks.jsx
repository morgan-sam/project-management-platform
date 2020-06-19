import React, { useState, useEffect } from 'react';
import {
	titleStyle,
	popUpPositionStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	errorTextStyle,
	topRowStyle,
	finalContainerStyle
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';
import InputFormWithLabel from 'components/InputFormWithLabel';

const BatchDeleteTasks = (props) => {
	const { setDataChanged, setPopUp } = props;

	const [ regex, setRegex ] = useState('');
	const [ matched, setMatched ] = useState([]);
	useEffect(
		() => {
			if (regex.length === 0) {
				setMatched('');
			} else {
				try {
					const reg = new RegExp(regex);
					const filtered = props.rawTaskList.filter((el) => {
						return el.task.match(reg);
					});
					setMatched(filtered);
				} catch (error) {
					setMatched('Invalid Regex');
				}
			}
		},
		[ regex ]
	);

	return (
		<div style={popUpPositionStyle}>
			<div style={topContainerStyle}>
				<div style={popUpWindowStyle}>
					<div style={titleStyle}>Batch Delete Tasks</div>
					<div style={subContainerStyle}>
						<div style={topRowStyle}>
							<InputFormWithLabel
								label={'Task Regex'}
								onChange={(val) => setRegex(val)}
								default={regex}
							/>
						</div>
						<div style={errorTextStyle}>
							{typeof matched === 'string' ? matched : `${matched.length} Matches`}
						</div>
					</div>
					<div style={finalContainerStyle}>
						<ColorButton color={'#a00'} text={'Delete Tasks'} onClick={() => null} />
					</div>
					<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
						×
					</button>
				</div>
			</div>
		</div>
	);
};

export default BatchDeleteTasks;
