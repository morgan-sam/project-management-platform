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
	finalContainerStyle,
	dateRangeContainer,
	dateContainer,
	dateLabel
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateSelect from 'components/DateSelect';
import { parseISOToDateObj, parseDateObjToISO } from 'processing/dates';
import { getDayFromTodayAsISO } from 'data/dates';

const BatchDeleteTasks = (props) => {
	const { setDataChanged, setPopUp } = props;

	const [ regex, setRegex ] = useState('');
	const [ matched, setMatched ] = useState([]);
	const [ template, setTemplate ] = useState({
		date: parseISOToDateObj(getDayFromTodayAsISO(0)),
		deadline: parseISOToDateObj(getDayFromTodayAsISO(14))
	});
	useEffect(
		() => {
			if (regex.length === 0) setMatched('');
			else {
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
					<div style={dateRangeContainer}>
						<div style={dateContainer}>
							<div style={dateLabel}>Date:</div>
							<DateSelect
								date={template.date}
								setDate={(val) =>
									setTemplate({
										...template,
										date: val
									})}
							/>
						</div>
						<div style={dateContainer}>
							<div style={dateLabel}>Deadline:</div>
							<DateSelect
								date={template.deadline}
								setDate={(val) => {
									setTemplate({
										...template,
										deadline: val
									});
								}}
							/>
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