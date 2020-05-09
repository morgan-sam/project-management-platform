import React, { useState } from 'react';
import Dropdown from 'components/Dropdown';
import { CSS_COLOR_NAMES } from 'data/cssColors';
import { calculateColorStyles } from 'styling/colorButton';

const ColorTest = (props) => {
	const [ color, setColor ] = useState('rgb(3,3,3)');
	const colors = calculateColorStyles(color);

	const boxStyle = {
		width: '10rem',
		height: '10rem'
	};

	return (
		<div className="colorTestContainer" style={{ display: 'flex', margin: '0 0 3rem 0' }}>
			<Dropdown
				style={{ width: '10rem', zIndex: '109' }}
				options={CSS_COLOR_NAMES}
				default={color}
				onClick={(val) => setColor(val)}
			/>
			<div style={{ ...boxStyle, backgroundColor: `rgb(${colors[0].join(',')})` }} />
			<div style={{ ...boxStyle, backgroundColor: `rgb(${colors[1].join(',')})` }} />
			<div style={{ ...boxStyle, backgroundColor: `rgb(${colors[2].join(',')})` }} />
		</div>
	);
};

export default ColorTest;
