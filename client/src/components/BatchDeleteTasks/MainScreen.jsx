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
import MatchType from 'components/MatchType';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateSelect from 'components/DateSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import Dropdown from 'components/Dropdown';
import { parseISOToDateObj, parseDateObjToISO } from 'processing/dates';
import { formatTeamsDropdownSelect } from 'processing/teams';
import { getTaskListTeams } from 'processing/teams';
import { getDefaultDeleteTemplate } from 'data/defaultState';

const BatchDeleteTasks = (props) => {
	const { setPopUp, rawTaskList, setScreen, finalMatched, template, setTemplate, matched, confirmDelete } = props;
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
						onClick={() => confirmDelete()}
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
