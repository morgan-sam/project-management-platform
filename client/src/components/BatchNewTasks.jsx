import React, { useState } from 'react';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import ColorButton from 'components/ColorButton';
import { containerStyle, subContainerStyle, optionButtonStyle } from 'styling/batchNewTasks';

const BatchNewTasks = (props) => {
	const [ taskCount, setTaskCount ] = useState(23);
	const [ taskTemplate, setTaskTemplate ] = useState('standup_${n,3,d}_${n,2,a}');
	const [ dateTemplate, setDateTemplate ] = useState();
	const [ deadlineTemplate, setDeadlineTemplate ] = useState();
	const [ urgency, setUrgency ] = useState(3);
	const [ teams, setTeams ] = useState();

	const interpretTaskTemplate = () => {
		if (taskTemplate) {
			const numFlags = taskTemplate.match(/\$\{( *n[^}]*)\}/g);
			// const letterFlags = taskTemplate.match(/\$\{( *l[^}]*)\}/g);
			const numSettings = numFlags.map((el) => convertNumFlagToSettings(el));
			const numStrings = numSettings.map((el) => convertNumSettingsToStrings(el, taskCount));
			const combinedStrings = combineParallelArrays(numStrings);
			console.log(combinedStrings);
			// let taskStrings = [];
			// for (let i = 0; i < taskCount; i++) {
			// 	taskStrings[i] = taskTemplate.replace(/\$\{( *n[^}]*)\}/g, numStrings[i]);
			// }
		}
	};

	const combineParallelArrays = (matrix) => {
		let singleArray = generateEmptyMatrix(matrix[0].length, matrix[0][0].length - 1);
		for (let a = 0; a < matrix[0].length; a++) {
			for (let b = 0; b < matrix.length; b++) {
				singleArray[a][b] = matrix[b][a];
			}
		}
		return singleArray;
	};

	const generateEmptyMatrix = (x, y) => {
		let matrix = [];
		for (let a = 0; a < x; a++) matrix.push([].concat(Array(y)));
		return matrix;
	};

	const convertNumSettingsToStrings = (settings, count) => {
		let strings = [];
		const { ascending, digits } = settings;
		for (let i = 0; i < count; i++) {
			const num = ascending ? i : count - i - 1;
			const zeroes = Math.max(0, digits - num.toString().length);
			strings.push(`${'0'.repeat(zeroes)}${num}`);
		}
		return strings;
	};

	const convertNumFlagToSettings = (flag) => {
		if (!flag) return null;
		const groups = flag.replace(/[\$\{\} ]/g, '').split(',');
		let settings = { digits: 1, ascending: true };
		if (groups[0] !== 'n' && groups[0] !== 'N') return {};
		let orderIndex = 2;
		if (parseInt(groups[1]) >= 0 && parseInt(groups[1]) <= 9) settings.digits = parseInt(groups[1]);
		else orderIndex = 1;
		if (groups[orderIndex] === 'a' || groups[orderIndex] === 'A') settings.ascending = true;
		else if (groups[orderIndex] === 'd' || groups[orderIndex] === 'D') settings.ascending = false;
		return settings;
	};

	return (
		<div style={containerStyle}>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Number Of Tasks'}
					onChange={(val) => setTaskCount(parseInt(val))}
					default={taskCount ? taskCount : 0}
				/>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Task Template'}
					onChange={(val) => setTaskTemplate(val)}
					default={taskTemplate}
				/>
				<button style={optionButtonStyle}>Numbers</button>
				<button style={optionButtonStyle}>Letters</button>
				<button style={optionButtonStyle}>Reverse</button>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Date Template'}
					onChange={(val) => setDateTemplate(val)}
					default={dateTemplate}
				/>
				<button style={optionButtonStyle}>Today</button>
				<button style={optionButtonStyle}>Sequential Days</button>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Deadline Template'}
					onChange={(val) => setDeadlineTemplate(val)}
					default={deadlineTemplate}
				/>
				<button style={optionButtonStyle}>Today</button>
				<button style={optionButtonStyle}>Sequential Days</button>
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
				<InputFormWithLabel {...props} label={'Teams'} onChange={(val) => setTeams(val)} default={teams} />
			</div>
			<ColorButton color={props.colorTheme} text={'Add Tasks'} onClick={() => interpretTaskTemplate()} />
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
