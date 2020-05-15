import React from 'react';

const InputFormWithLabel = (props) => {
	const inputFormWithLabelStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 1rem'
	};

	const formItemsStyle = {
		margin: '0 0.5rem'
	};

	return (
		<div style={{ ...props.style, ...inputFormWithLabelStyle }}>
			<form onChange={(e) => props.onChange(e.target.value)}>
				<label style={formItemsStyle}>{props.label}:</label>
				<input style={formItemsStyle} type="text" name="name" value={props.default} />
				<input disabled type="submit" value="Submit" style={{ display: 'none' }} />
			</form>
		</div>
	);
};

export default InputFormWithLabel;
