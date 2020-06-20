import React, { useState, useEffect } from 'react';
import {
	titleStyle,
	popUpPositionStyle,
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
import MatchType from 'components/MatchType';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateSelect from 'components/DateSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import Dropdown from 'components/Dropdown';
import ConfirmPopUp from 'components/ConfirmPopUp';
import MatchedDeleteTasks from 'components/MatchedDeleteTasks';
import { parseISOToDateObj, parseDateObjToISO } from 'processing/dates';
import {
	filterListDate,
	filterListDeadline,
	filterListMinUrgency,
	filterListMaxUrgency,
	filterListTeams,
	filterListCompletion
} from 'processing/filterList';
import { fetchDeleteTasks } from 'data/fetch';
import { getCommonElements } from 'processing/utility';
import { formatTeamsDropdownSelect } from 'processing/teams';
import { getTaskListTeams } from 'processing/teams';
import { getDefaultDeleteTemplate } from 'data/defaultState';

const BatchDeleteTasks = (props) => {
	const { setDataChanged, setPopUp, rawTaskList, pressedKeys, setScreen } = props;
	const [ template, setTemplate ] = useState(getDefaultDeleteTemplate(rawTaskList));
	const [ matched, setMatched ] = useState({ task: [], dateRange: [], urgency: [] });
	const [ finalMatched, setFinalMatched ] = useState([]);

	useEffect(
		() => {
			const taskMatchIDs = getTaskMatchIDs(template.task);
			const completionMatchIDs = filterListCompletion(template, rawTaskList).map((el) => el.id);
			const dateRangeMatchIDs = getDateRangeMatchIDs(template);
			const urgencyMatchIDs = getUrgencyMatchIDs(template);
			const teamMatchIDs = filterListTeams(template, rawTaskList).map((el) => el.id);
			setMatched({
				task: taskMatchIDs,
				completion: completionMatchIDs,
				dateRange: dateRangeMatchIDs,
				urgency: urgencyMatchIDs,
				teams: teamMatchIDs
			});
		},
		[ template ]
	);

	useEffect(
		() => {
			const matches = Object.values(matched);
			if (matches.some((el) => typeof el === 'string')) setFinalMatched([]);
			else {
				const commonMatches = matches.reduce((common, category) => getCommonElements(common, category));
				setFinalMatched(commonMatches);
			}
		},
		[ matched ]
	);

	const deletedMatchedTasks = () => {
		fetchDeleteTasks(finalMatched);
		setDataChanged(true);
		setPopUp(null);
	};

	const clickRemove = () => {
		setPopUp(
			<ConfirmPopUp
				message={`Are you sure you want to delete ${finalMatched.length} tasks?`}
				confirm={() => deletedMatchedTasks()}
				pressedKeys={pressedKeys}
				setPopUp={setPopUp}
			/>
		);
	};

	const getTaskMatchIDs = (regex) => {
		try {
			const reg = new RegExp(regex);
			const filtered = props.rawTaskList.filter((el) => {
				return el.task.match(reg);
			});
			return filtered.map((el) => el.id);
		} catch (error) {
			return 'Invalid Regex';
		}
	};

	const getDateRangeMatchIDs = (template) => {
		const datesMatchIDs = filterListDate(template, rawTaskList).map((el) => el.id);
		const deadlinesMatchIDs = filterListDeadline(template, rawTaskList).map((el) => el.id);
		return getCommonElements(datesMatchIDs, deadlinesMatchIDs);
	};

	const getUrgencyMatchIDs = (template) => {
		const minMatchIDs = filterListMinUrgency(template, rawTaskList).map((el) => el.id);
		const maxMatchIDs = filterListMaxUrgency(template, rawTaskList).map((el) => el.id);
		return getCommonElements(minMatchIDs, maxMatchIDs);
	};

	return (
		<div style={topContainerStyle}>
			<div style={popUpWindowStyle}>
				<div style={titleStyle}>Batch Delete Tasks</div>
				<div style={dateGridStyle}>
					<InputFormWithLabel
						label={'Task Regex'}
						onChange={(val) => setTemplate({ ...template, task: val })}
						default={template.task}
					/>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<div>Completion: </div>
						<Dropdown
							onClick={(val) => {
								setTemplate({
									...template,
									completion: val
								});
							}}
							options={[ 'all', 'complete', 'incomplete' ]}
							filterOptions={template}
							selected={template.completion}
							style={{ width: '8rem', zIndex: '21', margin: '1rem' }}
						/>
					</div>
					<div
						style={{
							color: 'rgb(193, 45, 41)',
							fontSize: '0.8rem',
							height: '1rem',
							textAlign: 'center'
						}}
					>
						{typeof matched.task === 'string' ? (
							matched.task
						) : matched.task.length === rawTaskList.length ? (
							''
						) : (
							`${matched.task.length}/${rawTaskList.length} Name Matches`
						)}
					</div>
					<div
						style={{
							color: 'rgb(193, 45, 41)',
							fontSize: '0.8rem',
							height: '1rem',
							textAlign: 'center'
						}}
					>
						{template.completion.includes('all') ? (
							''
						) : (
							`${matched.completion.length}/${rawTaskList.length} Completion Matches`
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
									setTemplate({ ...template, date: getDefaultDeleteTemplate(rawTaskList).date })}
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
										deadline: getDefaultDeleteTemplate(rawTaskList).deadline
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
				<div style={{ display: 'flex' }}>
					<div style={autoContainerStyle}>
						<UrgencyRangeSelect
							style={{
								display: 'flex',
								zIndex: '20',
								padding: '1rem'
							}}
							urgency={template.urgency}
							onChange={(min, max) => setTemplate({ ...template, urgency: { min, max } })}
						/>
						<div style={errorMatchTextStyle}>
							{matched.urgency.length === rawTaskList.length ? (
								''
							) : (
								`${matched.urgency.length}/${rawTaskList.length} Urgency Matches`
							)}
						</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Dropdown
							type={'checkbox'}
							label={'Teams'}
							onClick={(val) => {
								setTemplate({
									...template,
									teams: formatTeamsDropdownSelect(val, template)
								});
							}}
							options={getTaskListTeams(rawTaskList)}
							filterOptions={template}
							selected={template.teams}
							style={{ width: '8rem', zIndex: '18', margin: '1rem' }}
						/>
						<div style={{ display: 'flex', flexDirection: 'column', width: '8rem' }}>
							<MatchType
								default={template.teamMatch}
								onChange={(val) => setTemplate({ ...template, teamMatch: val })}
							/>
							<div style={{ color: 'rgb(193, 45, 41)', fontSize: '0.8rem', height: '1rem' }}>
								{template.teams.includes('all') ? (
									''
								) : (
									`${matched.teams.length}/${rawTaskList.length} Team Matches`
								)}
							</div>
						</div>
					</div>
				</div>
				<div style={finalContainerStyle}>
					<ColorButton
						color={'#32CD32'}
						text={`Reset Template To Default`}
						onClick={() => setTemplate(getDefaultDeleteTemplate(rawTaskList))}
					/>
					<ColorButton
						color={'#32CD32'}
						text={
							finalMatched.length === rawTaskList.length ? (
								`All Tasks Matched`
							) : finalMatched.length === 0 ? (
								`No Tasks Matched`
							) : (
								`Check Matched Tasks`
							)
						}
						enabled={finalMatched.length !== rawTaskList.length && finalMatched.length !== 0}
						onClick={() => setScreen('matched')}
					/>
					<ColorButton
						color={'#a00'}
						text={finalMatched.length === 0 ? `No Tasks Matched` : `Delete ${finalMatched.length} Tasks`}
						onClick={() => clickRemove()}
						enabled={finalMatched.length !== 0}
					/>
				</div>
				<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
					×
				</button>
			</div>
		</div>
	);
};

export default BatchDeleteTasks;
