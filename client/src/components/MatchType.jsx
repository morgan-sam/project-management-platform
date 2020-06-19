import React from 'react';
import Checkbox from 'components/Checkbox';

const MatchType = (props) => (
	<div
		style={{
			display: 'grid',
			gridGap: '0.5rem',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gridTemplateRows: 'repeat(3, 1fr)',
			margin: '1rem',
			width: '6rem'
		}}
	>
		<div style={{ gridArea: '1 / 1 / 2 / 3' }}>Match Type:</div>
		<div style={{ gridArea: '2 / 1 / 3 / 2' }}>AND:</div>
		<Checkbox
			style={{ gridArea: '2 / 2 / 3 / 3' }}
			default={props.default === 'AND'}
			onChange={() => props.onChange('AND')}
		/>
		<div style={{ gridArea: '3 / 1 / 4 / 2' }}>OR:</div>
		<Checkbox
			style={{ gridArea: '3 / 2 / 4 / 3' }}
			default={props.default === 'OR'}
			onChange={() => props.onChange('OR')}
		/>
	</div>
);

export default MatchType;
