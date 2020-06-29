import React from 'react';
import { capitalizeFirstLetter } from 'processing/utility';

const ObjectInput = (props) => {
	const { obj, setObj } = props;

	const formStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	};

	const formInputStyle = {
		display: 'flex',
		alignItems: 'center'
	};

	const formLabelStyle = {
		margin: '1rem'
	};

	const formTextAreaStyle = {
		height: '1.4rem',
		textIndent: '5px'
	};

	return (
		<form style={formStyle}>
			{Object.entries(obj).map((el, i) => (
				<label key={i} style={formInputStyle}>
					<span style={formLabelStyle}>{capitalizeFirstLetter(el[0])}</span>
					<input
						onChange={(e) => {
							let objCopy = Object.assign({}, obj);
							objCopy[el[0]] = e.target.value;
							setObj(objCopy);
						}}
						style={formTextAreaStyle}
						placeholder={capitalizeFirstLetter(el[1])}
					/>
				</label>
			))}
		</form>
	);
};

export default ObjectInput;
