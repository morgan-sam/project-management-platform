import React, { useState, useEffect } from 'react';
import {
	titleStyle,
	popUpPositionStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	errorMatchTextStyle,
	topRowStyle,
	finalContainerStyle,
	dateTopContainer,
	dateRangeContainer,
	dateContainer,
	dateLabel
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateSelect from 'components/DateSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import { parseISOToDateObj, parseDateObjToISO, stripISODateOfTime } from 'processing/dates';
import { filterListDate, filterListDeadline, filterListMinUrgency, filterListMaxUrgency } from 'processing/filterList';
import { getBoundaryDates } from 'data/dates';
import { getCommonElements } from 'processing/utility';

const BatchDeleteTasks = (props) => {
	const { setDataChanged, setPopUp, rawTaskList } = props;

	const boundaryDates = getBoundaryDates(rawTaskList);
	const [ template, setTemplate ] = useState({
		task: '',
		date: stripISODateOfTime(boundaryDates.date),
		deadline: stripISODateOfTime(boundaryDates.deadline),
		urgency: { min: 1, max: 5 }
	});
	const [ matched, setMatched ] = useState({ task: [], dateRange: [] });

	const textContainerStyle = {
		height: 'auto',
		width: 'auto',
		padding: '2rem'
	};

	useEffect(
		() => {
			const taskMatches = getTaskMatches(template.task);
			const dateRangeMatches = getDateRangeMatches(template);
			setMatched({ task: taskMatches, dateRange: dateRangeMatches });
		},
		[ template ]
	);

	const getTaskMatches = (regex) => {
		if (regex.length === 0) return '';
		else {
			try {
				const reg = new RegExp(regex);
				const filtered = props.rawTaskList.filter((el) => {
					return el.task.match(reg);
				});
				return filtered;
			} catch (error) {
				return 'Invalid Regex';
			}
		}
	};

	const getDateRangeMatches = () => {
		const datesMatchIDs = filterListDate(template, rawTaskList).map((el) => el.id);
		const deadlinesMatchIDs = filterListDeadline(template, rawTaskList).map((el) => el.id);
		const matchIDs = getCommonElements(datesMatchIDs, deadlinesMatchIDs);
		return rawTaskList.filter((el) => matchIDs.includes(el.id));
	};

	return (
		<div style={popUpPositionStyle}>
			<div style={topContainerStyle}>
				<div style={popUpWindowStyle}>
					<div style={titleStyle}>Batch Delete Tasks</div>
					<div style={subContainerStyle}>
						<div style={topRowStyle}>
							<InputFormWithLabel
								label={'Task Regex'}
								onChange={(val) => setTemplate({ ...template, task: val })}
								default={template.task}
							/>
						</div>
						<div style={errorMatchTextStyle}>
							{typeof matched.task === 'string' ? (
								matched.task
							) : (
								`${matched.task.length}/${rawTaskList.length} Name Matches`
							)}
						</div>
					</div>
					<div style={dateTopContainer}>
						<div style={dateRangeContainer}>
							<div style={dateContainer}>
								<div style={dateLabel}>Date:</div>
								<DateSelect
									style={{ zIndex: '20' }}
									date={parseISOToDateObj(template.date)}
									setDate={(val) =>
										setTemplate({
											...template,
											date: parseDateObjToISO(val)
										})}
								/>
								<ColorButton
									text={'Reset To First Date'}
									onClick={() =>
										setTemplate({ ...template, date: stripISODateOfTime(boundaryDates.date) })}
								/>
							</div>
							<div style={dateContainer}>
								<div style={dateLabel}>Deadline:</div>
								<DateSelect
									style={{ zIndex: '20' }}
									date={parseISOToDateObj(template.deadline)}
									setDate={(val) => {
										setTemplate({
											...template,
											deadline: parseDateObjToISO(val)
										});
									}}
								/>
								<ColorButton
									text={'Reset To Last Deadline'}
									onClick={() =>
										setTemplate({
											...template,
											deadline: stripISODateOfTime(boundaryDates.deadline)
										})}
								/>
							</div>
						</div>
						<div style={errorMatchTextStyle}>
							{matched.dateRange.length === rawTaskList.length ? (
								''
							) : (
								`${matched.dateRange.length}/${rawTaskList.length} Date Range Matches`
							)}
						</div>
					</div>

					<div style={subContainerStyle}>
						<UrgencyRangeSelect
							style={{
								display: 'flex',
								zIndex: '20'
							}}
							urgency={template.urgency}
							onChange={(min, max) => setTemplate({ ...template, urgency: { min, max } })}
						/>
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
