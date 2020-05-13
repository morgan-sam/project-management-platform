import React, { useState } from 'react';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/parseDates';

const BatchNewTasks = (props) => {
	const [ numberOfTasks, setNumberOfTasks ] = useState();
	const [ taskTemplate, setTaskTemplate ] = useState();
	const [ dateTemplate, setDateTemplate ] = useState();
	const [ deadlineTemplate, setDeadlineTemplate ] = useState();
	const [ urgency, setUrgency ] = useState(3);
	const [ teams, setTeams ] = useState();

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'fixed',
		justifyContent: 'center',
		top: '50vh',
		left: '50vw',
		height: '50%',
		width: '50%',
		border: '1px solid black',
		transform: 'translate(-50%,-50%)',
		backgroundColor: 'white',
		zIndex: '10',
		padding: '2rem'
	};

	const subContainerStyle = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '1rem'
	};

	return (
		<div style={containerStyle}>
			<div style={subContainerStyle}>
				<InputFormWithLabel {...props} label={'Number Of Tasks'} onChange={(val) => setNumberOfTasks(val)} />
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel {...props} label={'Task Template'} onChange={(val) => setTaskTemplate(val)} />
				<div>{'[Task Option Buttons]'}</div>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel {...props} label={'Date Template'} onChange={(val) => setDateTemplate(val)} />
				<div>{'[Date Option Buttons]'}</div>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Deadline Template'}
					onChange={(val) => setDeadlineTemplate(val)}
				/>
				<div>{'[Deadline Option Buttons]'}</div>
			</div>
			<div style={subContainerStyle}>
				<DropdownWithLabel
					{...props}
					label={'Urgency'}
					options={[ 1, 2, 3, 4, 5 ]}
					default={urgency}
					onClick={(val) => setUrgency(val)}
					width={'2rem'}
				/>
				<InputFormWithLabel {...props} label={'Teams'} onChange={(val) => setTeams(val)} />
			</div>
		</div>
	);
};

export default BatchNewTasks;

// Task Template Options:

// '${n, 1/2/3/#, a/d}
// 'Number template:
// 'mainflag, Minimum digits, ascending/descending'

// '${l, a/d}
// 'Letter template:
// 'mainflag, ascending/descending'

// Examples:
// BackendTest_${n} => (BackendTest_1,BackendTest_2,BackendTest_3)
// FrontendTest_${n-1,3} => (FrontendTest_000,FrontendTest_001,FrontendTest_002)
// feature_${l,d} => (feature_z,feature_y,feature_x)

///////////////////////////////////////////////////////////////////////////////////////////////

// Date/Deadline Template Options:

// Examples:
// (today) + nd         =>      (sequential days in a row starting from today)
// (1/10/20) + n(2m)    =>      (sequential alternative months starting from specified date)
// (today+2w) - nd      =>      (counts backwards in days starting from a fortnight from today)
// (t)                  =>      (shorthand version of todays date)
// (t/t/t)              =>      (exact version of todays date)
// (1/t/t) + ny         =>      (counts from first day of current month in years)
